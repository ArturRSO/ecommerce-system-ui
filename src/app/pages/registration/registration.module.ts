import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProductRegistrationComponent } from './product-registration/product-registration.component';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    UserRegistrationComponent,
    ProductRegistrationComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class RegistrationModule { }
