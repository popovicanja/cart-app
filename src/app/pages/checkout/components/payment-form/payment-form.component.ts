import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorService} from 'angular-iban';
import {PaymentValue} from '../../models/payment-value.model';
import {ShippingValue} from '../../models/shipping-value.model';

@Component({
  selector: 'ca-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  @Input() completedValue: ShippingValue;

  form: FormGroup;

  submitted = false;

  @Output() completeForm: EventEmitter<PaymentValue> = new EventEmitter<PaymentValue>();
  @Output() invalidSubmitAttempt: EventEmitter<void> = new EventEmitter<void>();

  get controls() { return this.form.controls; }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      accountOwner: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      iBan: [null, [Validators.required, ValidatorService.validateIban]],
    });

    if (this.completedValue) {
      this.form.patchValue(this.completedValue);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      if (this.completeForm) {
        // if form is invalid and step was already completed, emit invalid attempt
        this.invalidSubmitAttempt.emit();
      } else {
        // stop here if form is invalid and step is not completed
        return;
      }
    } else {
      this.completeForm.emit(this.form.value);
    }
  }

}
