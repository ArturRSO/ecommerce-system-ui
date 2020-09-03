import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionService } from '../services/session.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private session: SessionService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.session.get('authToken')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.session.get('authToken').accessToken}`
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
