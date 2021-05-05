import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: 'carrinho',
    component: ProductCartComponent
  },
  {
    path: 'detalhe',
    component: ProductDetailComponent
  },
  {
    path: 'produtos',
    component: ProductsComponent
  },
  {
    path: '**',
    redirectTo: 'produtos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
