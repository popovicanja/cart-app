import {Component, OnInit, ViewChild} from '@angular/core';
import {CheckoutStep} from './models/checkout-step.model';
import {ShippingValue} from './models/shipping-value.model';
import {PaymentValue} from './models/payment-value.model';
import {StepperComponent} from './components/stepper/stepper.component';

@Component({
  selector: 'ca-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  readonly shippingStep = 1;
  readonly paymentStep = 2;
  readonly checkoutOverviewStep = 3;

  activeStepId: number;
  activeStepName: number;

  checkoutSteps: CheckoutStep[] = [
    {id: this.shippingStep, name: 'Shipping', isCompleted: false},
    {id: this.paymentStep, name: 'Payment', isCompleted: false},
    {id: this.checkoutOverviewStep, name: 'Checkout Overview', isCompleted: false},
  ];

  shippingValue: ShippingValue = null;
  paymentValue: PaymentValue = null;

  @ViewChild(StepperComponent, {static: false}) stepperComponent: StepperComponent;

  constructor() { }

  ngOnInit() {
  }

  onShippingFormCompleted(value: ShippingValue) {
    this.shippingValue = value;
    this.stepperComponent.completeStep(this.shippingStep);
  }

  onPaymentFormCompleted(value: PaymentValue) {
    this.paymentValue = value;
    this.stepperComponent.completeStep(this.paymentStep);
  }

  onStepChange({id, name}) {
    this.activeStepId = id;
    this.activeStepName = name;
  }

  onInvalidSubmitAttempt(id) {
    this.stepperComponent.incompleteStep(id);
  }
}
