import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ModalService } from '../services/modal.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private modalService: ModalService,
    private router: Router,
    private storageService: StorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {
    if (this.authenticationService.checkAuth()) {

      const roleId = JSON.parse(this.storageService.getSessionItem('userProfile')).roleId;

      if (route.data.roles && !route.data.roles.includes(roleId)) {
        console.log('ROUTE BLOCKED!');
        return false;
      }

      return true;
    }

    this.authenticationService.logout();

    this.modalService.openSimpleModal('Erro', 'Sessão expirada, por favor, faça login novamente.', [{text: 'OK'}]);
    this.router.navigateByUrl('auth/login');
    return false;
  }
}
