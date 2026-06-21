import { expect } from "@playwright/test";

export default class ToastMessage {

    constructor(page) {
        this.page = page;

        // TOAST MSGS
        this.loginSuccessMsg = page.getByLabel('Login Successfully');
        this.logoutSuccessMsg = page.getByRole('alert', { name: 'Logout Successfully' });
        this.registerSuccessMsg = page.getByLabel('Registered Successfully');
        this.userRegisteredMsg = page.getByLabel('User already exisits with this Email Id!');
        this.passwordResetMsg = page.getByLabel('Password Changed Successfully');
        this.passwordResetErrorMsg = page.getByLabel('User Not found.');
        this.lastNameRequiredMsg = page.getByLabel('Last Name is required!');
        this.emailInvalidMsg = page.getByLabel('Enter Valid Email!');
        this.passwordLessCharMsg = page.getByLabel('Password must be 8 Character Long!');
        this.passwordFormatMsg = page.getByLabel('Please enter 1 Special Character, 1 Capital 1, Numeric 1 Small');
        this.productAddedMsg = page.getByRole('alert', { name: 'Product Added To Cart' });
        this.orderPlacedMsg = page.getByLabel('Order Placed Successfully');
        this.incorrectLoginMsg = page.getByRole('alert', { name: 'Incorrect email or password.' });
        this.noProductInCartMsg = page.getByRole('alert', { name: 'No Product in Your Cart' });
    }

    /**
     * This method is used to validate the toast messages based on actions on the relevant page
     * @param {String} msgType - loginSuccess, logoutSuccess, registerSuccess, userRegistered, lastNameRequired, emailInvalid, passwordLessChar, passwordFormat, productAdded, incorrectLogin, noItemsInCart, passwordReset, passwordResetError
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
                case "passwordReset":
                    await expect(this.passwordResetMsg).toBeVisible();
                    console.log('Password Changed Successfully toast message displayed');
                    break;
                case "passwordResetError":
                    await expect(this.passwordResetErrorMsg).toBeVisible();
                    console.log('User Not found toast message displayed');
                    break;
                default: throw new Error(`Invalid message type provided - ${msgType}`);
            }
        } catch (error) {
            console.error('An error occured in validateToastMessage', error.message);
        }
    }

}