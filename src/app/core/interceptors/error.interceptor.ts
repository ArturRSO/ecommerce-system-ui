import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(error => {
      if ([401, 403].indexOf(error.status) !== -1) {
        this.resetLoader();

        this.authService.logout();

        this.modalService.openSimpleModal('Erro', 'Sessão expirada, por favor, faça login novamente.', [{text: 'OK'}]).subscribe(() => {
          this.router.navigateByUrl('auth/login');
        });

      } else {
        this.resetLoader();

        if (error.error.message) {
          this.modalService.openSimpleModal('Erro', error.error.message, [{text: 'OK'}]);

        } else if (request.url.includes(environment.VIA_CEP_URL)) {
          this.modalService.openSimpleModal('Erro', 'CPF inválido!', [{text: 'OK'}]);

        } else {
          this.modalService.openSimpleModal('Erro', 'Serviço indisponível, tente novamente mais tarde.', [{text: 'OK'}]);
        }
      }

      return throwError(error);
    }));
  }

  private resetLoader(): void {
    this.loader.reset();
    this.loader.disable();
  }
}
