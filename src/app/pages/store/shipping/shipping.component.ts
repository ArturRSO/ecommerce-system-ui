import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductCartService } from 'src/app/core/services/product-cart.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';
import { RegistrationRequest } from 'src/app/utils/models/registration-request.model';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  public addresses = [];
  public postalCodeMask = InputMasks.CEP;

  constructor(
    private addressService: AddressService,
    private authService: AuthenticationService,
    private cartService: ProductCartService,
    private loader: LoaderService,
    private modalService: ModalService,
    private orderService: OrderService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.getAddresses();
  }

  public confirmAddress(address: any): void {
    const cart = this.cartService.getCart();
    const paymentInfo = this.sessionStorageService.getObject('paymentInfo');

    if (!cart) {
      this.modalService.openSimpleModal('Erro', 'Não foi possível recuperar o carrinho de compras', [{ text: 'OK' }]);
    }

    if (!paymentInfo) {
      this.modalService.openSimpleModal('Erro', 'Não foi possível recuperar as informações de pagamento', [{ text: 'OK' }]);
    }

    const order = {
      userId: this.authService.getAuthenticationState().userId,
      paymentMethod: paymentInfo,
      itens: cart,
      addressId: address.addressId
    }

    this.loader.enable();

    this.orderService.createOrder(order).subscribe(response => {
      if (response.success) {
        this.cartService.clearCart();
        sessionStorage.removeItem('paymentInfo');

        this.navigateToPage('loja/conclusao');

      } else {
        this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
      }
    });
  }

  public registerAddress(): void {
    this.sessionStorageService.setObject('registerRequest', new RegistrationRequest(null, false));
    sessionStorage.setItem('nextRoute', 'loja/transporte');
    this.navigateToPage('cadastro/telefone');
  }

  private getAddresses(): void {
    this.loader.enable();

    const userId = this.authService.getAuthenticationState().userId;

    this.addressService.getAddressesByUserId(userId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.addresses = response.data;
      }
    });
  }

  private navigateToPage(route: string): void {
    this.router.navigateByUrl(route);
  }
}
