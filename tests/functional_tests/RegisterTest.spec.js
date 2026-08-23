import { test, expect } from "@playwright/test";
import POM_Manager from "../../src/pages/POM_Manager.js";
import testdata from "../../testdata/json/newuserdata.json" with { type: "json" };

test.describe('Register Page Tests', () => {

    let pomManagerIns, loginPageIns, randomDataUtilIns, pageFix;

    test.beforeEach(async ({ page }) => {
        pageFix = page;
        pomManagerIns = new POM_Manager(page);
        loginPageIns = pomManagerIns.getLoginPage();
        randomDataUtilIns = pomManagerIns.getRandomDataUtil();
    });

    test.afterEach(async () => {
        await pageFix.waitForLoadState('networkidle');
        await pageFix.close();
    });

    test('TC001: Verify whether user able to navigate and view the User Registration page', async () => {
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnRegisterBtn();
        await loginPageIns.verifyRegisterFormUI();

    });

    test('TC002: Verify whether user able to navigate to Register popup with right actions links and buttons', async () => {
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnRegisterBtn();
        await pageFix.goBack();
        await loginPageIns.navigateToRegistrationPage();
    });

    test('TC003: Verify whether user able to create a new account and able to login to application with the new account', async () => {
        const navbarIns = pomManagerIns.getNavbar();

        const data = testdata.user_data1;
        const emailId = await randomDataUtilIns.generateUniqueEmail(data.email_prefix)

        await loginPageIns.launchApplication();
        await loginPageIns.clickOnRegisterBtn();
        await loginPageIns.handleRegistrationForm({
            firstName: data.first_name,
            lastName: data.last_name,
            emailId,
            phoneNumber: data.phone_number,
            occupation: await randomDataUtilIns.choice(data.occupation),
            password: data.password,
            confirmPassword: data.confirm_password,
            isUnderAge: true
        });
        await loginPageIns.verifyAccountCreationPopup();
        await loginPageIns.navigateToLoginPageFromAccountCreated();
        await loginPageIns.loginToApplication({ emailId, password: data.password });
        await navbarIns.logoutFromApplication();
    });

    test('TC004: Verify whether user able to create a new account with and existing user email address', async () => {
        const data = testdata.registered_user;

        await loginPageIns.launchApplication();
        await loginPageIns.clickOnRegisterBtn();
        await loginPageIns.handleRegistrationForm({
            firstName: data.first_name,
            lastName: data.last_name,
            emailId: data.email_id,
            phoneNumber: data.phone_number,
            occupation: data.occupation,
            password: data.password,
            confirmPassword: data.confirm_password,
            isUnderAge: true,
            msgType: 'userRegistered'
        });
    });

    test('TC005: Verify whether user able to validate field warnings on Register page when user is trying to reset the password with providing details', async () => {
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnRegisterBtn();
        await loginPageIns.handleRegistrationForm({ verifyToastMsg: false });
        await loginPageIns.verifyFieldWarningsOfRegisterForm();
        await loginPageIns.handleRegistrationForm({
            firstName: 'ab',
            emailId: 'testemail.com',
            phoneNumber: 'test',
            password: 'test@1234',
            confirmPassword: 'abc@1234',
            isUnderAge: true,
            verifyToastMsg: false 
        });
        await loginPageIns.verifyFieldWarningsOfRegisterForm({
            firstName: false, 
            firstNameInsufficentChar: true, 
            email: false, 
            emailInvalid: true, 
            phoneNumber: false, 
            phoneNumberDigits: true, 
            phoneNumberLength: true, 
            password: false, 
            confirmPassword: false, 
            confirmPasswordMismatch: true, 
            ageConfirmation: false
        });

    });

})