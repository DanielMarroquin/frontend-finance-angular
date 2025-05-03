import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from "./products.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  NgxDatatableModule
} from "@swimlane/ngx-datatable";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    FormsModule,
  ]
})
export class ProductsModule { }
