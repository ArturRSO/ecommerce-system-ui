import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Roles } from 'src/app/shared/utils/roles.enum';
import { ProfileComponent } from './profile/profile.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  {
    path: 'perfil',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.SYSTEM_ADMIN] },
    children: [
      {
        path: 'enderecos'
      }
    ]
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
