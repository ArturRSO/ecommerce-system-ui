import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { Roles } from 'src/app/shared/utils/roles.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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

    this.authenticationService.login(this.f.email.value, this.f.password.value).subscribe(response => {
      if (response.success) {
        this.storageService.setLocalItem('authToken', response.data.token);
        this.storageService.setLocalItem('tokenExpiration', response.data.expiration);

        this.userService.getProfile().subscribe(result => {
          this.storageService.setSessionItem('userProfile', JSON.stringify(result.data));
          this.authenticationService.setAuthChange(true);

          this.loader.disable();

          if (result.data.roleId === Roles.CUSTOMER) {
            this.navigateToPage('/navegar/home');

          } else {
            this.navigateToPage('/navegar/dashboard');
          }
        });
      } else {
        this.loader.disable();

        const message = {
          severity: 'error',
          summary: 'Erro',
          detail: response.data
        }

        this.messageService.clear();
        this.messageService.add(message);
      }
    });
  }
}
