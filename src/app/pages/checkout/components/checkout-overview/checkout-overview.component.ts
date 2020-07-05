import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ShippingValue} from '../../models/shipping-value.model';
import {PaymentValue} from '../../models/payment-value.model';
import {CartService} from '../../../../services/cart.service';
import {Product} from '../../../../models/product.model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {SuccessInfoComponent} from '../success-info/success-info.component';
import {Cart} from '../../../../models/cart.model';

@Component({
  selector: 'ca-checkout-overview',
  templateUrl: './checkout-overview.component.html',
  styleUrls: ['./checkout-overview.component.scss']
})
export class CheckoutOverviewComponent implements OnInit, OnDestroy {

  @Input() shippingValue: ShippingValue;
  @Input() paymentValue: PaymentValue;

  items: Product[];
  totalSum: number;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private cartService: CartService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit() {
    this.items = this.cartService.itemsValue;
    this.totalSum = this.cartService.totalSum;

    this.watchCartChange();
  }

  watchCartChange() {
    this.cartService.onCartStateChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((cartState) => {
        this.items = cartState.items;
        this.totalSum = cartState.totalSum;
      });
  }

  onQuantityChange({item, quantity}) {
    item.quantity = quantity;
    this.cartService.addCartItem(item);
  }

  removeItem(productId: string) {
    this.cartService.removeItemFormCart(productId);
  }

  confirm() {
    console.log('shippingValue: ', this.shippingValue);
    console.log('paymentValue: ', this.paymentValue);
    console.log('cartValue: ', this.cartService.cartStateValue);

    this.openSuccessInfoModal();
  }

  openSuccessInfoModal() {
    const modalRef = this.modalService.open(SuccessInfoComponent, { centered: true, size: 'sm' });
    modalRef.result.then(() => {
      this.router.navigateByUrl('home');
      this.cartService.setCartState(new Cart());
      this.cartService.setCartLS(new Cart());
    }, () => {});
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
