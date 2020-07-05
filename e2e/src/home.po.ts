import {browser, by, element} from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('.title')).getText();
  }

  getProductListLength() {
    return element.all(by.css('table tbody tr')).count();
  }

  getBadgeValue() {
    return element(by.css('.cart-info .badge')).getText();
  }

  getProductEl(index: number = 0) {
    return element.all(by.css('table tbody tr')).get(index);
  }

  getFirstProductQuantityEl(index: number = 0) {
    const row = this.getProductEl(index);
    return row.element(by.css('.quantity-field'));
  }

  getProductQuantity(index: number = 0) {
    const quantityField = this.getFirstProductQuantityEl(index);
    const counter = quantityField.element(by.css('.counter-value'));
    return counter.getText();
  }

  getIncreaseQuantityBtn(index: number = 0) {
    const quantityField = this.getFirstProductQuantityEl(index);
    return quantityField.element(by.css('.actions .increase-btn'));
  }

  getAddToCartBtn(index: number = 0) {
    const row = this.getProductEl(index);
    return row.element(by.css('.btn-add-to-cart'));
  }

  getCartBtn() {
    return element.all(by.id('t-cart-action'));
  }

  getCartItemsLength() {
    return element.all(by.css('ca-cart-items .item')).count();
  }

  getCartTotalValue() {
    return element.all(by.css('.total-info .value')).getText();
  }

  getCheckoutBtn() {
    return element.all(by.css('.checkout-btn'));
  }
}
