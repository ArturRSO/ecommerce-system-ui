import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
