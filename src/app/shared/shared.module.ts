import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SearchProductComponent],
  exports: [SearchProductComponent]
})
export class SharedModule {}
