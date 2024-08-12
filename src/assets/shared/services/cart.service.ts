import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iproduct } from 'src/assets/model/iproduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Iproduct[] = [];
  private cartItemsSubject = new BehaviorSubject<Iproduct[]>(this.cartItems);

  constructor() {}

  // Add item to the cart
  addToCart(product: Iproduct) {
    const index = this.cartItems.findIndex((item) => item.id === product.id);
    if (index === -1) {
      this.cartItems = [...this.cartItems, product];
    } else {
      this.cartItems = [
        ...this.cartItems.slice(0, index),
        product,
        ...this.cartItems.slice(index + 1),
      ];
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  // Get cart items as observable
  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  // Get the total count of items in the cart
  getTotalItems() {
    return this.cartItems.length;
  }
}
