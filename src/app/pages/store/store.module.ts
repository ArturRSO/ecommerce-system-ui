import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { StoreRoutingModule } from './store-routing.module';
import { ProductsComponent } from './products/products.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShippingComponent } from './shipping/shipping.component';
import { OrderConclusionComponent } from './order-conclusion/order-conclusion.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    ProductCartComponent,
    PaymentMethodComponent,
    ShippingComponent,
    OrderConclusionComponent,
    OrderDetailComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    StoreRoutingModule,
    UtilsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    CarouselModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class StoreModule {}
