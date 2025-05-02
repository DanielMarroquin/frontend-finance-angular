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

  displayedProducts: Product[] = [];
  pageSize = 5;
  currentPage = 0;


  products: Product[] = [];
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


  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.updateDisplayedProducts();
        console.log('Productos cargados:', this.products);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }



  createProduct(data: any) {
    this.productService.createProduct(data).subscribe({
      next: (product) => {
        this.products.push(product);
        this.updateDisplayedProducts();
        console.log('Producto creado:', product);
      },
      error: (error) => {
        console.error('Error al crear producto:', error);
      }
    });
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


  updateDisplayedProducts(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.displayedProducts = this.products.slice(start, end);
  }


  deleteProduct(id: any) {
    this.productService.delete(id).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== id);
        this.updateDisplayedProducts();
        console.log('Producto eliminado');
      },
      error: (error) => {
        console.error('Error al eliminar producto:', error);
      }
    });
  }

  editProduct(row: any) {
  }




  isModalOpen = false;

  openAddProductModal() {
    const modalRef = this.modalService.open(FormModalProductsComponent);
    // @ts-ignore
    modalRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.loadProducts();
      }
    });
  }

  closeModal() {
    this.isModalOpen = false;
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
