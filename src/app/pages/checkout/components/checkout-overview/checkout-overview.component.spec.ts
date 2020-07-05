import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutOverviewComponent } from './checkout-overview.component';
import {CartItemsComponent} from '../../../../shared/cart-items/cart-items.component';
import {CounterComponent} from '../../../../shared/counter/counter.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CustomCurrencyPipe} from '../../../../pipes/custom-currency.pipe';

describe('CheckoutOverviewComponent', () => {
  let component: CheckoutOverviewComponent;
  let fixture: ComponentFixture<CheckoutOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutOverviewComponent, CartItemsComponent, CounterComponent, CustomCurrencyPipe ],
      imports: [
        RouterTestingModule,
      ],
      providers: [CustomCurrencyPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
