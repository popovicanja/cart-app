import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DecimalPipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CounterComponent } from './shared/counter/counter.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutOverviewComponent } from './pages/checkout/components/checkout-overview/checkout-overview.component';
import {PaymentFormComponent} from './pages/checkout/components/payment-form/payment-form.component';
import {ShippingFormComponent} from './pages/checkout/components/shipping-form/shipping-form.component';
import { AngularIbanModule } from 'angular-iban';
import { CartItemsComponent } from './shared/cart-items/cart-items.component';
import { SuccessInfoComponent } from './pages/checkout/components/success-info/success-info.component';
import { StepperComponent } from './pages/checkout/components/stepper/stepper.component';
import {CustomCurrencyPipe} from './pipes/custom-currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CounterComponent,
    CartComponent,
    CheckoutComponent,
    CheckoutOverviewComponent,
    PaymentFormComponent,
    ShippingFormComponent,
    CartItemsComponent,
    SuccessInfoComponent,
    StepperComponent,
    CustomCurrencyPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularIbanModule,
  ],
  providers: [
    DecimalPipe,
    CustomCurrencyPipe,
    {
      provide: LOCALE_ID,
      useValue: 'de-DE' // 'de-DE' for Germany
    }
  ],
  entryComponents: [
    CartComponent,
    SuccessInfoComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
