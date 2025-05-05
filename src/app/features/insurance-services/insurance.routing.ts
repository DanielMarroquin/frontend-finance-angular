import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InsuranceComponent } from "./components/insurance/insurance.component";

const routes: Routes = [
  { path: '', component: InsuranceComponent },
]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ],
})

export class InsuranceRoutingModule { }
