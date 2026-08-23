import { expect } from "@playwright/test";
import CommonUtil from "../utils/CommonUtil";

export default class OrdersPage {

    constructor(page) {
        this.page = page;

        this.goBackToShopBtn = page.getByRole('button', { name: 'Go Back To Shop' });
        this.goBackToCartBtn = page.getByRole('button', { name: 'Go Back To Cart' });
        this.noOrdersText = page.getByText('You have No Orders to show at this time. Please Visit Back Us');
        this.orderedItems = page.locator('//tr[@class="ng-star-inserted"]');

        this.commonUtilIns = new CommonUtil(page);
    }

    /**
     * This method is used to verify the Orders page UI when there are no orders placed by the user
     */
    async verifyOrdersPageUIWhenNoOrders() {
        try {
            await expect(this.noOrdersText).toBeVisible();
            console.log('Orders page is displayed and able to see No orders to show message');
            await expect(this.goBackToShopBtn).toBeVisible();
            console.log('Go Back To Shop button is visible on the page');
            await expect(this.goBackToCartBtn).toBeVisible();
            console.log('Go Back To Cart button is visible on the page');
        } catch (error) {
            console.error('An error occured in verifyOrdersPageUIWhenNoOrders', error.message);
        }
    }


    /**
     * This method is used to click on Go Back To Shop button from Orders page and navigate back to Products Catalogue page
     */
    async clickOnGoBackToShopBtn() {
        try {
            await expect(this.goBackToShopBtn).toBeVisible();
            console.log('Go Back To Shop button is visible on the page');
            await this.goBackToShopBtn.click();
            console.log('Clicked on Go Back To Shop button');
        } catch (error) {
            console.error('An error occured in clickOnGoBackToShopBtn', error.message);
        }
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
            const productNameIndex = await this.commonUtilIns.getColIndex('tr th[scope="col"]', 'Name');
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
     * @param {String} productDetails.productName
     * @param {String} productDetails.productPrice
     */
    async verifyOrderedItemFromOrdersTable(productDetails = null) {
        try {
            let isProductFound = false;
            const { productName, productPrice } = productDetails;

            await expect(this.orderedItems.first()).toBeVisible();
            console.log('Ordered Items are available in the Orders table');
            const ordersListCount = await this.orderedItems.count();
            const productNameIndex = await this.commonUtilIns.getColIndex('tr th[scope="col"]', 'Name');
            const productPriceIndex = await this.commonUtilIns.getColIndex('tr th[scope="col"]', 'Price');

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