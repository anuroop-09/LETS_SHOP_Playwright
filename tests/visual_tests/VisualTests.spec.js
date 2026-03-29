import { test } from '@playwright/test';
import POM_Manager from "../../pages/POM_Manager.js";
import testdata from "../../testdata/jsondata/userdata.json";

test.describe('Visual Tests', () => {
    let page = null, loginPageIns = null;
    
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        
        const pomManager = new POM_Manager(page);
        loginPageIns = pomManager.getLoginPage();
    });

    test('Verify Login Page UI', async () => {
        // const pomManager = new POM_Manager(page);
        // const loginPageIns = pomManager.getLoginPage();
        await loginPageIns.launchApplication();
        await loginPageIns.compareAndVerifyScreenShot(page, "login-page-ui.png", { fullPage: true });
    });

    test('Verify Logo in Products page', async () => {
        const loginUserData = testdata.login_test_users.register_user;
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication(loginUserData.emailid, loginUserData.password);
        const logoLocator = page.locator("div.left.mt-1");
        await loginPageIns.compareAndVerifyScreenShot(logoLocator, "logo-products-page.png");
    });

    test('Verify Forgot Password page', async () => {
        await loginPageIns.launchApplication();
        await loginPageIns.clickOnForgotPasswordLink();
        await page.waitForTimeout(5000);
        await loginPageIns.compareAndVerifyScreenShot(page, "forgot-password-page.png", { fullPage: true });
    });
});