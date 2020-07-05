import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product.model';
import {Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import {OnInit, Component, OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {CartService} from '../../services/cart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CartComponent} from '../../components/cart/cart.component';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'ca-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: Product[];

  searchTerm = new FormControl('');

  isAsc = false;

  cartItemsCounter = 0;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private modalService: NgbModal,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getProducts();
    this.handleSearchTermChange();
    this.watchCartChange();
  }


  getProducts() {
    this.productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products = products;
        this.filteredProducts = products;
      });
  }

  handleSearchTermChange() {
    this.searchTerm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((text) => {
        this.filteredProducts = this.products.sort(this.sortProductsByPrice())
                                              .filter(product => product.name.toLowerCase().includes(text.toLowerCase()));
      });
  }

  watchCartChange() {
    this.cartService.onCartStateChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((cartState) => {
        this.cartItemsCounter = cartState.totalItems;
      });
  }

  onPriceSort() {
    this.isAsc = !this.isAsc;
    this.filteredProducts = this.filteredProducts.sort(this.sortProductsByPrice());
  }

  sortProductsByPrice = () => (a: Product, b: Product) => {
    const res = this.compare(a.price, b.price);
    return this.isAsc ? res : -res;
  }

  compare(v1: number, v2: number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  onQuantityChange(product: Product, quantity: number) {
    product.quantity = quantity;
  }

  addToCart(product: Product) {
    this.cartService.addCartItem({...product}, true);
  }

  openCartModal() {
    const modalRef = this.modalService.open(CartComponent, { centered: true });
    modalRef.componentInstance.name = 'cart';
    modalRef.result.then((value) => {
        if (value) {
          this.router.navigateByUrl('checkout');
        }
      }, () => {});
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
