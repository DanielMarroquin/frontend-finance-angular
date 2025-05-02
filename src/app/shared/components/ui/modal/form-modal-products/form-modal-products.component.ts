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
  @Output() closed = new EventEmitter<void>();
  // @ts-ignore
  productForm: FormGroup;
  minReleaseDate: string;
  isLoading = false;
  errorMessage: string | null = null;

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
      logo: ['', [Validators.required, Validators.pattern('https?://.+')]], // Validación de URL
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

  submitForm(): void {
    if (this.productForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      const formData = {
        id: this.productForm.value.id,
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        logo: this.productForm.value.logo,
        date_release: new Date(this.productForm.value.releaseDate).toISOString(),
        date_revision: new Date(this.productForm.value.reviewDate).toISOString()
      };

      this.productService.createProduct(formData)
        .pipe(
          catchError(error => {
            this.errorMessage = error.error?.message || 'Error al guardar el producto';
            this.isLoading = false;
            return of(null);
          })
        )

        .subscribe(response => {
          this.isLoading = false;
          if (response) {
            this.closeModal();
          }
        });
    } else {
      this.productForm.markAllAsTouched();
    }
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

  closeModal(): void {
    this.closed.emit();
  }
}
