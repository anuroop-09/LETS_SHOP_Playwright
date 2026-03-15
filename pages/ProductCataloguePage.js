import { expect } from "@playwright/test";
import BaseClass from "./BaseClass.js";

export default class ProductCataloguePage extends BaseClass {

    constructor(page) {
        super(page);
        this.page = page;

        this.productCards = page.locator('div.card');
    }

    /**
     * This method is used to add any specific product to cart based on the name
     * @param {String} productName
     * @returns {Object}
     */
    async addProductToCartByName(productName = null) {
        try {
            await expect(this.productCards.first()).toBeVisible();
            console.log('Products displayed on Product Catalouge page');
            const productDetails = {};
            const productCardsCount = await this.productCards.count();
            for (let i = 0; i < productCardsCount; i++) {
                const currentCardProductName = await this.productCards.nth(i).locator('css=b').textContent();
                if(currentCardProductName === productName) {
                    await this.productCards.nth(i).getByRole('button', { name: '   Add To Cart' }).click();
                    console.log(`${productName} product added to Cart`);
                    await this.validateToastMessage('productAdded');
                    const productPrice = await this.productCards.nth(i).locator('div.text-muted').textContent();
                    const formattedProductPrice = productPrice.split(" ")[1].trim();
                    productDetails.productName = productName;
                    productDetails.productPrice = formattedProductPrice;
                    console.log('Retreived Product Information details successfully');
                    break;
                }
            }
            return productDetails;
        } catch (error) {
            console.error('An error occured in addProductToCartByName', error.message);
            return null;
        }
    }
}