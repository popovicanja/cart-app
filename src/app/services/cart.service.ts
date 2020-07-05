import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Cart} from '../models/cart.model';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartState: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(new Cart());

  constructor() {}

  setCartState(cart: Cart) {
    this.cartState.next(cart);
  }

  updateCartState(items: Product[]) {
    const cart = new Cart();
    cart.items = items;
    cart.totalSum = this.calculateTotalSum(cart.items);
    cart.totalItems = this.calculateTotalItems(cart.items);
    this.cartState.next(cart);
    this.setCartLS(cart);
  }

  addCartItem(product: Product, addOnOldValue = false) {
    const cartState = this.cartStateValue;
    const {items} = cartState;
    const itemIndex = this.getItemIndex(items, product.id);
    if (itemIndex !== -1) {
      const oldQuantity = addOnOldValue ? items[itemIndex].quantity : 0;
      product.quantity += oldQuantity
      items[itemIndex] = product;
    } else {
      items.push(product);
    }
    this.updateCartState(items);
  }

  getItemIndex(items: Product[], id: string) {
    return items.findIndex(el => el.id === id);
  }

  get cartStateValue(): Cart {
    return this.cartState.getValue();
  }

  get itemsValue(): Product[] {
    return this.cartStateValue.items;
  }

  get totalSum(): number {
    return this.cartStateValue.totalSum;
  }

  onCartStateChange(): Observable<Cart> {
    return this.cartState.asObservable();
  }

  private calculateTotalItems(items: Product[]) {
    return items.reduce((acc, curr) => acc + curr.quantity, 0);
  }

  private calculateTotalSum(items: Product[]) {
    return items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  }

  removeItemFormCart(productId: string) {
    const items = this.itemsValue;
    const itemIndex = this.getItemIndex(items, productId);
    items.splice(itemIndex, 1);
    this.updateCartState(items);
  }

  setCartLS(cart: Cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCartLS() {
    const cartLS = localStorage.getItem('cart');
    if (cartLS) {
      const cart = JSON.parse(cartLS)
      return cart;
    }
    return null;
  }

}
