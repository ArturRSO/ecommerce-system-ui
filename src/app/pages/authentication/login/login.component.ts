import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { Roles } from 'src/app/utils/enums/roles.enum';
import { RolesList } from 'src/app/utils/lists/roles.list';
import { AuthenticationState } from 'src/app/utils/models/authentication-state.model';
import { UserRegistration } from 'src/app/utils/models/user-registration.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: UntypedFormGroup;
  public submitted = false;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: UntypedFormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.checkAuth();
    this.buildForm();
  }

  get f() {
    return this.form.controls;
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loader.enable();

    this.authService.login(this.form.value).subscribe(response => {
      this.loader.disable();

      this.authService.setAuthenticationState(new AuthenticationState(true, response.data.token, response.data.expiration, response.data.roleId, response.data.userId));

      const nextRoute = sessionStorage.getItem('nextRoute');

      if (nextRoute) {
        sessionStorage.removeItem('nextRoute');
        this.navigateToPage(nextRoute);

      } else {
        if (response.data.roleId === Roles.CUSTOMER) {
          this.navigateToPage('loja/produtos');

        } else {
          this.navigateToPage('gerenciamento/dashboard');
        }
      }
    });
  }

  public openRegistrationModal(): void {
    const buttons = [{ text: 'Comprar' }, { text: 'Vender' }];

    this.modalService.openSimpleModal('Cadastro', 'O que deseja fazer?', buttons).subscribe(response => {
      const roles = new RolesList();
      const role = roles.getRoleByAction(response);

      this.sessionStorageService.setObject('userRegistration', new UserRegistration([role], false, null));
      this.navigateToPage('cadastro/usuario');
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private checkAuth(): void {
    const authState = this.authService.getAuthenticationState();

    if (authState?.authenticated) {
      this.navigateToPage('perfil');
    }
  }
}
