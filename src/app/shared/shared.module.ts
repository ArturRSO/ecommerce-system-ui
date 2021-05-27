import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { SimpleModalComponent } from './simple-modal/simple-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddToCartModalComponent } from './add-to-cart-modal/add-to-cart-modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartItemQuantityFormComponent } from './cart-item-quantity-form/cart-item-quantity-form.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SimpleModalComponent,
    AddToCartModalComponent,
    CartItemQuantityFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SimpleModalComponent,
    CartItemQuantityFormComponent
  ],
  entryComponents: [
    SimpleModalComponent
  ]
})
export class SharedModule { }
