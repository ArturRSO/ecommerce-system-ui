import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private session: SessionService
  ) { }

  canActivate(): boolean | Promise<boolean> {
    if (!this.session.get('authToken')) {
      this.router.navigate(['/auth/login']);

      return false;
    }

    return true;
  }
}
