import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/utils/models/cart-item.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  public addToCart(item: CartItem): void {

    let cart = this.localStorageService.getObject('cart');

    if (cart) {
      cart.push(item);

    } else {
      cart = [item]
    }

    this.localStorageService.setObject('cart', cart);
  }

  public clearCart(): void {
    localStorage.removeItem('cart');
  }

  public getCart(): any {

    const cart = this.localStorageService.getObject('cart');

    if (!cart || cart?.length < 1) {
      return null;
    }

    return cart;
  }

  public removeFromCart(itemId: number): void {
    let cart = this.localStorageService.getObject('cart');

    if (cart && cart?.length > 0) {

      cart = cart.filter(item => item.id !== itemId);

      if (cart.length < 1) {
        this.clearCart();
      }

      this.localStorageService.setObject('cart', cart);
    }
  }
}
