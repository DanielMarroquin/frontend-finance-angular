import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { CreditCardRoutingModule } from "./credit-card.routing";


@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    CommonModule,
    CreditCardRoutingModule,

  ]
})
export class CreditCardModule { }
