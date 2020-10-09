import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserService } from 'src/app/core/services/user.service';
import { InputMasks } from 'src/app/shared/utils/input-masks.enum';
import { RegexEnum } from 'src/app/shared/utils/regex.enum';
import { MustMatch } from 'src/app/shared/validators/must-match.validator';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  private documentRegex = new RegExp(RegexEnum.CPF);
  private registrationType: string;

  public birthdayYearRange: string;
  public documentLabel = 'CPF';
  public documentMask = InputMasks.CPF;
  public form: FormGroup;
  public minBirthday: Date;
  public maxBirthday: Date;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getRegistrationType();
    this.buildForm();
    this.getBirthdayRange();
  }

  get f() {
    return this.form.controls;
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(new RegExp(RegexEnum.NAME))]],
      lastName: ['', [Validators.required, Validators.pattern(new RegExp(RegexEnum.NAME))]],
      documentNumber: ['', [Validators.required, Validators.pattern(this.documentRegex)]],
      birthday: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(new RegExp(RegexEnum.PASSWORD))]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  public getBirthdayRange(): void {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 16);

    this.birthdayYearRange = `${minDate.getFullYear()}:${maxDate.getFullYear()}`
    this.minBirthday = minDate;
    this.maxBirthday = maxDate;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // TO DO

    // this.loader.enable();
    const user = this.form.value;

    delete user.confirmPassword;
    user.documentType = 1;
    user.role = 4;

    console.log(user);
    console.log(user.birthday.toLocaleDateString('en-US'));
  }

  public getRegistrationType(): void {
    this.registrationType = this.router.url.split('/')[2];
  }
}
