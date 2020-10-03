import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputMasks } from 'src/app/shared/utils/input-masks.enum';
import { RegexEnum } from 'src/app/shared/utils/regex.enum';
import { MustMatch } from 'src/app/shared/validators/must-match.validator';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  public cpfMask = InputMasks.CPF;
  public form: FormGroup;
  public minBirthday: Date;
  public maxBirthday: Date;
  public birthdayYearRange: string;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getBirthdayRange();
  }

  get f() {
    return this.form.controls;
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(RegexEnum.NAME)]],
      lastName: ['', [Validators.required, Validators.pattern(RegexEnum.NAME)]],
      documentNumber: ['', [Validators.required, Validators.pattern(RegexEnum.CPF_CNPJ)]],
      birthday: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(RegexEnum.PASSWORD)]],
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

    // TO DO
    console.log(this.form.value);
  }

}
