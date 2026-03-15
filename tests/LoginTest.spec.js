import { test } from "@playwright/test";
import POM_Manager from "../pages/POM_Manager.js";
import testdata from "../testdata/jsondata/userdata.json";

test.describe('Login Page Tests', async () => {

    test('Verify whether user able to login to application using valid user crede', async ({ page }) => {

        const pomManagerIns = new POM_Manager(page);
        const loginPageIns = pomManagerIns.getLoginPage();
        const loginUserData = testdata.login_test_users.register_user;
        
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication(loginUserData.emailid, loginUserData.password);
        await loginPageIns.logoutFromApplication();

    });

    test('Verify whether user able to login to application using invalid user credentails', async ({ page }) => {

        const pomManagerIns = new POM_Manager(page);
        const loginPageIns = pomManagerIns.getLoginPage();
        const loginUserData = testdata.login_test_users.register_user;
        
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication(loginUserData.emailid, 'incorrect@1234', true, { verifyToastMsg: false });
        await loginPageIns.validateToastMessage('incorrectLogin');

    });

    test('Verify whether user able to login to application using unregistered user credentails', async ({ page }) => {

        const pomManagerIns = new POM_Manager(page);
        const loginPageIns = pomManagerIns.getLoginPage();
        const loginUserData = testdata.login_test_users.unregister_user;
        
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication(loginUserData.emailid, loginUserData.password, true, { verifyToastMsg: false });
        await loginPageIns.validateToastMessage('incorrectLogin');

    });

    test('Verify whether user able to view all the tabs without any products in the respective page', async ({ page }) => {

        const pomManagerIns = new POM_Manager(page);
        const loginPageIns = pomManagerIns.getLoginPage();
        const loginUserData = testdata.login_test_users.register_user;
        
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication(loginUserData.emailid, loginUserData.password);
        await loginPageIns.navigateToOrders(true);
        await loginPageIns.navigateToCart(true);
        await loginPageIns.navigateToHome();
        await loginPageIns.logoutFromApplication();

    });

})