import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.storageService.getLocalItem('authToken') && request.url.includes(environment.API_URL)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storageService.getLocalItem('authToken')}`
        }
      });
    }

    if (!request.url.includes(`/create/image`)) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request);
  }
}
