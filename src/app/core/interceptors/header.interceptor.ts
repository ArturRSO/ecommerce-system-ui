import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authentication = this.localStorageService.getObject('authentication');

    if (authentication.authenticated && request.url.includes(environment.API_URL)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authentication.token}`
        }
      });
    }

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request);
  }
}
