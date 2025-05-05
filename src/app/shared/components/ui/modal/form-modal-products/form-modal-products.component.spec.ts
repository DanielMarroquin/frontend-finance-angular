import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormModalProductsComponent } from './form-modal-products.component';
import { ProductsService } from '../../../../../features/products/services/products.service';
import { ReactiveFormsModule } from '@angular/forms'; // Si usas formularios reactivos

describe('FormModalProductsComponent', () => {
  let component: FormModalProductsComponent;
  let fixture: ComponentFixture<FormModalProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormModalProductsComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule // Solo si el componente usa formularios reactivos
      ],
      providers: [
        ProductsService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
