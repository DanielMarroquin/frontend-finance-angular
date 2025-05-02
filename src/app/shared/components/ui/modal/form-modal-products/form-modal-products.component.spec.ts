import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalProductsComponent } from './form-modal-products.component';

describe('FormModalProductsComponent', () => {
  let component: FormModalProductsComponent;
  let fixture: ComponentFixture<FormModalProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormModalProductsComponent]
    });
    fixture = TestBed.createComponent(FormModalProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
