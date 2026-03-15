import { expect } from "@playwright/test";
import BaseClass from "./BaseClass.js";

export default class LoginPage extends BaseClass {

    constructor(page) {
        super(page);
        this.page = page;
        this.loginTitle = page.getByRole('heading', { name: 'Log in' });
        this.emailInput = page.getByPlaceholder('email@example.com');
        this.passwordInput = page.getByPlaceholder('enter your passsword');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
    }

    /**
     * This method is used to login to the the application
     * @param {String} username 
     * @param {String} password 
     * @param {Boolean} login 
     * @param {Object} [options]
     * @param {String} [options.msgType] - Type of message to validate in toast
     * @param {Boolean} [options.verifyToastMsg] - Whether to verify the toast message
     */
    async loginToApplication(username = null, password = null, login = true, { msgType = 'loginSuccess', verifyToastMsg = true } ={}) {
        try {
            if (username) {
                await this.emailInput.fill(username);
                console.log(`Entered ${username} in Email Id field`);
            }

            if (password) {
                await this.passwordInput.fill(password);
                console.log(`Entered ${password} in Password field`);
            }

            if (login) {
                await this.loginBtn.click();
                console.log('Clicked on Login button');
                if (verifyToastMsg) await this.validateToastMessage(msgType);
            }
        } catch (error) {
            console.error('An error occured in loginToApplication', error.message);
        }
    }
}