import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import {StepperComponent} from './components/stepper/stepper.component';
import {ShippingFormComponent} from './components/shipping-form/shipping-form.component';
import {PaymentFormComponent} from './components/payment-form/payment-form.component';
import {CheckoutOverviewComponent} from './components/checkout-overview/checkout-overview.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CartItemsComponent} from '../../shared/cart-items/cart-items.component';
import {CounterComponent} from '../../shared/counter/counter.component';
import {CustomCurrencyPipe} from '../../pipes/custom-currency.pipe';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckoutComponent,
        StepperComponent,
        ShippingFormComponent,
        PaymentFormComponent,
        CheckoutOverviewComponent,
        CartItemsComponent,
        CounterComponent,
        CustomCurrencyPipe,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        CustomCurrencyPipe,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
