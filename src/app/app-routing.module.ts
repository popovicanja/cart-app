import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {CheckoutComponent} from './pages/checkout/checkout.component';


const routes: Routes = [
  {path: 'home', component: ProductListComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'checkout', component: CheckoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
