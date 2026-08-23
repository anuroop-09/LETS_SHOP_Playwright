import { expect } from "@playwright/test";
import ToastMessage from "./ToastMessage.js";

export default class Navbar {

    constructor(page) {
        this.page = page;

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
        this.cartCountBadge = page.locator('button[routerlink="/dashboard/cart"] label');

        // SIGN OUT
        this.signOutBtn = page.getByRole('button', { name: 'Sign Out' });

        // PAGE-COMPONENTS
        this.toastMessageIns = new ToastMessage(page);
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
                await this.toastMessageIns.validateToastMessage('noItemsInCart');
            } else {
                await expect(this.cartTitleHeading).toBeVisible();
                console.log('Navigated to Cart page');
            }
        } catch (error) {
            console.error('An error occured in navigateToCart', error.message);
        }
    }

    /**
     * This method is used to verify the count of products added to Cart
     * @param {String} expectedCount 
     */
    async verifyCountFromCartLink(expectedCount = null) {
        try {
            await expect(this.cartCountBadge).toBeVisible();
            console.log('Cart count badge is visible on the page');
            const actualCount = await this.cartCountBadge.textContent();
            if (actualCount == expectedCount) {
                console.log(`Cart count is verified successfully. Expected Count: ${expectedCount} | Actual Count: ${actualCount}`);
            } else {
                throw new Error(`Cart count is not matching. Expected Count: ${expectedCount} | Actual Count: ${actualCount}`);
            }
        } catch (error) {
            console.error('An error occured in verifyCountFromCart', error.message);
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
            await this.toastMessageIns.validateToastMessage('logoutSuccess');
        } catch (error) {
            console.error('An error occured in logoutFromApplication', error.message);
        }
    }

}