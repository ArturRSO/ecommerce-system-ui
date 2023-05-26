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
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
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
