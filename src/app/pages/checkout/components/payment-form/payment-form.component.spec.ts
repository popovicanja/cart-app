import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormComponent } from './payment-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    expect(component).toBeTruthy();

    component.form.controls.accountOwner.setValue('');
    component.form.controls.iBan.setValue('');

    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    expect(component).toBeTruthy();

    component.form.controls.accountOwner.setValue('Anja');
    component.form.controls.iBan.setValue('GB33BUKB20201555555555');

    expect(component.form.valid).toBeTruthy();
  });

  it('form control accountOwner should be valid', () => {
    expect(component).toBeTruthy();

    component.form.controls.accountOwner.setValue('Anja');
    expect(component.form.controls.accountOwner.valid).toBeTruthy();
  });

  it('form control accountOwner should be invalid', () => {
    expect(component).toBeTruthy();

    component.form.controls.accountOwner.setValue('Anja9');
    expect(component.form.controls.accountOwner.valid).toBeFalsy();
  });

  it('form control iBan should be valid', () => {
    expect(component).toBeTruthy();

    component.form.controls.iBan.setValue('GB33BUKB20201555555555');
    expect(component.form.controls.iBan.valid).toBeTruthy();
  });

  it('form control iBan should be invalid', () => {
    expect(component).toBeTruthy();

    component.form.controls.iBan.setValue('jsnif35345353');
    expect(component.form.controls.iBan.valid).toBeFalsy();
  });
});
