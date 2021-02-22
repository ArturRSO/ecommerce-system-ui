import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';
import { Regex } from 'src/app/utils/enums/regex.enum';
import { Roles } from 'src/app/utils/enums/roles.enum';
import { MustMatch } from 'src/app/utils/validators/must-match.validator';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  public documentMask = InputMasks.CPF;
  public form: FormGroup;
  public roles = [];
  public submitted = false;
  public validationMessages: any;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.setRolesList();
    this.setValidationMessages();
  }

  get f() {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // TO DO
    const user = this.form.value;
    user.birthday = user.birthday.toISOString().substring(0, 10);
    console.log(user);
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

  private setRolesList(): void {
    this.roles = [
      {
        id: Roles.SYSTEM_ADMIN,
        name: 'Admin'
      },
      {
        id: Roles.STORE_ADMIN,
        name: 'Lojista'
      },
      {
        id: Roles.CUSTOMER,
        name: 'Comprador'
      }
    ]
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
