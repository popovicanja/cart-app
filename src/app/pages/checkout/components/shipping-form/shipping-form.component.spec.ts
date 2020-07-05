import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFormComponent } from './shipping-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('ShippingFormComponent', () => {
  let component: ShippingFormComponent;
  let fixture: ComponentFixture<ShippingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    expect(component).toBeTruthy();

    component.form.controls.firstName.setValue('');
    component.form.controls.lastName.setValue('');
    component.form.controls.address.setValue('');
    component.form.controls.phoneNumber.setValue('');

    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    expect(component).toBeTruthy();

    component.form.controls.firstName.setValue('Anja');
    component.form.controls.lastName.setValue('Popoovic');
    component.form.controls.address.setValue('Njegoseva 10');
    component.form.controls.phoneNumber.setValue('+8686768');

    expect(component.form.valid).toBeTruthy();
  });

  it('form control firstName should be valid', () => {
    expect(component).toBeTruthy();

    component.form.controls.firstName.setValue('Anja');
    expect(component.form.controls.firstName.valid).toBeTruthy();
  });

  it('form control firstName should be invalid', () => {
    expect(component).toBeTruthy();

    component.form.controls.firstName.setValue('Anja9');
    expect(component.form.controls.firstName.valid).toBeFalsy();
  });

  it('form control lastName should be valid', () => {
    expect(component).toBeTruthy();

    component.form.controls.lastName.setValue('Popovic');
    expect(component.form.controls.lastName.valid).toBeTruthy();
  });

  it('form control lastName should be invalid', () => {
    expect(component).toBeTruthy();

    component.form.controls.lastName.setValue('Popovic6');
    expect(component.form.controls.lastName.valid).toBeFalsy();
  });

  it('form control  phoneNumber should be valid', () => {
    expect(component).toBeTruthy();

    component.form.controls.phoneNumber.setValue('+667868');
    expect(component.form.controls.phoneNumber.valid).toBeTruthy();
  });

  it('form control  phoneNumber should be invalid', () => {
    expect(component).toBeTruthy();

    component.form.controls.phoneNumber.setValue('667868+');
    expect(component.form.controls.phoneNumber.valid).toBeFalsy();
  });
});
