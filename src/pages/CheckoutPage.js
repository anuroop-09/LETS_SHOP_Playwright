import { expect } from "@playwright/test";

export default class CheckoutPage {

    constructor(page) {
        this.page = page;

        this.checkoutItems = page.locator('div.item__details');
        this.creditCardNumInput = page.locator('//div[text()="Credit Card Number "]/following-sibling::input');
        this.cvvCodeInput = page.locator('//div[text()="CVV Code "]/following-sibling::input');
        this.nameOnCardInput = page.locator('//div[text()="Name on Card "]/following-sibling::input');
        this.applyCouponInput = page.locator('//div[text()="CVV Code "]/following-sibling::input');
        this.applyCouponBtn = page.getByRole('button', { name: 'Apply Coupon' });
        this.selectCountryField = page.getByPlaceholder('Select Country');
        this.countryItems = page.locator('section.ta-results button');
        this.placeOrderBtn = page.getByText('Place Order');
    }

    /**
     * This method is used to verify the specific product is present in Checkout List in Checkout page
     * @param {Object} productDetails { productName: value, productPrice: value }
     */
    async verifyProductInCheckoutList(productDetails = null) {
        try {
            const { productName, productPrice } = productDetails;
            await expect(this.checkoutItems.first()).toBeVisible();
            console.log('Product Items are available in Checkout list in Checkout page');
            const productsListCount = await this.checkoutItems.count();
            let isProductFound = false;
            for (let i = 0; i < productsListCount; i++) {
                const currentProductNameInCart = (await this.checkoutItems.nth(i).locator('css=div.item__title').textContent()).trim();
                if (currentProductNameInCart === productName) {
                    isProductFound = true;
                    console.log(`${productName} product is available in Checkout`);
                    const actualProductPrice = await this.checkoutItems.nth(i).locator('css=div.item__price').textContent();
                    const formattedActualProductPrice = actualProductPrice.split(" ")[2];
                    if (formattedActualProductPrice === productPrice) {
                        console.log(`Price of ${productName} product matched successfully with expected price in Checkout page`);
                    } else {
                        throw new Error(`Prices were not matched to the ${productName} product.\nActual Price: ${formattedActualProductPrice}\nExpected Price: ${productPrice}`);
                    }
                    break;
                }
            }

            if(!isProductFound) {
                throw new Error(`${productName} product is not available in Checkout list`);
            }
        } catch (error) {
            console.error('An error occured in verifyProductInCheckoutList', error.message);
        }
    }

    /**
     * This method is used to handle personal information form in Checkout page
     * @param {Object} [options] 
     * @param {String} [options.creditCardNumVal] 
     * @param {Object} [options.expiryDateVal] 
     * @param {String} [options.cvvCodeVal] 
     * @param {String} [options.nameOnCardVal] 
     * @param {String} [options.couponVal] 
     * @param {Boolean} [options.applyCoupon] 
     */
    async fillPersonalInformationForm({ creditCardNumVal = '1111 2222 3333 4444', expiryDateVal = null, cvvCodeVal = '123', nameOnCardVal = null, couponVal = null, applyCoupon = false } = {}) {
        try {
            if (creditCardNumVal) {
                await this.creditCardNumInput.fill(creditCardNumVal);
                console.log(`Entered ${creditCardNumVal} value in Credit Card Number field`);
            }

            if (expiryDateVal) {}

            if (cvvCodeVal) {
                await this.cvvCodeInput.fill(cvvCodeVal);
                console.log(`Entered ${cvvCodeVal} value in CVV Code field`);
            }

            if (nameOnCardVal) {
                await this.nameOnCardInput.fill(nameOnCardVal);
                console.log(`Entered ${nameOnCardVal} in Name on Card field`);
            }

            if (couponVal) {
                await this.applyCouponInput.fill(couponVal);
                console.log(`Entered ${couponVal} value in Coupon field`);
                if (applyCoupon) {
                    await this.applyCouponBtn.click();
                    console.log('Clicked on Apply coupon');
                }
            }
        } catch (error) {
            console.error('An error occured in fillPersonalInformationForm', error.message);
        }
    }

    /**
     * This method is used to handle shipping information form in Checkout page
     * @param {String} countryToSelect 
     */
    async fillShippingInformationForm(countryToSelect = null) {
        try {
            await this.selectCountryField.pressSequentially(countryToSelect);
            console.log(`Entered ${countryToSelect} value in Country dropdown field`);
            await expect(this.countryItems.first()).toBeVisible();
            console.log('Country option items are displayed');
            const countryItemsCount = await this.countryItems.count();
            for (let i = 0; i < countryItemsCount; i++) {
                const currentCounrtyItemName = (await this.countryItems.nth(i).locator('css=span').textContent()).trim();
                if (currentCounrtyItemName === countryToSelect) {
                    await this.countryItems.nth(i).click();
                    console.log(`${countryToSelect} country is selected`);
                }
            }
        } catch (error) {
            console.error('An error occured in fillShippingInformationForm', error.message);
        }
    }

    /**
     * This method is used to handle 'Place Order' in the Checkout page
     */
    async proceedToPlaceOrder() {
        try {
            await this.placeOrderBtn.click();
            console.log('Clicked on Place Order button in Checkout page');
        } catch (error) {
            console.error('An error occured in proceedToPlaceOrder', error.message);
        }
    }

}