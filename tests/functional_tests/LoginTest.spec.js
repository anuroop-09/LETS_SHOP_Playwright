import { test } from "@playwright/test";
import POM_Manager from "../../src/pages/POM_Manager.js";
import testdata from "../../testdata/json/userdata.json" with { type: "json" };

test.describe('Login Page Tests', () => {

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

    test('TC001: Verify whether user able to land on Login page and verify the login page of application', async () => {
        // const pomManagerIns = new POM_Manager(page);
        // const loginPageIns = pomManagerIns.getLoginPage();
        await loginPageIns.launchApplication();
        await loginPageIns.verifyLoginFormUI();
    });

    test('TC002: Verify whether user able to login and logout of application using valid credentials only', async () => {
        const navbarIns = pomManagerIns.getNavbar();
        const { emailId, password } = testdata.login_test_users.register_user;

        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password });
        await navbarIns.logoutFromApplication();
    });

    test('TC003: Verify whether user not able to Login to with invalid credentials', async () => {
        const { emailId, password } = testdata.login_test_users.invalid_user;
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password, msgType: "incorrectLogin" });
    });

    test('TC004: Verify whether user not able to login to application without providing the necessary login details and able to see the field warnings', async () => {
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ verifyToastMsg: false });
        await loginPageIns.verifyFieldWarningsOfLoginForm();
        await pageFix.reload();
        await loginPageIns.loginToApplication({ emailId: 'test@example.com', verifyToastMsg: false });
        await loginPageIns.verifyFieldWarningsOfLoginForm(false, true);
        await pageFix.reload();
        await loginPageIns.loginToApplication({ password: 'test@12345', verifyToastMsg: false });
        await loginPageIns.verifyFieldWarningsOfLoginForm(true, false);
    });

    test('TC005: Verify whether user able to navigate and view the Forgot Password page', async () => {
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnForgotPasswordLink();
        await loginPageIns.verifyForgotPasswordFormUI();
    });

    test('TC006: Verify whether user able to validate field warnings on Forgot Password page when user is trying to reset the password with providing details', async () => {
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnForgotPasswordLink();
        await loginPageIns.handleForgotPasswordForm({ verifyToastMsg: false });
        await loginPageIns.verifyFieldWarningsOfForgotPasswordForm();
    });
    
    test('TC007: Verify whether user able to navigate back to Login page from Forgot Password page', async () => {
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnForgotPasswordLink();
        await loginPageIns.navigateToLoginPageFromForgotPassword();
    });

    test('TC008: Verify whether user able to reset the password and able to login to the account with new password', async () => {
        const { emailId } = testdata.login_test_users.forgot_password_user;
        const newPassword = await randomDataUtilIns.generateRandomPassword();
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnForgotPasswordLink();
        await loginPageIns.handleForgotPasswordForm({ emailId, password: newPassword, confirmPassword: newPassword });
        await loginPageIns.loginToApplication({ emailId, password: newPassword });
    });

    test('TC009: Verify whether user not able to reset the password for a non-existing user', async () => {
        const { emailId } = testdata.login_test_users.unregister_user;
        const newPassword = await randomDataUtilIns.generateRandomPassword();
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnForgotPasswordLink();
        await loginPageIns.handleForgotPasswordForm({ emailId, password: newPassword, confirmPassword: newPassword, msgType: "passwordResetError" });
    });

});