import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { AddressRegistrationComponent } from './address-registration/address-registration.component';
import { TelephoneRegistrationComponent } from './telephone-registration/telephone-registration.component';
import { ProductRegistrationComponent } from './product-registration/product-registration.component';
import { StoreRegistrationComponent } from './store-registration/store-registration.component';
import { PasswordRegistrationComponent } from './password-registration/password-registration.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    UserRegistrationComponent,
    UserProfileComponent,
    AddressRegistrationComponent,
    TelephoneRegistrationComponent,
    ProductRegistrationComponent,
    StoreRegistrationComponent,
    PasswordRegistrationComponent,
    OrderHistoryComponent,
    ProductUpdateComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    UtilsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    CarouselModule.forRoot(),
    NgxMaskModule.forRoot()
  ]
})
export class RegistrationModule { }
