import { expect } from "@playwright/test";

export default class ProductPage {

    constructor(page) {
        this.page = page;

        this.continueShoppingBtn = page.getByRole('link', { name: 'Continue Shopping❯' });
        this.addToCartBtn = page.getByRole('button', { name: 'Add To Cart' });
    }

    /**
     * This method is used to add the product to Cart from Product details page
     */
    async addProductToCart() {
        try {
            await expect(this.addToCartBtn).toBeVisible();
            console.log('Add To Cart button is visible on the page');
            await this.addToCartBtn.click();
            console.log('Clicked on Add To Cart button');
        } catch (error) {
            console.error('An error occured in addProductToCart', error.message);
        }
    }

    /**
     * This method is used to click on Continue Shopping button from Cart page
     */
    async clickOnContinueShoppingBtn() {
        try {
            await expect(this.continueShoppingBtn).toBeVisible();
            console.log('Continue Shopping button is visible');
            await this.continueShoppingBtn.click();
            console.log('Continue Shopping button clicked in Product page');
        } catch (error) {
            console.error('An error occured in verifyProductDetailsPage', error.message);
        }
    }

    /**
     * This method is used to verify the Product details page for a specific product
     * @param {Object} productDetails
     * @param {String} productDetails.productName
     * @param {String} productDetails.productPrice
     */
    async verifyProductDetailsPage(productDetails = null) {
        try {
            const { productName, productPrice } = productDetails;
            await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
            console.log(`${productName} product name is matched in Product page`);
            await expect(this.page.getByRole('heading', { name: productPrice })).toBeVisible();
            console.log(`${productPrice} product price is matched in Product page`);
        } catch (error) {
            console.error('An error occured in verifyProductDetailsPage', error.message);
        }
    }
}