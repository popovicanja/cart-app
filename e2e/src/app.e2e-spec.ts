import { browser, logging } from 'protractor';
import {HomePage} from './home.po';
import {CheckoutPage} from './checkout.po';

describe('Product List Page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  afterEach(() => {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  it('Should display Cart app title', async () => {
    page.navigateTo();
    expect((await page.getTitle()).toLowerCase()).toEqual('cart app');
  });

  it('Should display product list', () => {
    page.navigateTo();
    expect(page.getProductListLength()).toEqual(5);
  });

  it('Should cart be empty', async () => {
    page.navigateTo();
    expect(Number(await page.getBadgeValue())).toEqual(0);
  });

  it('Should quantity of product be 1', async () => {
    page.navigateTo();
    expect(Number(await page.getProductQuantity())).toEqual(1);
  });

  it('Should increase product quantity when click on top-arrow', async () => {
    page.navigateTo();
    expect(Number(await page.getProductQuantity())).toEqual(1);
    page.getIncreaseQuantityBtn().click();
    expect(Number(await page.getProductQuantity())).toEqual(2);
  });

  it('Should increase cart items by 1 when click add to cart btn', async () => {
    page.navigateTo();

    expect(Number(await page.getBadgeValue())).toEqual(0);

    expect(Number(await page.getProductQuantity())).toEqual(1);

    // add to cart button 1 product
    await page.getAddToCartBtn().click();
    expect(Number(await page.getBadgeValue())).toEqual(1);
  });

  it('Should increase cart items by product quantity when click add to cart btn', async () => {
    page.navigateTo();

    expect(Number(await page.getBadgeValue())).toEqual(0);

    expect(Number(await page.getProductQuantity())).toEqual(1);

    // add to cart button 1 product
    await page.getAddToCartBtn().click();
    expect(Number(await page.getBadgeValue())).toEqual(1);

    // increase quantity by one
    page.getIncreaseQuantityBtn().click();
    expect(Number(await page.getProductQuantity())).toEqual(2);

    // add to cart 2 products
    await page.getAddToCartBtn().click();
    expect(Number(await page.getBadgeValue())).toEqual(3);
  });

  it('Should add two different products to cart', async () => {
    page.navigateTo();

    expect(Number(await page.getBadgeValue())).toEqual(0);

    expect(Number(await page.getProductQuantity())).toEqual(1);

    // increase quantity by one for first product
    await page.getAddToCartBtn().click();
    expect(Number(await page.getBadgeValue())).toEqual(1);

    // increase quantity by one for second product
    page.getIncreaseQuantityBtn(1).click();
    expect(Number(await page.getProductQuantity(1))).toEqual(2);
    // add to cart 2 products
    await page.getAddToCartBtn(1).click();

    expect(Number(await page.getBadgeValue())).toEqual(3);
  });

  it('Should display two products in cart', async () => {
    page.navigateTo();

    // add first product to cart
    await page.getAddToCartBtn().click();
    expect(Number(await page.getBadgeValue())).toEqual(1);

    // increase quantity by one for second product
    page.getIncreaseQuantityBtn(1).click();
    expect(Number(await page.getProductQuantity(1))).toEqual(2);
    // add to cart 2 products
    await page.getAddToCartBtn(1).click();

    expect(Number(await page.getBadgeValue())).toEqual(3);

    await page.getCartBtn().click();

    expect(Number (await page.getCartItemsLength())).toEqual(2);

  });

  it('Should display total value', async () => {
    page.navigateTo();

    // add first product to cart
    await page.getAddToCartBtn().click();
    expect(Number(await page.getBadgeValue())).toEqual(1);

    await page.getCartBtn().click();

    expect(page.getCartTotalValue).toBeTruthy();

  });

  it('On checkout click should navigate to checkout page', async () => {
    page.navigateTo();

    // add first product to cart
    await page.getAddToCartBtn().click();
    expect(Number(await page.getBadgeValue())).toEqual(1);

    await page.getCartBtn().click();

    await page.getCheckoutBtn().click();
    expect(browser.getCurrentUrl()).toContain('checkout');

  });

});

async function addItemsToCartAndCheckout() {
  const page = new HomePage();
  page.navigateTo();

  // add first product to cart
  await page.getAddToCartBtn().click();
  expect(Number(await page.getBadgeValue())).toEqual(1);

  // increase quantity by one for second product
  page.getIncreaseQuantityBtn(1).click();
  expect(Number(await page.getProductQuantity(1))).toEqual(2);
  // add to cart 2 products
  await page.getAddToCartBtn(1).click();

  expect(Number(await page.getBadgeValue())).toEqual(3);

  await page.getCartBtn().click();

  expect(Number (await page.getCartItemsLength())).toEqual(2);

  await page.getCheckoutBtn().click()

  expect(browser.getCurrentUrl()).toContain('checkout');

}


describe('Checkout Page', () => {
  let page: CheckoutPage;

  beforeEach(() => {
    page = new CheckoutPage();
  });

  afterEach(() => {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  it('Should display \'Welcome to checkout process\' title', async () => {
    await addItemsToCartAndCheckout();
    expect((await page.getTitle()).toLowerCase()).toEqual('welcome to checkout process');
  });

  it('Should have 3 checkout steps', async () => {
    await addItemsToCartAndCheckout();
    expect(Number(await page.getStepsLength())).toEqual(3);
  });

  it('Should active step contains \'Shipping\' label', async () => {
    await addItemsToCartAndCheckout();
    expect((await page.getActiveStep()).toLowerCase()).toEqual('shipping');
  });

  it('When click on another step, active step is not changed', async () => {
    await addItemsToCartAndCheckout();
    await page.getStep(2).click();
    expect((await page.getActiveStep()).toLowerCase()).toEqual('shipping');
  });

  it('Populate shipping form invalid, should stay on same step', async () => {
    await addItemsToCartAndCheckout();

    await page.populateShippingFormInValid();

    await page.getSubmitBtn().click();

    expect((await page.getActiveStep()).toLowerCase()).toEqual('shipping');
  });

  async function populateValidShippingForm() {
    await page.populateShippingFormValid();

    await page.getSubmitBtn().click();

    expect((await page.getActiveStep()).toLowerCase()).toEqual('payment');
    expect(page.getStepClasses(0)).toContain('completed');
  }

  it('Populate shipping form valid, should complete step and switch active to next step', async () => {
    await addItemsToCartAndCheckout();

    await populateValidShippingForm();
  });

  it('Populate payment form invalid, should stay on same step', async () => {
    await addItemsToCartAndCheckout();

    await populateValidShippingForm();

    await page.populatePaymentInValidForm();

    await page.getSubmitBtn().click();

    expect((await page.getActiveStep()).toLowerCase()).toEqual('payment');
  });

  async function populateValidPaymentForm() {
    await page.populatePaymentValidForm();

    await page.getSubmitBtn().click();

    expect((await page.getActiveStep()).toLowerCase()).toEqual('checkout overview');
    expect(page.getStepClasses(1)).toContain('completed');
  }

  it('Populate payment form valid, should complete step and switch active to next step', async () => {
    await addItemsToCartAndCheckout();

    await populateValidShippingForm();

    await populateValidPaymentForm();
  });

  it('When third step is active click on first step, first step should get active', async () => {
    await addItemsToCartAndCheckout();

    await populateValidShippingForm();

    await populateValidPaymentForm();

    await page.getStep(0).click();
    expect((await page.getStepTitle()).toLowerCase()).toEqual('shipping');
  });

  it('Checkout overview should contain values', async () => {
    await addItemsToCartAndCheckout();

    await populateValidShippingForm();

    await populateValidPaymentForm();

    expect(Number(await page.getInfoBoxValues())).toEqual(6);
    expect(page.getTotalValue()).toBeTruthy();
  });

  it('When steps are completed, on Confirm btn success modal is displayed', async () => {
    await addItemsToCartAndCheckout();

    await populateValidShippingForm();

    await populateValidPaymentForm();

    expect(Number(await page.getInfoBoxValues())).toEqual(6);
    expect(page.getTotalValue()).toBeTruthy();

    await page.getConfirmBtn().click();
    expect((await page.getSuccessModalTitle()).toLowerCase()).toContain('success');
  });

  it('When clicked to Product List btn, app is navigated to Product list and cart state is cleared', async () => {
    await addItemsToCartAndCheckout();

    await populateValidShippingForm();

    await populateValidPaymentForm();

    expect(Number(await page.getInfoBoxValues())).toEqual(6);
    expect(page.getTotalValue()).toBeTruthy();

    await page.getConfirmBtn().click();
    expect((await page.getSuccessModalTitle()).toLowerCase()).toContain('success');

    await page.getGoToProductListBtn().click();

    expect(browser.getCurrentUrl()).toContain('home');

    const homePage = new HomePage();
    expect(Number(await homePage.getBadgeValue())).toEqual(0);
  });






});

