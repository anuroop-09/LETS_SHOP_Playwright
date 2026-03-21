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
        this.registerHereLink = page.getByText('Register here');
        this.registerTitle = page.getByRole('heading', { name: 'Register' });
        this.firstNameLabel = page.getByText('First Name');
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameLabel = page.getByText('Last Name');
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailLabel = page.getByText('Email');
        this.emailInput = page.getByRole('textbox', { name: 'email@example.com' });
        this.phoneNumberLabel = page.getByText('Phone Number');
        this.phoneNumberInput = page.getByRole('textbox', { name: 'enter your number' });
        this.occupationLabel = page.getByText('Occupation', { exact: true });
        this.occupationSelectInput = page.locator('select[formcontrolname="occupation"]');
        this.genderLabel = page.getByText('Gender');
        this.passwordLabel = page.getByText('Password', { exact: true });
        this.passwordInput = page.getByRole('textbox', { name: 'Passsword' });
        this.confirmPasswordLabel = page.getByText('Confirm Password');
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' });
        this.ageConfirmationLabel = page.getByText('I am 18 year or Older');
        this.ageConfirmationCheckbox = page.getByRole('checkbox');
        this.registerBtn = page.getByRole('button', { name: 'Register' });
        this.accountCreatedHeading = page.getByRole('heading', { name: 'Account Created Successfully' });
        this.loginBtnAccountCreated = page.getByRole('button', { name: 'Login' });
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
            }

            if (verifyToastMsg) await this.validateToastMessage(msgType);
        } catch (error) {
            console.error('An error occured in loginToApplication', error.message);
        }
    }

    /**
     * This method is used to navigate to Registration page from Login page
     */
    async navigateToRegistrationPage() {
        try {
            await expect(this.registerHereLink).toBeVisible();
            await this.registerHereLink.click();
            console.log('Clicked on Register here link');
            await expect(this.registerTitle).toBeVisible();
            console.log('Navigated to Registration page');
        } catch (error) {
            console.error('An error occured in navigateToRegristrationPage', error.message);
        }
    }

    /**
     * This method is used to handle the registeration form filling and submission based on the parameters passed to it. It can be used to fill the form partially or completely based on the parameters passed and can also be used to validate the relevant toast message based on the action performed.
     * @param {Object} [options]
     * @param {String} [options.firstName] - First Name of the user
     * @param {String} [options.lastName] - Last Name of the user
     * @param {String} [options.email] - Email Id of the user
     * @param {String} [options.phoneNumber] - Phone Number of the user
     * @param {String} [options.occupation] - Occupation of the user to be selected from dropdown options
     * @param {String} [options.gender] - Gender of the user to be selected from radio button options
     * @param {String} [options.password] - Password to be entered in the form
     * @param {String} [options.confirmPassword] - Confirm Password to be entered in the form
     * @param {Boolean} [options.isUnderAge] - Whether to check the age confirmation checkbox or not
     * @param {Boolean} [options.register] - Whether to click on Register button or not
     * @param {Boolean} [options.verifyToastMsg] - Whether to validate the toast message or not
     * @param {String} [options.msgType] - Type of message to validate in toast
     */
    async handleRegistrationForm({ firstName, lastName, email, phoneNumber, occupation, gender, password, confirmPassword, isUnderAge, register = true, verifyToastMsg = true, msgType = 'registerSuccess' } = {}) {
        try {
            if (firstName) {
                await expect(this.firstNameLabel).toBeVisible();
                await this.firstNameInput.fill(firstName);
                console.log(`Entered ${firstName} in First Name field`);
            }

            if (lastName) {
                await expect(this.lastNameLabel).toBeVisible();
                await this.lastNameInput.fill(lastName);
                console.log(`Entered ${lastName} in Last Name field`);
            }

            if (email) {
                await expect(this.emailLabel).toBeVisible();
                await this.emailInput.fill(email);
                console.log(`Entered ${email} in Email field`);
            }

            if (phoneNumber) {
                await expect(this.phoneNumberLabel).toBeVisible();
                await this.phoneNumberInput.fill(phoneNumber);
                console.log(`Entered ${phoneNumber} in Phone Number field`);
            }

            if (occupation) {
                await expect(this.occupationLabel).toBeVisible();
                await this.selectOptionFromDropdown(this.occupationSelectInput, 'visibleText', occupation);
                console.log(`Selected ${occupation} in Occupation dropdown`);
            }

            if (gender) {
                await expect(this.genderLabel).toBeVisible();
                await this.page.getByRole('radio', { name: gender, exact: true }).check();
                console.log(`Selected ${gender} gender option`);
            }

            if (password) {
                await expect(this.passwordLabel).toBeVisible();
                await this.passwordInput.fill(password);
                console.log(`Entered ${password} in Password field`);
            }

            if (confirmPassword) {
                await expect(this.confirmPasswordLabel).toBeVisible();
                await this.confirmPasswordInput.fill(confirmPassword);
                console.log(`Entered ${confirmPassword} in Confirm Password field`);
            }

            if (isUnderAge) {
                await expect(this.ageConfirmationLabel).toBeVisible();
                await this.ageConfirmationCheckbox.check();
                console.log('Checked the age confirmation checkbox');
            }

            if (register) {
                await this.registerBtn.click();
                console.log('Clicked on Register button');
            }

            if (verifyToastMsg) await this.validateToastMessage(msgType);
        } catch (error) {
            console.error('An error occured in handleRegistrationForm', error.message);
        }
    }

    /**
     * This method is used to verify the account creation success popup after successful registration
     */
    async verifyAccountCreationPopup() {
        try {
            await expect(this.accountCreatedHeading).toBeVisible();
            console.log('Account Created Successfully heading is visible in the popup');
            await expect(this.loginBtnAccountCreated).toBeVisible();
            console.log('Login button is visible in the Account Creation popup');
        } catch (error) {
            console.error('An error occured in verifyAccountCreationPopup', error.message);
        }
    }

    /**
     * This method is used to navigate to Login page from Account Creation popup after successful registration
     */
    async navigateToLoginPageFromAccountCreated() {
        try {
            await expect(this.loginBtnAccountCreated).toBeVisible();
            await this.loginBtnAccountCreated.click();
            console.log('Clicked on Login button in Account Creation popup');
            await expect(this.loginTitle).toBeVisible();
            console.log('Navigated to Login page');
        } catch (error) {
            console.error('An error occurred in navigateToLoginPageFromAccountCreated', error.message);
        }
    }
}