import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { UnavailabilityComponent } from './unavailability/unavailability.component';


@NgModule({
  declarations: [
    UnavailabilityComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
