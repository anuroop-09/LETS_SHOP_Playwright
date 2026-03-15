import { expect } from "@playwright/test";
import BaseClass from "./BaseClass.js";

export default class CartPage extends BaseClass {

    constructor(page) {
        super(page);
        this.page = page;

        this.cartItems = page.locator('div.cart ul');
        this.checkOutBtn = page.getByRole('button', { name: 'Checkout❯' });
    }

    /**
     * This method is used to verify the specific product is present in My Cart list in Cart page
     * @param {Object} productDetails { productName: value, productPrice: value }
     */
    async verifyProductInCartList(productDetails = null) {
        try {
            const { productName, productPrice } = productDetails;
            await expect(this.cartItems.first()).toBeVisible();
            console.log('Product Items are available in My Cart list in Cart page');
            const productsListCount = await this.cartItems.count();
            let isProductFound = false;
            for (let i = 0; i < productsListCount; i++) {
                const currentProductNameInCart = await this.cartItems.nth(i).locator('css=div.cartSection h3').textContent();
                if (currentProductNameInCart === productName) {
                    isProductFound = true;
                    console.log(`${productName} product is available in My Cart list`);
                    const actualProductPrice = await this.cartItems.nth(i).locator('css=div.prodTotal p').textContent();
                    const formattedActualProductPrice = actualProductPrice.split(" ")[1];
                    if (formattedActualProductPrice === productPrice) {
                        console.log(`Price of ${productName} product matched successfully with expected price in Cart page`);
                    } else {
                        throw new Error(`\nPrices were not matched to the ${productName} product.\nActual Price: ${formattedActualProductPrice}\nExpected Price: ${productPrice}`);
                    }
                    break;
                }
            }

            if(!isProductFound) {
                throw new Error(`${productName} product is not available in My Cart list`)
            }

        } catch (error) {
            console.error('An error occured in verifyProductInCartList', error.message);
        }
    }

    /**
     * This method is used to handle 'Checkout' button in the Cart page
     */
    async proceedToCheckout() {
        try {
            await this.checkOutBtn.click();
            console.log('Clicked on Checkout button in Cart page');
        } catch (error) {
            console.error('An error occured in proceedToCheckout', error.message);
        }
    }
}