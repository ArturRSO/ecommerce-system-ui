import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
import { MessageModule } from 'primeng/message';
import { UtilService } from './services/util.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [
    MainComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    MessageModule,
    ModalModule.forRoot(),
    SharedModule,
    ToastModule
  ],
  providers: [
    AuthenticationService,
    LoaderService,
    ModalService,
    SessionService,
    StorageService,
    UserService,
    UtilService
  ],
  exports: [
    MainComponent
  ]
})
export class CoreModule { }
