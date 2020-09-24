import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductRegistrationComponent } from './product-registration/product-registration.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
  {
    path: 'cliente',
    component: UserRegistrationComponent
  },
  {
    path: 'usuario',
    component: UserRegistrationComponent
  },
  {
    path: 'produto',
    component: ProductRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
