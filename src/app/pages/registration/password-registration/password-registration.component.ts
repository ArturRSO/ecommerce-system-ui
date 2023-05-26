import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { Regex } from 'src/app/utils/enums/regex.enum';
import { MustMatch } from 'src/app/utils/validators/must-match.validator';

@Component({
  selector: 'app-password-registration',
  templateUrl: './password-registration.component.html',
  styleUrls: ['./password-registration.component.scss']
})
export class PasswordRegistrationComponent implements OnInit {

  public form: UntypedFormGroup;
  public submitted = false;
  public validationMessages: any;

  private updateRequest: any;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: UntypedFormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.setInitialData();
  }

  get f() {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loader.enable();
    sessionStorage.removeItem('passwordUpdate');

    if (this.updateRequest.reset) {

      this.userService.resetPassword(this.updateRequest.token, this.f.password.value).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', 'Senha atualizada com sucesso!', [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage('auth/login');
          });
        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });

    } else {
      const userId = this.authService.getAuthenticationState().userId;

      this.userService.updateUserPassword(userId, this.f.password.value).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', 'Senha atualizada com sucesso!', [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage('cadastro/perfil');
          });
        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(new RegExp(Regex.PASSWORD))]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private setInitialData(): void {
    this.updateRequest = this.sessionStorageService.getObject('passwordUpdate');

    this.setValidationMessages();
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      password: [
        { type: 'required', message: 'Digite a senha' },
        { type: 'pattern', message: 'A senha deve possuir de 8 a 16 caracters e conter ao menos um número, uma letra maiúscula e uma minúscula.' }
      ],
      confirmPassword: [
        { type: 'required', message: 'Confirme a senha' },
        { type: 'mustMatch', message: 'As senhas devem coincidir' },
      ]
    }
  }
}
