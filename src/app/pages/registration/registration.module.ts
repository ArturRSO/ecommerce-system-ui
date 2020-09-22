import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';


@NgModule({
  declarations: [UserRegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule { }
