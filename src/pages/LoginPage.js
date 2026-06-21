import { expect } from "@playwright/test";
import BasePage from "./BasePage.js";
import CommonUtil from "../utils/CommonUtil.js";
import ToastMessage from "../page-components/ToastMessage.js";

export default class LoginPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.loginTitle = page.getByRole('heading', { name: 'Log in' });
        this.emailLabel = page.locator('label[for="email"]');
        this.emailInput = page.getByPlaceholder('email@example.com');
        this.emailFieldWarning = page.getByText('*Email is required');
        this.passwordLabel = page.locator('label[for="password"]');
        this.passwordInput = page.getByPlaceholder('enter your passsword');
        this.passwordFieldWarning = page.getByText('*Password is required');
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
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.registerHereLink = page.locator('p a.text-reset');
        this.enterNewPasswordTitle = page.getByRole('heading', { name: 'Enter New Password' });

        this.forgotPasswordTitle = this.page.getByRole('heading', { name: 'Enter New Password' });
        this.emailLabelForgotPassword = this.page.getByText('Email');
        this.emailInputForgotPassword = this.page.getByRole('textbox', { name: 'Enter your email address' });
        this.emailFieldWarningForgotPassword = this.page.getByText('*Email is required');
        this.passwordLabelForgotPassword = this.page.getByText('Password', { exact: true });
        this.passwordInputForgotPassword = this.page.locator('input#userPassword');
        this.passwordFieldWarningForgotPassword = this.page.getByText('*Password is required');
        this.confirmPasswordLabelForgotPassword = this.page.getByText('Confirm Password');
        this.confirmPasswordInputForgotPassword = this.page.locator('input#confirmPassword');
        this.confirmPasswordFieldWarningForgotPassword = this.page.getByText('*Confirm Password is required');
        this.saveNewPasswordBtn = this.page.getByRole('button', { name: 'Save New Password' });
        this.loginLinkForgotPassword = this.page.getByRole('link', { name: 'Login' });
        this.registerLinkForgotPassword = this.page.getByRole('link', { name: 'Register' });

        // CLASSESS
        this.commonutilsIns = new CommonUtil(page);
        this.toastMessageIns = new ToastMessage(page);
    }

    /**
     * This method is used to validate the Login form when landed on Login page of the application
     */
    async verifyLoginFormUI() {
        try {
            await expect(this.loginTitle).toBeVisible();
            console.log('Login Title is visibile');
            await expect(this.emailLabel).toBeVisible();
            console.log('Email Label is visibile');
            await expect(this.emailInput).toBeVisible();
            console.log('Email Input field is visibile');
            await expect(this.passwordLabel).toBeVisible();
            console.log('Password Label is visibile');
            await expect(this.passwordInput).toBeVisible();
            console.log('Password Input is visibile');
            await expect(this.loginBtn).toBeVisible();
            console.log('Login button is visibile');
            await expect(this.forgotPasswordLink).toBeVisible();
            console.log('Forgot Password Link is visibile');
            await expect(this.registerHereLink).toBeVisible();
            console.log('Don\'t have an account? Register here Link is visibile');
        } catch (error) {
            console.error('An error occured in loginToApplication', error.message);
        }
    }

    /**
     * This method is used to login to the the application
     * @param {String} emailid 
     * @param {String} password 
     * @param {Boolean} loginAction 
     * @param {Object} [options]
     * @param {String} [options.msgType] - Type of message to validate in toast
     * @param {Boolean} [options.verifyToastMsg] - Whether to verify the toast message
     */
    async loginToApplication({ emailid = null, password = null, loginAction = true, msgType = 'loginSuccess', verifyToastMsg = true } ={}) {
        try {
            if (emailid) {
                await this.emailInput.fill(emailid);
                console.log(`Entered ${emailid} in Email Id field`);
            }

            if (password) {
                await this.passwordInput.fill(password);
                console.log(`Entered ${password} in Password field`);
            }

            if (loginAction) {
                await this.loginBtn.click();
                console.log('Clicked on Login button');
            }

            if (verifyToastMsg) await this.toastMessageIns.validateToastMessage(msgType);
        } catch (error) {
            console.error('An error occured in loginToApplication', error.message);
        }
    }

    /**
     * This method is used to verify the field warnings of login form when user tries to login without providing the necessary login details
     * @param {boolean} emailWarning 
     * @param {boolean} passwordWarning 
     */
    async verifyFieldWarningsOfLoginForm(emailWarning = true, passwordWarning = true) {
        try {
            if (emailWarning) {
                await expect(this.emailFieldWarning).toBeVisible();
                console.log('Email field warning is visible');
            }
            if (passwordWarning) {
                await expect(this.passwordFieldWarning).toBeVisible();
                console.log('Password field warning is visible');
            }
        } catch (error) {
            console.error('An error occurred while verifying field warnings', error.message);
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
    async handleRegistrationForm({ firstName, lastName, email, phoneNumber, occupation, gender, password, confirmPassword, isUnderAge, registerAction = true, verifyToastMsg = true, msgType = 'registerSuccess' } = {}) {
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

            if (registerAction) {
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

    /**
     * This method is used to click on Forgot Password link and navigate to Enter New Password page
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
     * This method is used to verify the UI of Forgot Password page
     */
    async verifyForgotPasswordFormUI() {
        try {
            await expect(this.forgotPasswordTitle).toBeVisible();
            console.log('Forgot Password page title is visible');
            await expect(this.emailLabelForgotPassword).toBeVisible(); 
            console.log('Email label is visible on Forgot Password page');
            await expect(this.emailInputForgotPassword).toBeVisible();
            console.log('Email input field is visible on Forgot Password page');
            await expect(this.passwordLabelForgotPassword).toBeVisible();
            console.log('Password label is visible on Forgot Password page');
            await expect(this.passwordInputForgotPassword).toBeVisible();
            console.log('Password input field is visible on Forgot Password page');
            await expect(this.confirmPasswordLabelForgotPassword).toBeVisible();
            console.log('Confirm Password label is visible on Forgot Password page');
            await expect(this.confirmPasswordInputForgotPassword).toBeVisible();
            console.log('Confirm Password input field is visible on Forgot Password page');
            await expect(this.saveNewPasswordBtn).toBeVisible();
            console.log('Save New Password button is visible on Forgot Password page');
            await expect(this.loginLinkForgotPassword).toBeVisible();
            console.log('Login link is visible on Forgot Password page');
            await expect(this.registerLinkForgotPassword).toBeVisible();
            console.log('Register link is visible on Forgot Password page');
        } catch (error) {
            console.error('An error occured in verifyForgotPasswordFormUI', error.message);
        }
    }

    /**
     * This method is used to handle the Forgot Password form filling and submission based on the parameters passed to it. It can be used to fill the form partially or completely based on the parameters passed and can also be used to validate the relevant toast message based on the action performed.
      * @param {Object} [options]
      * @param {String} [options.emailid] - Email Id to be entered in the form
      * @param {String} [options.password] - New Password to be entered in the form
      * @param {String} [options.confirmPassword] - Confirm Password to be entered in the form
      * @param {Boolean} [options.saveAction] - Whether to click on Save New Password button or not
      * @param {Boolean} [options.verifyToastMsg] - Whether to validate the toast message or not
      * @param {String} [options.msgType] - Type of message to validate in toast
     */
    async handleForgotPasswordForm({ emailid = null, password = null, confirmPassword = null, saveAction = true, verifyToastMsg = true, msgType = 'passwordReset' } = {}) {
        try {
            if (emailid) {
                await this.emailInputForgotPassword.fill(emailid);
                console.log(`Entered ${emailid} in Email field on Forgot Password page`);
            }

            if (password) {
                await this.passwordInputForgotPassword.fill(password);
                console.log(`Entered ${password} in Password field on Forgot Password page`);
            }

            if (confirmPassword) {
                await this.confirmPasswordInputForgotPassword.fill(confirmPassword);
                console.log(`Entered ${confirmPassword} in Confirm Password field on Forgot Password page`);
            }

            if (saveAction) {
                await this.saveNewPasswordBtn.click();
                console.log('Clicked on Save New Password button on Forgot Password page');
            }

            if (verifyToastMsg) await this.toastMessageIns.validateToastMessage(msgType);
        } catch (error) {
            console.error('An error occured in handleForgotPasswordForm', error.message);
        }
    }

    /**
     * This method is used to verify the field warnings of Forgot Password form when user tries to reset the password without providing the necessary details
     * @param {boolean} emailWarning 
     * @param {boolean} passwordWarning 
     * @param {boolean} confirmPasswordWarning 
     */
    async verifyFieldWarningsOfForgotPasswordForm(emailWarning = true, passwordWarning = true, confirmPasswordWarning = true) {
        try {
            if (emailWarning) {
                await expect(this.emailFieldWarningForgotPassword).toBeVisible();
                console.log('Email warning is visible on Forgot Password page');
            }
            if (passwordWarning) {
                await expect(this.passwordFieldWarningForgotPassword).toBeVisible();
                console.log('Password warning is visible on Forgot Password page');
            }
            if (confirmPasswordWarning) {
                await expect(this.confirmPasswordFieldWarningForgotPassword).toBeVisible();
                console.log('Confirm Password warning is visible on Forgot Password page');
            }
        } catch (error) {
            console.error('An error occurred in verifyFieldWarningsOfForgotPasswordForm', error.message);
        }
    }

    /**
     * This method is used to navigate to Login page from Forgot Password page
     */
    async navigateToLoginPageFromForgotPassword() {
        try {
            await expect(this.loginLinkForgotPassword).toBeVisible();
            await this.loginLinkForgotPassword.click();
            console.log('Clicked on Login link on Forgot Password page');
            await expect(this.loginTitle).toBeVisible();
            console.log('Navigated to Login page successfully from Forgot Password page');
        } catch (error) {
            console.error('An error occurred in navigateToLoginPageFromForgotPassword', error.message);
        }
    }
}