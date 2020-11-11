import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Roles } from 'src/app/shared/utils/roles.enum';
import { AddressRegistrationComponent } from './address-registration/address-registration.component';
import { ProductRegistrationComponent } from './product-registration/product-registration.component';
import { TelephoneRegistrationComponent } from './telephone-registration/telephone-registration.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
  {
    path: 'atualizar',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'perfil',
        component: UserRegistrationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'endereco',
        component: AddressRegistrationComponent
      },
      {
        path: 'telefone',
        component: TelephoneRegistrationComponent
      }
    ]
  },
  {
    path: 'cliente',
    component: UserRegistrationComponent
  },
  {
    path: 'vendedor',
    component: UserRegistrationComponent
  },
  {
    path: 'usuario',
    component: UserRegistrationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.SYSTEM_ADMIN] }
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'endereco',
        component: AddressRegistrationComponent
      },
      {
        path: 'telefone',
        component: TelephoneRegistrationComponent
      },
    ]
  },
  {
    path: 'produto',
    component: ProductRegistrationComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
