import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';

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
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.checkAuth();
    this.buildForm();
  }

  get f() {
    return this.form.controls;
  }

  public navigateToPage(route: string) {
    // TO DO
    console.log(route);
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // TO DO
    console.log(this.form.value);
  }

  public openRegistrationModal(): void {
    // TO DO
    console.log('OPEN REGISTRATION MODAL');
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
