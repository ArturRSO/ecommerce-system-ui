import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Roles } from 'src/app/shared/utils/roles.enum';
import { ProductRegistrationComponent } from '../registration/product-registration/product-registration.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductProfileComponent } from './product-profile/product-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { StoreManagementComponent } from './store-management/store-management.component';
import { StoreProfileComponent } from './store-profile/store-profile.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  {
    path: 'perfil',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lojas',
    children: [
      {
        path: 'minhas',
        component: StoreManagementComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.STORE_ADMIN] }
      },
      {
        path: 'todas',
        component: StoreManagementComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.SYSTEM_ADMIN] }
      }
    ]
  },
  {
    path: 'loja',
    component: StoreProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.STORE_ADMIN, Roles.SYSTEM_ADMIN] }
  },
  {
    path: 'produto',
    canActivate: [AuthGuard],
    data: { roles: [Roles.STORE_ADMIN, Roles.SYSTEM_ADMIN] },
    component: ProductProfileComponent
  },
  {
    path: 'produtos',
    canActivate: [AuthGuard],
    data: { roles: [Roles.STORE_ADMIN, Roles.SYSTEM_ADMIN] },
    children: [
      {
        path: 'loja',
        component: ProductManagementComponent
      }
    ]
  },
  {
    path: 'usuario',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.SYSTEM_ADMIN] }
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    data: { roles: [Roles.SYSTEM_ADMIN] },
    children: [
      {
        path: 'administradores',
        component: UserManagementComponent
      },
      {
        path: 'clientes',
        component: UserManagementComponent
      },
      {
        path: 'lojistas',
        component: UserManagementComponent
      },
      {
        path: 'todos',
        component: UserManagementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
