import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { TableModule } from 'primeng/table';
import { NgxMaskModule } from 'ngx-mask';
import { ToolbarModule } from 'primeng/toolbar';
import { StoreManagementComponent } from './store-management/store-management.component';
import { StoreProfileComponent } from './store-profile/store-profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UserManagementComponent,
    StoreManagementComponent,
    StoreProfileComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule,
    TableModule,
    NgxMaskModule.forRoot(),
    ToolbarModule
  ]
})
export class ManagementModule { }
