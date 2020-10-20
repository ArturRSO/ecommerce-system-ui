import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('../pages/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'erro',
    loadChildren: () => import('../pages/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: 'gerenciar',
    loadChildren: () => import('../pages/management/management.module').then(m => m.ManagementModule)
  },
  {
    path: 'navegar',
    loadChildren: () => import('../pages/navigation/navigation.module').then(m => m.NavigationModule)
  },
  {
    path: '**',
    redirectTo: 'navegar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule { }
