import { expect } from "@playwright/test";

export default class OrdersPage {

    constructor(page) {
        this.page = page;

        this.orderedItems = page.locator('//tr[@class="ng-star-inserted"]');
    }

    /**
     * This method is used to verify the Order Id for the product from Orders table
     * @param {String} productOrderId
     */
    async verifyOrderIdFromOrdersTable(productOrderId = null) {
        try {
            let isProductFound = false;
            await expect(this.orderedItems.first()).toBeVisible();
            console.log('Ordered Items are available in the Orders table');
            const ordersListCount = await this.orderedItems.count();
            const productNameIndex = await this.getColIndex('tr th[scope="col"]', 'Name');
            let productName = null;

            for (let i = 0; i < ordersListCount; i++) {
                const currentProductName = await this.orderedItems.nth(i).locator(`xpath=//td[${productNameIndex - 1}]`).textContent();
                const currentProductOrderId = await this.orderedItems.nth(i).locator(`xpath=//th[1]`).textContent();
                if (currentProductOrderId === productOrderId) {
                    isProductFound = true;
                    productName = currentProductName
                    console.log(`${currentProductName} product is available on Orders page with Order Id`);
                    break;
                }
            }

            if (!isProductFound) {
                throw new Error(`${productName} product is not available in the Orders page`)
            }
        } catch (error) {
            console.error('An error occured in verifyOrderIdFromOrdersTable', error.message);
        }
    }

    /**
     * This method is used to verify the Ordered product from Orders table
     * @param {Object} productDetails { productName: value, productPrice:value }
     */
    async verifyOrderedItemFromOrdersTable(productDetails = null) {
        try {
            let isProductFound = false;
            const { productName, productPrice } = productDetails;

            await expect(this.orderedItems.first()).toBeVisible();
            console.log('Ordered Items are available in the Orders table');
            const ordersListCount = await this.orderedItems.count();
            const productNameIndex = await this.getColIndex('tr th[scope="col"]', 'Name');
            const productPriceIndex = await this.getColIndex('tr th[scope="col"]', 'Price');

            for (let i = 0; i < ordersListCount; i++) {
                const currentProductName = await this.orderedItems.nth(i).locator(`xpath=//td[${productNameIndex - 1}]`).textContent();
                const currentProductPrice = await this.orderedItems.nth(i).locator(`xpath=//td[${productPriceIndex - 1}]`).textContent();
                const formattedProductPrice = currentProductPrice.split(" ")[1];
                if (currentProductName === productName && formattedProductPrice === productPrice) {
                    isProductFound = true;
                    console.log(`${productName} product is available on Orders page and prices were also matched`);
                    break;
                }
            }

            if (!isProductFound) {
                throw new Error(`${productName} product is not available in the Orders page`)
            }
        } catch (error) {
            console.error('An error occured in verifyOrderedItemFromTheTable', error.message);
        }
    }
}