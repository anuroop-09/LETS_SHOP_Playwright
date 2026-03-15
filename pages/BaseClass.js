import { expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default class BaseClass {

    constructor(page) {
        this.page = page;
        this.loginTitle = page.getByRole('heading', { name: 'Log in' });

        // TOAST MSGS
        this.loginSuccessMsg = page.getByLabel('Login Successfully');
        this.logoutSuccessMsg = page.getByRole('alert', { name: 'Logout Successfully' });
        this.productAddedMsg = page.getByRole('alert', { name: 'Product Added To Cart' });
        this.orderPlacedMsg = page.getByLabel('Order Placed Successfully');
        this.incorrectLoginMsg = page.getByRole('alert', { name: 'Incorrect email or password.' });
        this.noProductInCartMsg = page.getByRole('alert', { name: 'No Product in Your Cart' });

        // HOME
        this.homeBtn = page.getByRole('button', { name: ' HOME' });
        this.homeSidebarText = page.locator('#sidebar').getByText('Home | Search');
        
        // ORDERS
        this.ordersBtn = page.getByRole('button', { name: '   ORDERS' });
        this.noOrdersText = page.getByText('You have No Orders to show at this time. Please Visit Back Us');
        this.ordersTitleHeading = page.getByRole('heading', { name: 'Your Orders' });

        // CART
        this.cartBtn = page.getByRole('button', { name: '   Cart' });
        this.noProductsInCartText = page.getByRole('heading', { name: 'No Products in Your Cart !' });
        this.cartTitleHeading = page.getByRole('heading', { name: 'My Cart' });
        
        // SIGN OUT
        this.signOutBtn = page.getByRole('button', { name: 'Sign Out' });

    }

    /**
     * This method is used to launch the application on the browser session
     */
    async launchApplication() {
        try {
            // const url = process.env.APP_URL || "https://rahulshettyacademy.com/client/"
            // this.page.goto(url);
            this.page.goto('/client');
            await expect(this.loginTitle).toBeVisible();
            console.log('Application launched successfully');
        } catch (error) {
            console.error('An error occured in launchApplication', error.message);
        }
    }

    /**
     * This method is used to validate the toast messages based on actions on the relevant page
     * @param {String} msgType - loginSuccess, logoutSuccess, productAdded, incorrectLogin, noItemsInCart
     */
    async validateToastMessage(msgType) {
        try {
            switch (msgType) {
                case "loginSuccess":
                    await expect(this.loginSuccessMsg).toBeVisible();
                    console.log('Login Successfully toast message displayed');
                    break;
                case "logoutSuccess":
                    await expect(this.logoutSuccessMsg).toBeVisible();
                    console.log('Logout Successfully toast message displayed');
                    break;
                case "productAdded":
                    await expect(this.productAddedMsg).toBeVisible();
                    console.log('Product Added To Cart toast message displayed');
                    break;
                case "orderPlaced":
                    await expect(this.orderPlacedMsg).toBeVisible();
                    console.log('Order Placed Successfully toast message displayed');
                    break;
                case "incorrectLogin":
                    await expect(this.incorrectLoginMsg).toBeVisible();
                    console.log('Incorrect email or password toast message displayed');
                    break;
                case "noItemsInCart":
                    await expect(this.noProductInCartMsg).toBeVisible();
                    console.log('No Product in your Cart message displayed');
                    break;
                default: throw new Error(`Invalid message type provided - ${msgType}`);
            }
        } catch (error) {
            console.error('An error occured in validateToastMessage', error.message);
        }
    }

    /**
     * This method is used to navigate to Home page
     */
    async navigateToHome() {
        try {
            await expect(this.homeBtn).toBeVisible();
            console.log('Home button is visible on the page');
            await this.homeBtn.click();
            console.log('Clicked on Home button');
            await expect(this.homeSidebarText).toBeVisible();
            console.log('Navigated to Home page');
        } catch (error) {
            console.error('An error occured in navigateToHome', error.message);
        }
    }

    /**
     * This method is used to navigate to Orders page
     */
    async navigateToOrders(isOrdersEmpty = false) {
        try {
            await expect(this.ordersBtn).toBeVisible();
            console.log('Orders button is visible on the page');
            await this.ordersBtn.click();
            console.log('Clicked on Orders button');
            if (isOrdersEmpty) {
                await expect(this.noOrdersText).toBeVisible();
                console.log('Navigated to Orders page and able to see No orders to show message');
            } else {
                await expect(this.ordersTitleHeading).toBeVisible();
                console.log('Navigated to Orders page');
            }
        } catch (error) {
            console.error('An error occured in navigateToOrders', error.message);
        }
    }

    /**
     * This method is used to navigate to Cart page
     */
    async navigateToCart(isCartEmpty = false) {
        try {
            await expect(this.cartBtn).toBeVisible();
            console.log('Cart button is visible on the page');
            await this.cartBtn.click();
            console.log('Clicked on Cart button');
            if (isCartEmpty) {
                await expect(this.noProductsInCartText).toBeVisible();
                console.log('Navigated to Cart page and able to see No products in Cart messgae');
                await this.validateToastMessage('noItemsInCart');
            } else {
                await expect(this.cartTitleHeading).toBeVisible();
                console.log('Navigated to Cart page');
            }
        } catch (error) {
            console.error('An error occured in navigateToCart', error.message);
        }
    }

    /**
     * This method is used to Logout from application
     */
    async logoutFromApplication() {
        try {
            await expect(this.signOutBtn).toBeVisible();
            console.log('Sign Out button is visible on the page');
            await this.signOutBtn.click();
            console.log('Clicked on Sign Out button');
            await this.validateToastMessage('logoutSuccess');
        } catch (error) {
            console.error('An error occured in navigateToCart', error.message);
        }
    }

    /**
     * This method ise used to get the column or index position value
     * @param {String} locatorEle
     * @param {String} fieldName
     */
    async getColIndex(locatorEle, fieldName) {
        try {
            let index = 1;
            const itemsCount = await this.page.locator(locatorEle).count();
            for(let i = 0; i < itemsCount; i++) {
                const itemName = await this.page.locator(locatorEle).nth(i).textContent();
                if (itemName === fieldName) {
                    console.log(`Found '${fieldName}' column or index position at ${index} on the current ${await this.page.title()} page`);
                    return index;
                }
                index += 1;
            }
        } catch (error) {
            console.error('An error occured in getColIndex', error.message);
        }
    }

    /**
     * This method is used to pick a random value out of an array
     * @param {Array} array
     */
    async choice(array) {
        try {
            return array[Math.trunc(Math.random() * array.length)];
        } catch (error) {
            console.error('An error occured in choice', error.message);
        }
    }

}