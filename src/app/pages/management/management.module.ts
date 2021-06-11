import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoresTableComponent } from './stores-table/stores-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreProfileComponent } from './store-profile/store-profile.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { NgxMaskModule } from 'ngx-mask';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RevenueTableComponent } from './revenue-table/revenue-table.component';
import { ProductsTableComponent } from './products-table/products-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StoresTableComponent,
    StoreProfileComponent,
    OrdersTableComponent,
    UsersTableComponent,
    RevenueTableComponent,
    ProductsTableComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule,
    UtilsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMaskModule.forRoot()
  ]
})
export class ManagementModule { }
