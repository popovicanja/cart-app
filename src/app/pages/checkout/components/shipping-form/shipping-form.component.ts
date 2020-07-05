import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ShippingValue} from '../../models/shipping-value.model';

@Component({
  selector: 'ca-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {

  @Input() completedValue: ShippingValue;

  form: FormGroup;

  submitted = false;

  @Output() completeForm: EventEmitter<ShippingValue> = new EventEmitter<ShippingValue>();
  @Output() invalidSubmitAttempt: EventEmitter<void> = new EventEmitter<void>();

  get controls() { return this.form.controls; }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      address: [null, Validators.required],
      phoneNumber: [null, [Validators.required, Validators.pattern('\\+?\\d+$')]],
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
