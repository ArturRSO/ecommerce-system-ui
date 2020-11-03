import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private storageService: StorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {
    if (this.authenticationService.checkAuth()) {

      const roleId = JSON.parse(this.storageService.getSessionItem('userProfile')).roleId;

      if (route.data.roles && !route.data.roles.includes(roleId)) {
        this.router.navigateByUrl('navegar/home');
        return false;
      }

      return true;
    }

    this.router.navigateByUrl('auth/login');
    return false;
  }
}
