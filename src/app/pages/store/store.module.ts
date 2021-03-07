import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { StoreRoutingModule } from './store-routing.module';
import { ProductsComponent } from './products/products.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    LayoutModule,
    StoreRoutingModule,
    UtilsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class StoreModule { }
