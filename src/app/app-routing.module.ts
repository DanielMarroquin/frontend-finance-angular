import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'credit-card', loadChildren: () => import('./features/credit-card/credit-card.module').then(m => m.CreditCardModule),
      },
      {
        path: 'wallet', loadChildren: () => import('./features/wallet/wallet.module').then(m => m.WalletModule),
      },
      {
        path: 'credits', loadChildren: () => import('./features/credits/credits.module').then(m => m.CreditsModule),
      },
      {
        path: 'investments', loadChildren: () => import('./features/investments/investments.module').then(m => m.InvestmentsModule),
      },
      {
        path: 'insurance', loadChildren: () => import('./features/insurance-services/insurance-services.module').then(m => m.InsuranceServicesModule),
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
