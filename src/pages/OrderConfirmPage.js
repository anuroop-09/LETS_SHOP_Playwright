import { expect } from "@playwright/test";

export default class OrderConfirmPage {

    constructor(page) {
        this.page = page;

        this.orderTitleHeading = page.getByRole('heading', { name: 'Thankyou for the order.' });
        this.orderedItems = page.locator('//tr[@class="line-item ng-star-inserted"]');
        this.orderIds = page.locator('tr td label.ng-star-inserted');
    }

    async getProductOrderedId() {
        try {
            let productOrderId = null;
            const orderIdCount = await this.orderIds.count();
            if (orderIdCount > 1) {
                let orderIds = [];
                for (let i = 0; i < orderIdCount; i++) {
                    const currentOrderId = await this.orderIds.nth(i).textContent();
                    const formattedOrder = currentOrderId.split("|")[1].trim();
                    orderIds.push(formattedOrder);
                }
                productOrderId = orderIds;
                console.log('Retrevied multiple order ids successfully');
            } else {
                const orderId = await this.orderIds.first().textContent();
                productOrderId = orderId.split("|")[1].trim();
                console.log('Retrevied order id successfully');
            }

            return productOrderId;
        } catch (error) {
            console.error('An error occured in getProductOrderId', error.message);
        }
    }

    /**
     * This method is used to verify the Ordered product from the Order Confirmation page
     * @param {Object} [options]
     * @param {Boolean} [options.verifyProductInfo]
     * @param {Object} [options.productDetails] { productName: value, productPrice: value }
     * @returns 
     */
    async verifyOrderedProductConfirmation({ verifyProductInfo = false, productDetails = null } = {}) {
        try {
            await expect(this.orderTitleHeading).toBeVisible();
            await expect(this.page.getByRole('cell', { name: 'You can see all the Orders in Orders History Page', exact: true })).toBeVisible();
            await expect(this.page.getByRole('cell', { name: 'Items in your order may ship separately. View your order for shipping updates.', exact: true })).toBeVisible();
            console.log('Orders placed successfully and able to see on Order Confirmation page');

            if (verifyProductInfo) {
                let isOrderedProductFound = false;
                const { productName, productPrice } = productDetails;
                await expect(this.orderedItems.first()).toBeVisible();
                console.log('Product Items are available in the Ordered List');
                const orderedItemsCount = await this.orderedItems.count();
                for (let i = 0; i < orderedItemsCount; i++) {
                    const currentProductName = await this.orderedItems.nth(i).locator('xpath=//td[2]//div[@class="title"]').textContent();
                    const currentProductPrice = await this.orderedItems.nth(i).locator('xpath=//td[3]//div[@class="title"]').textContent();
                    const formattedProductPrice = currentProductPrice.split(" ")[1];
                    if (currentProductName === productName && formattedProductPrice === productPrice) {
                        isOrderedProductFound = true;
                        console.log(`${productName} product is available on Order Confirmation page and prices were also matched`);
                        break;
                    }
                }

                if (!isOrderedProductFound) {
                    throw new Error(`${productName} product is not available in the Order Confirmation page`)
                }
            }
        } catch (error) {
            console.error('An error occured in verifyOrderedProductConfirmation', error.message);
        }
    }
}
