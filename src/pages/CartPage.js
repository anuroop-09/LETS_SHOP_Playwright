import { expect } from "@playwright/test";

export default class CartPage {

    constructor(page) {
        this.page = page;

        this.cartTitle = page.getByRole('heading', { name: 'My Cart' });
        this.noProductsHeading = page.getByRole('heading', { name: 'No Products in Your Cart !' });
        this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping❯' });
        this.cartItems = page.locator('div.cart ul');
        this.checkOutBtn = page.getByRole('button', { name: 'Checkout❯' });
        this.subtotalLabel = page.locator('(//li[@class="totalRow"])[1]/span[@class="label"]');
        this.subtotalAmount = page.locator('(//li[@class="totalRow"])[1]/span[@class="value"]');
        this.totalLabel = page.locator('(//li[@class="totalRow"])[2]/span[@class="label"]');
        this.totalAmount = page.locator('(//li[@class="totalRow"])[2]/span[@class="value"]');
    }

    /**
     * This method is used to verify the UI of Cart page based on the products added to cart or not
     * @param {boolean} productAdded - indicates if a product is added to the cart
     * @param {Object} productDetails - details of the product added to the cart
     */
    async verifyCartPageUI(productAdded = false, productDetails = null) {
        try {
            if (productAdded) {
                const { productName, productPrice } = productDetails;
                await expect(this.cartTitle).toBeVisible();
                console.log('My Cart heading is visible in Cart page');
                await expect(this.cartItems.first()).toBeVisible();
                console.log('Product Items are available in My Cart list in Cart page');
                const productsListCount = await this.cartItems.count();
                for (let i = 0; i < productsListCount; i++) {
                    await expect(this.cartItems.nth(i).locator('css=div.cartSection h3')).toBeVisible();
                    const currentProductNameInCart = await this.cartItems.nth(i).locator('css=div.cartSection h3').textContent();
                    console.log(`${productName} is visible in My Cart list`);
                    await expect(this.cartItems.nth(i).locator('css=div.prodTotal p')).toBeVisible();
                    console.log(`Price of ${productName} is visible in My Cart list`);
                    await expect(this.cartItems.nth(i).getByRole('button', { name: 'Buy Now❯' })).toBeVisible();
                    console.log(`Buy Now button of ${productName} is visible in My Cart list`);
                    await expect(this.cartItems.nth(i).locator('css=button.btn-danger')).toBeVisible();
                    console.log(`Delete button of ${productName} is visible in My Cart list`);
                    if (currentProductNameInCart === productName) break;
                }
                await expect(this.subtotalLabel).toBeVisible();
                console.log('Subtotal label is visible in Cart page');
                await expect(this.subtotalAmount).toBeVisible();
                console.log('Subtotal amount is visible in Cart page');
                await expect(this.totalLabel).toBeVisible();
                console.log('Total label is visible in Cart page');
                await expect(this.totalAmount).toBeVisible();
                console.log('Total amount is visible in Cart page');
                await expect(this.checkOutBtn).toBeVisible();
                console.log('Checkout button is visible in Cart page');
            } else {
                await expect(this.cartTitle).toBeVisible();
                console.log('My Cart heading is visible in Cart page');
                await expect(this.noProductsHeading).toBeVisible();
                console.log('No Products in Your Cart ! heading is visible in Cart page');
                await expect(this.continueShoppingBtn).toBeVisible();
                console.log('Continue Shopping button is visible in Cart page');
            }
        } catch (error) {
            console.error('An error occurred in verifyCartPageUI', error.message);
        }
    }

    /**
     * This method is used to verify the specific product is present in My Cart list in Cart page
     * @param {Object} productDetails { productName: value, productPrice: value }
     * @param {String} productDetails.productName
     * @param {String} productDetails.productPrice
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

            if (!isProductFound) {
                throw new Error(`${productName} product is not available in My Cart list`)
            }

        } catch (error) {
            console.error('An error occured in verifyProductInCartList', error.message);
        }
    }

    /**
     * This method is used to delete a specific product from the Cart list
     * @param {String} productName 
     */
    async deleteProductFromCartList(productName = null) {
        try{
            await expect(this.cartItems.first()).toBeVisible();
            console.log('Product Items are available in My Cart list in Cart page');
            const productsListCount = await this.cartItems.count();
            let isProductFound = false;
            for (let i = 0; i < productsListCount; i++) {
                const currentProductNameInCart = await this.cartItems.nth(i).locator('css=div.cartSection h3').textContent();
                if (currentProductNameInCart === productName) {
                    isProductFound = true;
                    await this.cartItems.nth(i).locator('css=button.btn-danger').click();
                    console.log(`Clicked on delete button of ${productName} product in My Cart list`);
                    await expect(this.cartItems.nth(i)).not.toBeVisible();
                    console.log(`${productName} product is deleted successfully from My Cart list in Cart page`);
                    break;
                }
            }

            if (!isProductFound) {
                throw new Error(`${productName} product is not available in My Cart list to delete`)
            }
        } catch (error) {
            console.error('An error occured in deleteProductFromCartList', error.message);
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

    /**
     * This method is used to handle 'Continue Shopping' button in the Cart page
     */
    async clickOnContinueShoppingBtn() {
        try {
            await expect(this.continueShoppingBtn).toBeVisible();
            console.log('Continue Shopping button is visible in Cart page');
            await this.continueShoppingBtn.click();
            console.log('Clicked on Continue Shopping button in Cart page');
        } catch (error) {
            console.error('An error occured in clickOnContinueShoppingBtn', error.message);
        }
    }
}