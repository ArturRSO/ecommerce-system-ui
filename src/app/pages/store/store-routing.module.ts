import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { OrderConclusionComponent } from './order-conclusion/order-conclusion.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { ShippingComponent } from './shipping/shipping.component';

const routes: Routes = [
  {
    path: 'carrinho',
    component: ProductCartComponent
  },
  {
    path: 'conclusao',
    component: OrderConclusionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detalhe',
    component: ProductDetailComponent
  },
  {
    path: 'pagamento',
    component: PaymentMethodComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pedido',
    component: OrderDetailComponent
  },
  {
    path: 'produtos',
    component: ProductsComponent
  },
  {
    path: 'transporte',
    component: ShippingComponent,
    canActivate: [AuthGuard]
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
