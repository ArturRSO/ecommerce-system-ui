import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalComponent } from 'src/app/shared/simple-modal/simple-modal.component';
import { LoaderService } from '../services/loader.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private loader: LoaderService,
    private modalService: BsModalService,
    private router: Router,
    private storageService: StorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(error => {
      if ([401, 403].indexOf(error.status) !== -1) {
        this.resetLoader();

        this.storageService.clearLocal();
        this.storageService.clearSession();

        this.showErrorModal('Sessão expirada, por favor, faça login novamente.');
        this.router.navigateByUrl('auth/login');

      } else {
        this.resetLoader();
        this.showErrorModal(error.error.message);
      }

      return throwError(error);
    }));
  }

  private resetLoader(): void {
    this.loader.reset();
    this.loader.disable();
  }

  private showErrorModal(message: string): void {
    const config = {
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'error-modal'
    };

    const content = {
      title: 'Erro',
      message: message,
      buttons: [
        {
          text: 'OK'
        }
      ]
    }

    const modal = this.modalService.show(SimpleModalComponent, config);
    modal.content = content;
  }
}
