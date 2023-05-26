import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  public form: UntypedFormGroup;
  public submitted = false;
  public validationMessages: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.buildForm();
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

    this.loader.enable();

    this.userService.sendPasswordRecoverEmail(this.f.email.value).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.modalService.openSimpleModal('Sucesso', 'Um e-mail com as instruções para recuperação de senha foi enviado ao endereço fornecido.', [{ text: 'OK' }]).subscribe(() => {
          this.navigateToPage('auth/login');
        });
      } else {
        this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
      }
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      email: [
        { type: 'required', message: 'Digite o e-mail' },
        { type: 'email', message: 'Digite um e-mail válido' }
      ]
    }
  }
}
