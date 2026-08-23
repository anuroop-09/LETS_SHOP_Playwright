import { test } from '@playwright/test';
import POM_Manager from '../../src/pages/POM_Manager.js';
import testdata from '../../testdata/json/userdata.json' with { type: 'json' };
import productsdata from '../../testdata/json/productsdata.json' with { type: 'json' };
import shippingdata from '../../testdata/json/shippingdata.json' with { type: 'json' };

test.describe('ENE Tests', async () => {

    let pomManagerIns, loginPageIns, productCatalogueIns, productPageIns, cartPageIns, checkoutPageIns, orderConfirmationPageIns, ordersPageIns, navbarIns, randomDataUtilIns, pageFix;
    
    test.beforeEach(async ({ page }) => {
        pageFix = page;
        pomManagerIns = new POM_Manager(page);
        loginPageIns = pomManagerIns.getLoginPage();
        productCatalogueIns = pomManagerIns.getProductCataloguePage();
        productPageIns = pomManagerIns.getProductPage();
        cartPageIns = pomManagerIns.getCartPage();
        checkoutPageIns = pomManagerIns.getCheckoutPage();
        orderConfirmationPageIns = pomManagerIns.getOrderConfirmPage();
        ordersPageIns = pomManagerIns.getOrdersPage();
        navbarIns = pomManagerIns.getNavbar();
        randomDataUtilIns = pomManagerIns.getRandomDataUtil();
    });

    test.afterEach(async () => {
        await pageFix.waitForLoadState('networkidle');
        await pageFix.close();
    });

    test('TC001: Verify whether user able to purchase and complete the order for a specific product and able to see the order from Orders page', async () => {
        const { emailId, password } = testdata.ene_test_users.user1;
        const productName = await randomDataUtilIns.choice(productsdata.all_products);
        const shippingDetails = shippingdata.data1;

        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password });
        const productDetails = await productCatalogueIns.addProductToCartByName(productName);
        await navbarIns.verifyCountFromCartLink('1');
        await navbarIns.navigateToCart();
        await cartPageIns.verifyProductInCartList(productDetails);
        await cartPageIns.proceedToCheckout();
        await checkoutPageIns.verifyProductInCheckoutList(productDetails);
        await checkoutPageIns.fillPersonalInformationForm({
            creditCardNumVal: shippingDetails.credit_card_num,
            cvvCodeVal: shippingDetails.cvv_code,
            nameOnCardVal: shippingDetails.name_on_card
        });
        await checkoutPageIns.fillShippingInformationForm(shippingDetails.country);
        await checkoutPageIns.proceedToPlaceOrder();
        await orderConfirmationPageIns.verifyOrderedProductConfirmation({ verifyProductInfo: true, productDetails });
        await navbarIns.navigateToOrders();
        await ordersPageIns.verifyOrderedItemFromOrdersTable(productDetails);
        await navbarIns.logoutFromApplication();

    });

    test('TC002: Verify whether user able to purchase and complete the order for all the products and able to see the order from Orders page', async () => {
        const { emailId, password } = testdata.ene_test_users.all_products_user;
        const shippingDetails = shippingdata.data1;
        let productDetailsArr = [];

        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password });
        for (const productName of productsdata.all_products) {
            const productDetails = await productCatalogueIns.addProductToCartByName(productName);
            productDetailsArr.push(productDetails);
        }
        await navbarIns.verifyCountFromCartLink('3');
        await navbarIns.navigateToCart();
        for (const productDetails of productDetailsArr) {
            await cartPageIns.verifyProductInCartList(productDetails);
        }
        await cartPageIns.proceedToCheckout();
        for (const productDetails of productDetailsArr) {
            await checkoutPageIns.verifyProductInCheckoutList(productDetails);
        }
        await checkoutPageIns.fillPersonalInformationForm({
            creditCardNumVal: shippingDetails.credit_card_num,
            cvvCodeVal: shippingDetails.cvv_code,
            nameOnCardVal: shippingDetails.name_on_card
        });
        await checkoutPageIns.fillShippingInformationForm(shippingDetails.country);
        await checkoutPageIns.proceedToPlaceOrder();
        for (const productDetails of productDetailsArr) {
            await orderConfirmationPageIns.verifyOrderedProductConfirmation({ verifyProductInfo: true, productDetails });
        }
        await navbarIns.navigateToOrders();
        for (const productDetails of productDetailsArr) {
            await ordersPageIns.verifyOrderedItemFromOrdersTable(productDetails);
        }
        await navbarIns.logoutFromApplication();
    });

    test('TC003: Verify whether user able to purchase and complete the order for a specific product from Product page and able to see the order from Orders page', async () => {
        const { emailId, password } = testdata.ene_test_users.user2;
        const productName = await randomDataUtilIns.choice(productsdata.all_products);
        const shippingDetails = shippingdata.data2;

        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication({ emailId, password });
        const productDetails = await productCatalogueIns.clickOnViewProductByName(productName);
        await productPageIns.addProductToCart();
        await navbarIns.verifyCountFromCartLink('1');
        await navbarIns.navigateToCart();
        await cartPageIns.verifyProductInCartList(productDetails);
        await cartPageIns.proceedToCheckout();
        await checkoutPageIns.verifyProductInCheckoutList(productDetails);
        await checkoutPageIns.fillPersonalInformationForm({
            creditCardNumVal: shippingDetails.credit_card_num,
            cvvCodeVal: shippingDetails.cvv_code,
            nameOnCardVal: shippingDetails.name_on_card
        });
        await checkoutPageIns.fillShippingInformationForm(shippingDetails.country);
        await checkoutPageIns.proceedToPlaceOrder();
        await orderConfirmationPageIns.verifyOrderedProductConfirmation({ verifyProductInfo: true, productDetails });
        await navbarIns.navigateToOrders();
        await ordersPageIns.verifyOrderedItemFromOrdersTable(productDetails);
        await navbarIns.logoutFromApplication();
    });

});

