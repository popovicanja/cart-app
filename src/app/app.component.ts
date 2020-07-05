import {Component, OnInit} from '@angular/core';
import {CartService} from './services/cart.service';
import {Cart} from './models/cart.model';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'de-DE');

@Component({
  selector: 'ca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'cart-app';

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    const cart: Cart = this.cartService.getCartLS();
    if (cart) {
      this.cartService.setCartState(cart);
    }
  }
}
