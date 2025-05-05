import { Component, OnInit } from '@angular/core';
import { ModalService } from "../../../../core/services/modal.service";
import {
  FormModalProductsComponent
} from "../../../../shared/components/ui/modal/form-modal-products/form-modal-products.component";
import { ProductsService } from "../../services/products.service";
import { Product } from "../../models/product.model";
import { format } from 'date-fns';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  allProducts: Product[] = [];
  displayedProducts: Product[] = [];
  pageSize = 5;
  currentPage = 0;
  showForm = false;
  showAlert = false;
  alertTitle = '';
  alertMessage = '';
  alertType: 'success' | 'error' | 'confirm' = 'success';
  private alertCallback: ((confirmed: boolean) => void) | null = null;products: Product[] = [];

  pageSizeOptions = [5, 10, 20];

  columns = [
    {name: 'Logo', prop: 'logo'},
    {name: 'Nombre del Producto', prop: 'name'},
    {name: 'Descripción', prop: 'description'},
    {name: 'Fecha Liberación', prop: 'date_release'},
    {name: 'Fecha Revisión', prop: 'date_revision'},
  ];

  constructor(
    private modalService: ModalService,
    private productService: ProductsService,
  ) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  showCustomAlert(title: string, message: string, type: 'success' | 'error' | 'confirm', callback?: (confirmed: boolean) => void) {
    this.alertTitle = title;
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    this.alertCallback = callback || null;
  }

  changePageSize(newSize: number): void {
    this.pageSize = newSize;
    this.currentPage = 0;
    this.updateDisplayedProducts();
  }

  handleAlertConfirm(confirmed: boolean) {
    this.showAlert = false;
    if (this.alertCallback) {
      this.alertCallback(confirmed);
      this.alertCallback = null;
    }
  }


  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = [...products];
        this.allProducts = [...products];
        this.currentPage = 0;
        this.updateDisplayedProducts();
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  updateDisplayedProducts(): void {
    this.displayedProducts = [...this.products.slice(
      this.currentPage * this.pageSize,
      (this.currentPage + 1) * this.pageSize
    )];
  }


  findOneProduct(id: string) {
    this.productService.getOne(id).subscribe({
      next: (product) => {
        console.log('Producto encontrado:', product);
      },
      error: (error) => {
        console.error('Error al encontrar producto:', error);
      }
    });
  }


  deleteProduct(product: Product) {
    this.showCustomAlert(
      '¿Confirmar eliminación?',
      `¿Estás seguro de eliminar el producto "${product.name}"?`,
      'confirm',
      (confirmed) => {
        if (confirmed) {
          this.productService.delete(product.id).subscribe({
            next: () => {
              this.products = this.products.filter(p => p.id !== product.id);
              this.updateDisplayedProducts();
              this.showCustomAlert('Eliminado', `Producto "${product.name}" eliminado correctamente`, 'success');
            },
            error: () => {
              this.showCustomAlert('Error', 'No se pudo eliminar el producto', 'error');
            }
          });
        }
      }
    );
  }



  addNewProduct() {
    const modalRef = this.modalService.open(FormModalProductsComponent);
    modalRef.instance.mode = 'add';
    modalRef.instance.closed.subscribe((result: string) => {
      if (result === 'success') {
        this.loadProducts();
      }
    });
    this.showForm = true;
  }

  editProduct(row: any) {
    const modalRef = this.modalService.open(FormModalProductsComponent);
    modalRef.instance.mode = 'edit';
    modalRef.instance.loadProductData(row);

    modalRef.instance.closed.subscribe((result: string) => {
      if (result === 'success') {
        setTimeout(() => {
          this.loadProducts();
        }, 300);
      }
    });
  }

  onSearch(term: string): void {
    if (!term.trim()) {
      this.products = [...this.allProducts];
    } else {
      this.products = this.allProducts.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
    }

    this.currentPage = 0;
    this.updateDisplayedProducts();
  }


  onModalClosed(result: 'success' | 'cancel') {
    this.showForm = false;
    if (result === 'success') {
      this.loadProducts();
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return format(date, 'yyyy-MM-dd');
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return dateString;
    }
  }


}
