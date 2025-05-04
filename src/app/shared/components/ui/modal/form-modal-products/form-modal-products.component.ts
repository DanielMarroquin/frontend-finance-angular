import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ProductsService } from "../../../../../features/products/services/products.service";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-form-modal-products',
  templateUrl: './form-modal-products.component.html',
  styleUrls: ['./form-modal-products.component.scss']
})
export class FormModalProductsComponent {
  @Output() closed = new EventEmitter<'success' | 'cancel'>();
  // @ts-ignore
  productForm: FormGroup;
  minReleaseDate: string;
  isLoading = false;
  errorMessage: string | null = null;
  mode: 'add' | 'edit' = 'add';

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService
  ) {
    this.minReleaseDate = new Date().toISOString().split('T')[0];
    this.initializeForm();
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required, Validators.pattern('https?://.+')]],
      releaseDate: ['', Validators.required],
      reviewDate: ['', Validators.required]
    });

    this.productForm.get('releaseDate')?.valueChanges.subscribe(() => {
      this.validateReviewDate();
    });
  }

  private validateReviewDate(): void {
    const releaseDate = this.releaseDate.value;
    if (releaseDate) {
      const releaseDateObj = new Date(releaseDate);
      const expectedReviewDate = new Date(
        releaseDateObj.getFullYear() + 1,
        releaseDateObj.getMonth(),
        releaseDateObj.getDate()
      ).toISOString().split('T')[0];

      if (this.reviewDate.value !== expectedReviewDate) {
        this.reviewDate.setErrors({ invalidReviewDate: true });
      } else {
        this.reviewDate.setErrors(null);
      }
    }
  }

  public loadProductData(product: any): void {
    this.mode = 'edit';
    this.productForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      releaseDate: product.date_release.split('T')[0],
      reviewDate: product.date_revision.split('T')[0]
    });
    this.productForm.get('id')?.disable();
  }

  submitForm(): void {
    if (this.productForm.valid) {
      const formData = this.getFormData();

      const serviceCall = this.mode === 'edit'
        ? this.productService.update(formData.id, formData)
        : this.productService.createProduct(formData);

      serviceCall.pipe(
        catchError(error => {
          // Manejo de errores
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          this.closeModal('success');
        }
      });
    }
  }

  private getFormData() {
    const rawValue = this.productForm.getRawValue();
    return {
      id: rawValue.id,
      name: rawValue.name,
      description: rawValue.description,
      logo: rawValue.logo,
      date_release: new Date(rawValue.releaseDate).toISOString(),
      date_revision: new Date(rawValue.reviewDate).toISOString()
    };
  }

  get id(): AbstractControl { return this.productForm.get('id') as AbstractControl; }
  get name(): AbstractControl { return this.productForm.get('name') as AbstractControl; }
  get description(): AbstractControl { return this.productForm.get('description') as AbstractControl; }
  get logo(): AbstractControl { return this.productForm.get('logo') as AbstractControl; }
  get releaseDate(): AbstractControl { return this.productForm.get('releaseDate') as AbstractControl; }
  get reviewDate(): AbstractControl { return this.productForm.get('reviewDate') as AbstractControl; }

  resetForm(): void {
    this.productForm.reset({
      logo: ''
    });
  }


  closeModal(result: 'success' | 'cancel' = 'cancel'): void {
    this.closed.emit(result);
  }

}
