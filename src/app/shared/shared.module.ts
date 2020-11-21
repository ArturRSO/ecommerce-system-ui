import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleModalComponent } from './simple-modal/simple-modal.component';
import { TableFieldPipe } from './pipes/table-field.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SimpleModalComponent,
    TableFieldPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SimpleModalComponent,
    TableFieldPipe
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
