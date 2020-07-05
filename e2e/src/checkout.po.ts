import {by, element} from 'protractor';

export class CheckoutPage {

  getTitle() {
    return element(by.css('.title')).getText();
  }

  getStepsLength() {
    return element.all(by.css('.steps .step')).count();
  }

  getActiveStep() {
    return element(by.css('.steps .step.active .label')).getText();
  }

  getStep(index: number) {
    return element.all(by.css('.steps .step')).get(index);
  }

  getStepClasses(index: number) {
    return element.all(by.css('.steps .step')).get(index).getAttribute('class');
  }

  getStepTitle() {
    return element(by.css('.step-title')).getText();
  }

  populateShippingFormValid() {
    return Promise.all([
      element(by.formControlName('firstName')).sendKeys('Anja'),
      element(by.formControlName('lastName')).sendKeys('Popovic'),
      element(by.formControlName('address')).sendKeys('Njegoseva'),
      element(by.formControlName('phoneNumber')).sendKeys('+5324342'),
    ]);
  }

  populateShippingFormInValid() {
    return Promise.all([
      element(by.formControlName('firstName')).sendKeys('Anja9'),
      element(by.formControlName('lastName')).sendKeys('Popovic'),
      element(by.formControlName('address')).sendKeys('Njegoseva'),
      element(by.formControlName('phoneNumber')).sendKeys('532+4342'),
    ]);
  }

  populatePaymentInValidForm() {
    return Promise.all([
      element(by.formControlName('accountOwner')).sendKeys('Anja9'),
      element(by.formControlName('iBan')).sendKeys('Popovic')
    ]);
  }

  populatePaymentValidForm() {
    return Promise.all([
      element(by.formControlName('accountOwner')).sendKeys('Anja'),
      element(by.formControlName('iBan')).sendKeys('GB33BUKB20201555555555')
    ]);
  }

  getTotalValue() {
    return element(by.css('.total-info .value'));
  }

  getInfoBoxValues() {
    return element.all(by.css('.info-box .value')).count();
  }

  getSubmitBtn() {
    return element(by.cssContainingText('.btn-success', 'Submit'));
  }

  getConfirmBtn() {
    return element(by.cssContainingText('.btn-success', 'Confirm'));
  }

  getSuccessModalTitle() {
    return element(by.css('.modal-header .title')).getText();
  }

  getGoToProductListBtn() {
    return element.all(by.css('.product-list-btn'));
  }
}
