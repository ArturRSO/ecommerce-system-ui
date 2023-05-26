import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ModalService } from '../services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private authService: AuthenticationService,
    private modalService: ModalService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {
    const authenticationState = this.authService.getAuthenticationState();

    if (authenticationState.authenticated) {
      const roleId = authenticationState.roleId;

      if (route.data.roles && !route.data.roles.includes(roleId)) {
        this.modalService.openSimpleModal('Atenção', 'Acesso negado ao recurso!', [{text: 'OK'}]).subscribe(() => {
          this.router.navigateByUrl('loja/produtos');
        });
        return false;
      }

      return true;
    }

    this.modalService.openSimpleModal('Atenção', 'Faça login para acessar esse recurso', [{text: 'OK'}]).subscribe(() => {
      this.router.navigateByUrl('auth/login');
    });

    return false;
  }
}
