import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { PaymentMethodService } from 'src/app/core/services/payment-method.service';
import { ProductCartService } from 'src/app/core/services/product-cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { CartItemQuantityFormComponent } from 'src/app/shared/cart-item-quantity-form/cart-item-quantity-form.component';
import { CartItem } from 'src/app/utils/models/cart-item.model';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {

  @ViewChildren('cartItemForm') cartItemForms: QueryList<CartItemQuantityFormComponent>;

  public authentication: any;
  public productCart: any;
  public products = [];
  public instructionText: string;
  public statusText: string;
  public total = 0;

  private authenticationState: Subscription;

  constructor(
    private authService: AuthenticationService,
    private cartService: ProductCartService,
    private loader: LoaderService,
    private modalService: ModalService,
    private paymentMethodService: PaymentMethodService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getAuthentication();
    this.checkAuthenticationChange();
    this.setTexts();
  }

  public clearCart(): void {
    this.cartService.clearCart();
    this.getProducts();
  }

  public getCartQuantityByProductId(productId: number): number {

    return this.productCart.find(item => item.id === productId).quantity;
  }

  public goToProductDetails(productId: number) {
    this.navigateToPage(`loja/detalhe?product=${productId}`);
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public placeOrder(): void {
    if (this.authentication.authenticated) {
      const cart = this.cartService.getCart();

      if (!cart || cart.length < 1) {
        this.modalService.openSimpleModal('Atenção', 'Você não possui itens no carrinho!', [{ text: 'OK' }]);

      } else {
        this.loader.enable();
        this.paymentMethodService.getPaymentMethods().subscribe(response => {
          this.loader.disable();

          if (response.success) {
            this.modalService.openPaymentMethodPickModal('Método de pagamento', 'Como você vai pagar?', response.data).subscribe(response => {
              if (response) {
                this.navigateToPage('loja/pagamento');
              }
            });

          } else {
            this.modalService.openSimpleModal('Atenção', 'Serviço indisponível, tente novamente mais tarde.', [{ text: 'OK' }]);
          }
        });
      }

    } else {
      sessionStorage.setItem('nextRoute', 'loja/carrinho');
      this.navigateToPage('auth/login');
    }
  }

  public removeItemFromCart(product: any) {
    this.cartService.removeFromCart(product.productId);
    this.getProducts();
  }

  public submitCartItemForm(elementIndex: number) {
    this.cartItemForms.get(elementIndex).submitForm();
  }

  public updateCartItem(item: CartItem) {
    if (this.cartService.updateItemFromCart(item)) {
      this.modalService.openSimpleModal('Sucesso', 'Carrinho atualizado!', [{ text: 'OK' }]).subscribe(() => {
        this.getProducts();
      });

    } else {
      this.modalService.openSimpleModal('Atenção', 'Não foi possível atualizar o carrinho!', [{ text: 'OK' }]);
    }
  }

  private checkAuthenticationChange(): void {
    this.authenticationState = this.authService.getAuthenticationChange().subscribe(state => {
      this.authentication = state;
      this.setTexts();
    });
  }

  private getAuthentication(): void {
    this.authentication = this.authService.getAuthenticationState();
  }

  private getProducts(): void {
    const cart = this.cartService.getCart();
    this.products = [];
    this.total = 0;

    if (cart) {
      this.productCart = cart;
      for (let item of cart) {
        this.loader.enable();
        this.productService.getProductById(item.id).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.products.push(response.data);
            this.total += response.data.price * item.quantity;

          } else {
            this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
          }
        });
      }
    }
  }

  private setTexts(): void {
    if (this.authentication.authenticated) {
      this.instructionText = 'Clique nos botões para fechar o pedido ou continuar comprando.';
      this.statusText = 'Autenticado';

    } else {
      this.instructionText = 'Faça login ou cadastre-se para fechar seu pedido ou continue comprando.';
      this.statusText = 'Visitante';
    }
  }
}
