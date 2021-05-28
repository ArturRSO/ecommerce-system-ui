import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';
import { Regex } from 'src/app/utils/enums/regex.enum';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  public creditCardMask = InputMasks.CREDIT_CARD;
  public cvvMask = InputMasks.CVV
  public expirationDateMask = InputMasks.TWO_DIGIT;
  public form: FormGroup;
  public submitted = false;
  public validationMessages: any;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.setValidationMessages();
  }

  get f() {
    return this.form.controls;
  }

  public onSubmit() {
    this.submitted = true;

    if (!this.form.invalid) {
      // TO DO
      console.log(this.form.value);
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      ownerName: ['', [Validators.required, Validators.pattern(Regex.NAME)]],
      cardNumber: ['', [Validators.required, Validators.pattern(Regex.ONLY_NUMBERS)]],
      expirationMonth: ['', [Validators.required, Validators.pattern(Regex.ONLY_NUMBERS)]],
      expirationYear: ['', [Validators.required, Validators.pattern(Regex.ONLY_NUMBERS)]],
      securityCode: ['', [Validators.required, Validators.pattern(Regex.ONLY_NUMBERS)]]
    });
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      ownerName: [
        { type: 'required', message: 'Digite o nome' },
        { type: 'pattern', message: 'Digite um nome válido.' }
      ],
      cardNumber: [
        { type: 'required', message: 'Digite o número do cartão' },
        { type: 'pattern', message: 'Digite um número válido.' }
      ],
      expirationMonth: [
        { type: 'required', message: 'Digite o mês de expiração' },
        { type: 'pattern', message: 'Digite um mês válido.' }
      ],
      expirationYear: [
        { type: 'required', message: 'Digite o ano de expiração' },
        { type: 'pattern', message: 'Digite um ano válido.' }
      ],
      securityCode: [
        { type: 'required', message: 'Digite o dígito verificador' },
        { type: 'pattern', message: 'Digite um dígito verificador válido.' }
      ]
    }
  }
}
