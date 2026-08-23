import { test } from '@playwright/test';
import POM_Manager from '../../src/pages/POM_Manager.js';
import testdata from '../../testdata/json/userdata.json' with { type: 'json' };
import productdata from '../../testdata/json/productsdata.json' with { type: 'json' };

test.describe('Cart Page Tests', () => {

    let pomManagerIns, loginPageIns, cartPageIns, navbarIns;

    test.beforeEach(async ({ page }) => {
        pomManagerIns = new POM_Manager(page);
        loginPageIns = pomManagerIns.getLoginPage();
        cartPageIns = pomManagerIns.getCartPage();
        navbarIns = pomManagerIns.getNavbar();
    });

    test.afterEach(async ({ page }) => {
        await page.waitForLoadState('networkidle');
        await page.close();
    });

    test('TC001: Verify whether user able to view the Cart page UI when there are no products added to cart', async ({ page }) => {
        const { emailId, password } = testdata.cart_test_users.user1;
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password });
        await navbarIns.navigateToCart();
        await cartPageIns.verifyCartPageUI();
        await navbarIns.logoutFromApplication();
    });

    test('TC002: Verify whether user able to view the Cart page UI when there are products added to cart', async ({ page }) => {
        const productCataloguePageIns = pomManagerIns.getProductCataloguePage();
        const randomDataUtilIns = pomManagerIns.getRandomDataUtil();
        const productName = await randomDataUtilIns.choice(productdata.all_products);
        const { emailId, password } = testdata.cart_test_users.user1;
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password });
        const productDetails = await productCataloguePageIns.addProductToCartByName(productName);
        await navbarIns.navigateToCart();
        await cartPageIns.verifyCartPageUI(true, productDetails);
        await cartPageIns.deleteProductFromCartList(productName);
        await navbarIns.logoutFromApplication();
    });

});