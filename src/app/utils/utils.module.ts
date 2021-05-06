import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BypassSanitizerPipe } from './pipes/bypass-sanitizer.pipe';

@NgModule({
  declarations: [
    BypassSanitizerPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BypassSanitizerPipe
  ]
})
export class UtilsModule { }
