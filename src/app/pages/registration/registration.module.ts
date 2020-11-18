import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProductRegistrationComponent } from './product-registration/product-registration.component';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskModule } from 'ngx-mask';
import { AddressRegistrationComponent } from './address-registration/address-registration.component';
import { TelephoneRegistrationComponent } from './telephone-registration/telephone-registration.component';
import { StoreRegistrationComponent } from './store-registration/store-registration.component';

@NgModule({
  declarations: [
    UserRegistrationComponent,
    ProductRegistrationComponent,
    AddressRegistrationComponent,
    TelephoneRegistrationComponent,
    StoreRegistrationComponent
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
