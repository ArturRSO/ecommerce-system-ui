import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { Roles } from 'src/app/utils/enums/roles.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
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

      const authState = {
        authenticated: true,
        token: response.data.token,
        tokenExpiration: response.data.expiration,
        roleId: response.data.roleId,
        userId: response.data.userId
      }

      this.authService.setAuthenticationState(authState);

      if (response.data.roleId === Roles.CUSTOMER) {
        this.navigateToPage('loja/produtos');

      } else {
        this.navigateToPage('gerenciamento/dashboard');
      }
    });
  }

  public openRegistrationModal(): void {
    const buttons = [{text: 'Comprar'}, {text: 'Vender'}];

    this.modalService.openSimpleModal('Cadastro', 'O que deseja fazer?', buttons).subscribe(response => {
      const registerType = response === 'Comprar' ? 'customer' : 'storeAdmin';

      this.sessionStorageService.setObject('userRegistration', {type: registerType, update: false});
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
