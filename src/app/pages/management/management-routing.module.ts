import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  {
    path: 'perfil',
    component: ProfileComponent
  },
  {
    path: 'usuarios',
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
