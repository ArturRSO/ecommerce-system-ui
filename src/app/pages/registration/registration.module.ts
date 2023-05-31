import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
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
import { MatListModule } from '@angular/material/list';
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
    ProductUpdateComponent,
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
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
})
export class RegistrationModule {}
