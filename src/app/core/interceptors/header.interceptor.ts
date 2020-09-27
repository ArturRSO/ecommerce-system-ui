import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.storageService.getLocalItem('authToken')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storageService.getLocalItem('authToken')}`
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
