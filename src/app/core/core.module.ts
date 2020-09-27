import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationService } from './services/authentication.service';
import { CoreRoutingModule } from './core-routing.module';
import { LoaderComponent } from './loader/loader.component';
import { MainComponent } from './main/main.component';
import { SessionService } from './services/session.service';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user.service';
import { LoaderService } from './services/loader.service';
import { StorageService } from './services/storage.service';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    MainComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    ToastModule
  ],
  providers: [
    AuthenticationService,
    LoaderService,
    SessionService,
    StorageService,
    UserService
  ],
  exports: [
    MainComponent
  ]
})
export class CoreModule { }
