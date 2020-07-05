import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Cart} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {Product} from '../../models/product.model';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'ca-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  items: Product[];

  totalSum: number;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public activeModal: NgbActiveModal,
              private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.itemsValue;
    this.totalSum = this.cartService.totalSum;

    this.watchCartChange();
  }

  onQuantityChange({item, quantity}) {
    item.quantity = quantity;
    this.cartService.addCartItem(item);
  }

  removeItem(productId: string) {
    this.cartService.removeItemFormCart(productId);
  }

  watchCartChange() {
    this.cartService.onCartStateChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((cartState) => {
        this.items = cartState.items;
        this.totalSum = cartState.totalSum;
      });
  }

  checkout() {
    this.activeModal.close(true);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
