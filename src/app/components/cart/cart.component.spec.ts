import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import {CartItemsComponent} from '../../shared/cart-items/cart-items.component';
import {CounterComponent} from '../../shared/counter/counter.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomCurrencyPipe} from '../../pipes/custom-currency.pipe';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent, CartItemsComponent, CounterComponent, CustomCurrencyPipe ],
      providers: [NgbActiveModal, CustomCurrencyPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
