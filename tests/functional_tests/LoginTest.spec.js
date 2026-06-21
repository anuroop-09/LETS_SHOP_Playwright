import { test } from "@playwright/test";
import POM_Manager from "../../src/pages/POM_Manager";
import testdata from "../../testdata/json/userdata.json";

test.describe('Login Page Tests', () => {

    let pomManagerIns, loginPageIns, randomDataUtilIns;

    test.beforeEach(async ({ page }) => {
        pomManagerIns = new POM_Manager(page);
        loginPageIns = pomManagerIns.getLoginPage();
        randomDataUtilIns = pomManagerIns.getRandomDataUtil();
    });

    test.afterEach(async ({ page }) => {
        await page.waitForLoadState('networkidle');
        await page.close();
    });

    test('TC001: Verify whether user able to land on Login page and verify the login page of application', async ({ page }) => {
        // const pomManagerIns = new POM_Manager(page);
        // const loginPageIns = pomManagerIns.getLoginPage();
        await loginPageIns.launchApplication();
        await loginPageIns.verifyLoginFormUI();
    });

    test('TC002: Verify whether user able to login and logout of application using valid credentials only', async ({ page }) => {
        const navbarIns = pomManagerIns.getNavbar();
        const { emailid, password } = testdata.login_test_users.register_user;

        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailid, password });
        await navbarIns.logoutFromApplication();
    });

    test('TC003: Verify whether user not able to Login to with invalid credentials', async ({ page }) => {
        const { emailid, password } = testdata.login_test_users.invalid_user;
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailid, password, msgType: "incorrectLogin" });
    });

    test('TC004: Verify whether user not able to login to application without providing the necessary login details and able to see the field warnings', async ({ page }) => {
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ verifyToastMsg: false });
        await loginPageIns.verifyFieldWarningsOfLoginForm();
        await page.reload();
        await loginPageIns.loginToApplication({ emailid: 'test@example.com', verifyToastMsg: false });
        await loginPageIns.verifyFieldWarningsOfLoginForm(false, true);
        await page.reload();
        await loginPageIns.loginToApplication({ password: 'test@12345', verifyToastMsg: false });
        await loginPageIns.verifyFieldWarningsOfLoginForm(true, false);
    });

    test('TC005: Verify whether user able to navigate and view the Forgot Password page', async ({ page }) => {
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnForgotPasswordLink();
        await loginPageIns.verifyForgotPasswordFormUI();
    });

    test('TC006: Verify whether user able to validate field warnings on Forgot Password page when user is trying to reset the password with providing details', async ({ page }) => {
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnForgotPasswordLink();
        await loginPageIns.handleForgotPasswordForm({ verifyToastMsg: false });
        await loginPageIns.verifyFieldWarningsOfForgotPasswordForm();
    });
    
    test('TC007: Verify whether user able to navigate back to Login page from Forgot Password page', async ({ page }) => {
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnForgotPasswordLink();
        await loginPageIns.navigateToLoginPageFromForgotPassword();
    });

    test('TC008: Verify whether user able to reset the password and able to login to the account with new password', async ({ page }) => {
        const { emailid } = testdata.login_test_users.forgot_password_user;
        const newPassword = await randomDataUtilIns.generateRandomPassword();
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnForgotPasswordLink();
        await loginPageIns.handleForgotPasswordForm({ emailid, password: newPassword, confirmPassword: newPassword });
        await loginPageIns.loginToApplication({ emailid, password: newPassword });
    });

    test('TC009: Verify whether user not able to reset the password for a non-existing user', async ({ page }) => {
        const { emailid } = testdata.login_test_users.unregister_user;
        const newPassword = await randomDataUtilIns.generateRandomPassword();
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnForgotPasswordLink();
        await loginPageIns.handleForgotPasswordForm({ emailid, password: newPassword, confirmPassword: newPassword, msgType: "passwordResetError" });
    });

});