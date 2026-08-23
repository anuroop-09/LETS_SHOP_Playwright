import { test } from '@playwright/test';
import POM_Manager from "../../src/pages/POM_Manager.js";
import testdata from "../../testdata/json/userdata.json" with { type: "json" };

test.describe('Orders Page Tests', () => {

    let pomManagerIns, loginPageIns, ordersPageIns, randomDataUtilIns, navbarIns, pageFix;
    
    test.beforeEach(async ({ page }) => {
        pageFix = page;
        pomManagerIns = new POM_Manager(page);
        loginPageIns = pomManagerIns.getLoginPage();
        ordersPageIns = pomManagerIns.getOrdersPage();
        navbarIns = pomManagerIns.getNavbar();
        randomDataUtilIns = pomManagerIns.getRandomDataUtil();
    });

    test.afterEach(async () => {
        await pageFix.waitForLoadState('networkidle');
        await pageFix.close();
    });

    test('TC001: Verify whether user able to view the Orders page UI when there are no orders placed', async () => {
        const { emailId, password } = testdata.orders_test_users.order_not_placed_user;

        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password });
        await navbarIns.navigateToOrders(true);
        await ordersPageIns.verifyOrdersPageUIWhenNoOrders();
        await navbarIns.logoutFromApplication();

    });

    test('TC002: Verify whether user able to view the Orders page UI when there are orders placed', async () => {
        const { emailId, password } = testdata.orders_test_users.order_placed_user;

        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password });
        await navbarIns.navigateToOrders();
        await ordersPageIns.verifyOrderedItemFromOrdersTable({ productName: 'ADIDAS ORIGINAL', productPrice: '11500' });
        await navbarIns.logoutFromApplication();
    });

});