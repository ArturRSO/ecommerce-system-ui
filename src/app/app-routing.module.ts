import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'loja',
    loadChildren: () => import('./pages/store/store.module').then(m => m.StoreModule)
  },
  {
    path: '**',
    redirectTo: 'loja',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
