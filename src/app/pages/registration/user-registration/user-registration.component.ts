import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';
import { Regex } from 'src/app/utils/enums/regex.enum';
import { Roles } from 'src/app/utils/enums/roles.enum';
import { UserDocumentTypes } from 'src/app/utils/enums/user-document-types.enum';
import { MustMatch } from 'src/app/utils/validators/must-match.validator';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  public documentMask = InputMasks.CPF;
  public form: FormGroup;
  public registration: any;
  public roles = [];
  public submitted = false;
  public validationMessages: any;

  constructor(
    private formBuilder: FormBuilder,
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

    const user = this.form.value;
    user.birthday = user.birthday.toISOString().substring(0, 10);
    user.documentTypeId = UserDocumentTypes.CPF;

    if (this.registration.update) {
      this.userService.upadateProfile(user).subscribe(response => {
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', 'Perfil atualizado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage('cadastro/perfil');
          });
        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });

    } else {
      this.userService.createUser(user).subscribe(response => {
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', 'Cadastro realizado com sucesso, faça login para continuar', [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage('auth/login');
          });
        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      documentNumber: ['', [Validators.required, Validators.pattern(new RegExp(Regex.CPF))]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(new RegExp(Regex.PASSWORD))]],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private setInitialData(): void {
    this.registration = this.sessionStorageService.getObject('userRegistration');

    if (this.registration.allowedRoles.length > 1) {
      this.f.roleId.setValue(this.registration.allowedRoles[0].id);

    } else {
      this.roles = this.registration.allowedRoles;
    }

    if (this.registration?.update) {

      if (this.registration.userId) {
        this.userService.getUserById(this.registration.userId).subscribe(response => {
          this.setUserDateOnForm(response.data);
        });

      } else {
        this.userService.getProfile().subscribe(response => {
          this.setUserDateOnForm(response.data);
        });
      }
    }

    this.setValidationMessages();
  }

  private setUserDateOnForm(data: any) {
    this.f.firstName.setValue(data.firstName);
    this.f.lastName.setValue(data.lastName);
    this.f.documentNumber.setValue(data.documentNumber);
    this.f.email.setValue(data.email);
    this.f.birthday.setValue(data.birthday);
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      firstName: [
        { type: 'required', message: 'Digite o nome' }
      ],
      lastName: [
        { type: 'required', message: 'Digite o sobrenome' }
      ],
      documentNumber: [
        { type: 'required', message: 'Digite o CPF' },
        { type: 'pattern', message: 'Digite um CPF válido' }
      ],
      email: [
        { type: 'required', message: 'Digite o e-mail' },
        { type: 'email', message: 'Digite um e-mail válido' }
      ],
      birthday: [
        { type: 'required', message: 'Preencha a data de nascimento' }
      ],
      roleId: [
        { type: 'required', message: 'Selecione o tipo de usuário' }
      ],
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
