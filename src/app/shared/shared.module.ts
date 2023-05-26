import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { SimpleModalComponent } from './simple-modal/simple-modal.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { AddToCartModalComponent } from './add-to-cart-modal/add-to-cart-modal.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { CartItemQuantityFormComponent } from './cart-item-quantity-form/cart-item-quantity-form.component';
import { PaymentMethodPickModalComponent } from './payment-method-pick-modal/payment-method-pick-modal.component';
import { TableComponent } from './table/table.component';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
        SimpleModalComponent,
        AddToCartModalComponent,
        CartItemQuantityFormComponent,
        PaymentMethodPickModalComponent,
        TableComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatTabsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        DragDropModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        SimpleModalComponent,
        AddToCartModalComponent,
        CartItemQuantityFormComponent,
        PaymentMethodPickModalComponent,
        TableComponent
    ]
})
export class SharedModule { }
