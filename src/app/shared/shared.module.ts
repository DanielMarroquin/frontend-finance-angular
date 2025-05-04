import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { FormsModule } from "@angular/forms";
import { CustomAlertComponent } from './components/custom-alert/custom-alert.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SearchProductComponent, CustomAlertComponent],
  exports: [SearchProductComponent, CustomAlertComponent]
})
export class SharedModule {}
