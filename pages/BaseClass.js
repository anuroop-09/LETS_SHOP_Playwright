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
        this.registerSuccessMsg = page.getByLabel('Registered Successfully');
        this.userRegisteredMsg = page.getByLabel('User already exisits with this Email Id!');
        this.lastNameRequiredMsg = page.getByLabel('Last Name is required!');
        this.emailInvalidMsg = page.getByLabel('Enter Valid Email!');
        this.passwordLessCharMsg = page.getByLabel('Password must be 8 Character Long!');
        this.passwordFormatMsg = page.getByLabel('Please enter 1 Special Character, 1 Capital 1, Numeric 1 Small');
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

        // FORGOT PASSWORD
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.enterNewPasswordTitle = page.getByRole('heading', { name: 'Enter New Password' });

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
     * @param {String} msgType - loginSuccess, logoutSuccess, registerSuccess, userRegistered, lastNameRequired, emailInvalid, passwordLessChar, passwordFormat, productAdded, incorrectLogin, noItemsInCart
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
                case "registerSuccess":
                    await expect(this.registerSuccessMsg).toBeVisible();
                    console.log('Register Successfully toast message displayed');
                    break;
                case "userRegistered":
                    await expect(this.userRegisteredMsg).toBeVisible();
                    console.log('User already exists with this Email Id! toast message displayed');
                    break;
                case "lastNameRequired":
                    await expect(this.lastNameRequiredMsg).toBeVisible();
                    console.log('Last Name is required! toast message displayed');
                    break;
                case "emailInvalid":
                    await expect(this.emailInvalidMsg).toBeVisible();
                    console.log('Enter Valid Email! toast message displayed');
                    break;
                case "passwordLessChar":
                    await expect(this.passwordLessCharMsg).toBeVisible();
                    console.log('Password must be 8 Character Long! toast message displayed');
                    break;
                case "passwordFormat":
                    await expect(this.passwordFormatMsg).toBeVisible();
                    console.log('Password must meet the required format! toast message displayed');
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
     * 
     */
    async clickOnForgotPasswordLink() {
        try {
            await expect(this.forgotPasswordLink).toBeVisible();
            console.log('Forgot Password link is visible on the page');
            await this.forgotPasswordLink.click();
            console.log('Clicked on Forgot Password link');
            await expect(this.enterNewPasswordTitle).toBeVisible();
            console.log('Navigated to Enter New Password page successfully');
        } catch (error) {
            console.error('An error occured in clickOnForgotPasswordLink', error.message);
        }
    }

    /**
     * This method is used to select an option from dropdown based on the locator and value provided
     * @param {String} dropdownLoc 
     * @param {String} optionVal 
     */
    async selectOptionFromDropdown(dropdownLoc, selectType = 'value', optionVal) {
        try {
            const dropdown = dropdownLoc;
            if (selectType === 'value') {
                await dropdown.selectOption(optionVal);
            } else if (selectType === 'visibleText') {
                await dropdown.selectOption({ label: optionVal });
            } else if (selectType === 'index') {
                await dropdown.selectOption({ index: optionVal });
            }
            console.log(`Selected ${optionVal} in dropdown`);
        } catch (error) {
            console.error('An error occured in selectOptionFromDropdown', error.message);
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

    /**
     * This method is used to generate a unique email address based on a base email
     * @param {String} emailPrefix 
     */
    async generateUniqueEmail(emailPrefix) {
        try {
            const randomNum = Math.floor(Math.random() * 10000);
            const uniqueEmail = `${emailPrefix}+${randomNum}@gmail.com`;
            console.log(`Generated unique email - ${uniqueEmail}`);
            return uniqueEmail;
        } catch (error) {
            console.error('An error occured in generateUniqueEmail', error.message);
        }
    }

    /**
     * This method is used to compare the screenshots and verify if there is any visual regression in the application
     */
    async compareAndVerifyScreenShot(locator, screenshotName, screenshotOptions = null) {
        try {
            let options = { ...screenshotOptions };
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);
            await expect(locator).toHaveScreenshot(screenshotName, options);
            console.log(`Screenshot ${screenshotName} compared successfully`);
        } catch (error) {
            console.error('An error occured in compareAndVerifyScreenShot', error.message);
        }
    }

}