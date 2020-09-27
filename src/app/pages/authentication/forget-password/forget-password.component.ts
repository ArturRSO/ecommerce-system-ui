import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private messageService: MessageService,
    private router: Router,
    private storageService: StorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  get f() {
    return this.form.controls;
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loader.enable();
    this.userService.sendResetPasswordMail(this.f.email.value).subscribe(response => {
      if (response.success) {
        this.storageService.setSessionItem('lastScreen', 'forgetPassword');
        this.storageService.setSessionItem('currentMessage', response.message);

        this.loader.disable();
        this.navigateToPage('/auth/login');

      } else {
        this.loader.disable();

        const message = {
          severity: 'error',
          summary: 'Erro',
          detail: response.message
        }

        this.messageService.clear();
        this.messageService.add(message);
      }
    });
  }
}
