import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductCartService } from 'src/app/core/services/product-cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {

  public authentication: any;
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

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public placeOrder(): void {
    if (this.authentication.authenticated) {
      const cart = this.cartService.getCart();

      if (!cart || cart.length < 1) {
        this.modalService.openSimpleModal('Atenção', 'Você não possui itens no carrinho!', [{ text:'OK' }]);
      }

      // TO DO
      console.log('PLACE ORDER!');

    } else {
      this.navigateToPage('auth/login');
    }
  }

  public removeItemFromCart(product: any) {
    this.cartService.removeFromCart(product.productId);
    this.getProducts();
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
      for (let item of cart) {
        this.loader.enable();
        this.productService.getProductById(item.id).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.products.push(response.data);
            this.total += response.data.price;

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
