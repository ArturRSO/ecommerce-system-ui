import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { MessageModule } from 'primeng/message';


@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MessageModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
