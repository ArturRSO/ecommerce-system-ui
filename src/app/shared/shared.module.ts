import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { SimpleModalComponent } from './simple-modal/simple-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SimpleModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SimpleModalComponent
  ],
  entryComponents: [
    SimpleModalComponent
  ]
})
export class SharedModule { }
