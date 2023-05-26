import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Regex } from 'src/app/utils/enums/regex.enum';
import { CartItem } from 'src/app/utils/models/cart-item.model';

@Component({
  selector: 'app-add-to-cart-modal',
  templateUrl: './add-to-cart-modal.component.html',
  styleUrls: ['./add-to-cart-modal.component.scss']
})
export class AddToCartModalComponent implements OnInit {

  public form: UntypedFormGroup;
  public submitted = false;
  public validationMessages: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddToCartModalComponent>,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.setValidationMessages();
  }

  get f() {
    return this.form.controls;
  }

  public buttonClick(message: string) {
    if (message === 'Confirmar') {
      this.confirm();

    } else {
      this.dismiss();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(this.data.product.quantity), Validators.pattern(Regex.ONLY_NUMBERS)]]
    });
  }

  private confirm(): void {
    this.submitted = true;

    if (!this.form.invalid) {
      this.dialogRef.close(new CartItem(this.data.product.productId, this.form.value.quantity));
    }
  }

  private dismiss(): void {
    this.dialogRef.close(null);
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      quantity: [
        { type: 'required', message: 'Digite a quantidade' },
        { type: 'min', message: 'Digite um valor maior que zero.' },
        { type: 'max', message: 'Estoque insuficiente do produto para atender este pedido.' },
        { type: 'pattern', message: 'Digite um valor válido.' }
      ]
    }
  }
}
