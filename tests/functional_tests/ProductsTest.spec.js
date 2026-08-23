import { test, expect } from '@playwright/test';
import POM_Manager from "../../src/pages/POM_Manager.js";
import testdata from "../../testdata/json/userdata.json" with { type: "json" };
import productsdata from "../../testdata/json/productsdata.json" with { type: "json" };

test.describe('Products Page Tests', () => {

    let pomManagerIns, loginPageIns, productCataloguePageIns, productPageIns, cartPageIns, ordersPageIns, randomDataUtilIns, navbarIns, pageFix;

    test.beforeEach(async ({ page }) => {
        pageFix = page;
        pomManagerIns = new POM_Manager(page);
        loginPageIns = pomManagerIns.getLoginPage();
        productCataloguePageIns = pomManagerIns.getProductCataloguePage();
        productPageIns = pomManagerIns.getProductPage();
        cartPageIns = pomManagerIns.getCartPage();
        ordersPageIns = pomManagerIns.getOrdersPage();
        randomDataUtilIns = pomManagerIns.getRandomDataUtil();
        navbarIns = pomManagerIns.getNavbar();
    });

    test.afterEach(async () => {
        await pageFix.waitForLoadState('networkidle');
        await pageFix.close();
    });

    test('TC001: Verify whether user able to navigate and view the Product Catalogue page after login', async () => {
        const { emailId, password } = testdata.product_test_users.user1;

        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password });
        await productCataloguePageIns.verifyProductCataloguePage();
        await navbarIns.logoutFromApplication();
    });

    test('TC002: Verify whether user able to view the individual Product details when user clicked on View button from a product in Product Catalogue page', async () => {
        const { emailId, password } = testdata.product_test_users.user1;
        const productName = await randomDataUtilIns.choice(productsdata.all_products);
        
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password });
        const productDetails = await productCataloguePageIns.clickOnViewProductByName(productName);
        await productPageIns.verifyProductDetailsPage(productDetails);
        await productPageIns.clickOnContinueShoppingBtn();
        await expect(productCataloguePageIns.homeSearchHeader).toBeVisible();
        await navbarIns.logoutFromApplication();

    });

    test('TC003: Verify whether user able to navigate back to Products Catalogue page from Orders page', async () => {
        const { emailId, password } = testdata.product_test_users.user1;
        
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password });
        await navbarIns.navigateToOrders(true);
        await ordersPageIns.clickOnGoBackToShopBtn();
        await expect(productCataloguePageIns.homeSearchHeader).toBeVisible();
        console.log('Product Catalogue page is displayed');
        await navbarIns.logoutFromApplication();
    });

    test('TC004: Verify whether user able to navigate back to Products Catalogue page from Cart page', async () => {
        const { emailId, password } = testdata.product_test_users.user1;
        
        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password });
        await navbarIns.navigateToCart(true);
        await cartPageIns.clickOnContinueShoppingBtn();
        await expect(productCataloguePageIns.homeSearchHeader).toBeVisible();
        console.log('Product Catalogue page is displayed');
        await navbarIns.logoutFromApplication();
    });

});