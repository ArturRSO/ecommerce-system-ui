import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Regex } from 'src/app/utils/enums/regex.enum';
import { CartItem } from 'src/app/utils/models/cart-item.model';

@Component({
  selector: 'app-cart-item-quantity-form',
  templateUrl: './cart-item-quantity-form.component.html',
  styleUrls: ['./cart-item-quantity-form.component.scss']
})
export class CartItemQuantityFormComponent implements OnInit {

  @Input() maxQuantity: number;
  @Input() productId: number;
  @Input() quantity: number;

  @Output() itemSent: EventEmitter<CartItem> = new EventEmitter();

  public form: UntypedFormGroup;
  public submitted = false;
  public validationMessages: any;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.setValidationMessages();
  }

  get f() {
    return this.form.controls;
  }

  public submitForm(): void {
    this.submitted = true;

    if (!this.form.invalid) {
      this.itemSent.emit(new CartItem(this.productId, this.form.value.quantity));
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      quantity: [this.quantity, [Validators.required, Validators.min(1), Validators.max(this.maxQuantity), Validators.pattern(Regex.ONLY_NUMBERS)]]
    });
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
