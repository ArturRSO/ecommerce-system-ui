import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Roles } from 'src/app/utils/enums/roles.enum';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { RevenueTableComponent } from './revenue-table/revenue-table.component';
import { StoreProfileComponent } from './store-profile/store-profile.component';
import { StoresTableComponent } from './stores-table/stores-table.component';
import { UsersTableComponent } from './users-table/users-table.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN] }
  },
  {
    path: 'loja',
    component: StoreProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN] }
  },
  {
    path: 'lojas',
    component: StoresTableComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.SYSTEM_ADMIN] }
  },
  {
    path: 'pedidos',
    component: OrdersTableComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.STORE_ADMIN] }
  },
  {
    path: 'produtos',
    component: ProductsTableComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.STORE_ADMIN] }
  },
  {
    path: 'receitas',
    component: RevenueTableComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN] }
  },
  {
    path: 'usuarios',
    component: UsersTableComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.SYSTEM_ADMIN] }
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
