import { test } from "@playwright/test";
import POM_Manager from "../../pages/POM_Manager.js";
import testdata from "../../testdata/jsondata/userdata.json";
import productdata from "../../testdata/jsondata/productsdata.json";
import shippingdata from "../../testdata/jsondata/shippingdata.json";



test.describe('ENE Tests', async () => {

    test('Verify whether user able to purchase a product and verify the order from Orders page', async ({ page }) => {

        const pomManagerIns = new POM_Manager(page);
        const loginPageIns = pomManagerIns.getLoginPage();
        const productCataloguePageIns = pomManagerIns.getProductCataloguePage();
        const cartPageIns = pomManagerIns.getCartPage();
        const checkoutPageIns = pomManagerIns.getCheckoutPage();
        const orderConfirmPageIns = pomManagerIns.getOrderConfirmPage();
        const ordersPageIns = pomManagerIns.getOrdersPage();

        const emailId = testdata.ene_test_users.user1.emailid;
        const password = testdata.ene_test_users.user1.password;
        const productName = await productCataloguePageIns.choice(productdata.all_products);
        const personalInformation = {
            creditCardNumVal: shippingdata.data1.credit_card_num,
            cvvCodeVal: shippingdata.data1.cvv_code,
            nameOnCardVal: shippingdata.data1.name_on_card
        }

        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication(emailId, password);
        const productDetails = await productCataloguePageIns.addProductToCartByName(productName);
        await productCataloguePageIns.navigateToCart();
        await cartPageIns.verifyProductInCartList(productDetails);
        await cartPageIns.proceedToCheckout();
        await checkoutPageIns.verifyProductInCheckoutList(productDetails);
        await checkoutPageIns.fillPersonalInformationForm(personalInformation);
        await checkoutPageIns.fillShippingInformationForm(shippingdata.data1.country);
        await checkoutPageIns.proceedToPlaceOrder();
        await checkoutPageIns.validateToastMessage('orderPlaced');
        const productOrderId = await orderConfirmPageIns.getProductOrderedId();
        await orderConfirmPageIns.verifyOrderedProductConfirmation({ verifyProductInfo: true, productDetails });
        await orderConfirmPageIns.navigateToOrders();
        await ordersPageIns.verifyOrderIdFromOrdersTable(productOrderId);
        await ordersPageIns.verifyOrderedItemFromOrdersTable(productDetails);
        await loginPageIns.logoutFromApplication();

    });

    test('Verify whether user able to purchase all products and verify the order from Orders page', async ({ page }) => {

        const pomManagerIns = new POM_Manager(page);
        const loginPageIns = pomManagerIns.getLoginPage();
        const productCataloguePageIns = pomManagerIns.getProductCataloguePage();
        const cartPageIns = pomManagerIns.getCartPage();
        const checkoutPageIns = pomManagerIns.getCheckoutPage();
        const orderConfirmPageIns = pomManagerIns.getOrderConfirmPage();
        const ordersPageIns = pomManagerIns.getOrdersPage();

        const emailId = testdata.ene_test_users.all_products_user.emailid;
        const password = testdata.ene_test_users.all_products_user.password;
        const allProducts = productdata.all_products;
        const personalInformation = {
            creditCardNumVal: shippingdata.data2.credit_card_num,
            cvvCodeVal: shippingdata.data2.cvv_code,
            nameOnCardVal: shippingdata.data2.name_on_card
        }

        let allProductDetails = [];

        await loginPageIns.launchApplication();
        await loginPageIns.loginToApplication(emailId, password);
        for (const product of allProducts) {
            const productDetails = await productCataloguePageIns.addProductToCartByName(product);
            allProductDetails.push(productDetails);
        }
        await productCataloguePageIns.navigateToCart();
        for (const productDetails of allProductDetails) {
            await cartPageIns.verifyProductInCartList(productDetails);
        }
        await cartPageIns.proceedToCheckout();
        for (const productDetails of allProductDetails) {
            await checkoutPageIns.verifyProductInCheckoutList(productDetails);
        }
        await checkoutPageIns.fillPersonalInformationForm(personalInformation);
        await checkoutPageIns.fillShippingInformationForm(shippingdata.data2.country);
        await checkoutPageIns.proceedToPlaceOrder();
        await checkoutPageIns.validateToastMessage('orderPlaced');
        const productOrderIds = await orderConfirmPageIns.getProductOrderedId();
        for (const productDetails of allProductDetails) {
            await orderConfirmPageIns.verifyOrderedProductConfirmation({ verifyProductInfo: true, productDetails });
        }
        await orderConfirmPageIns.navigateToOrders();
        for (const productOrderId of productOrderIds){
            await ordersPageIns.verifyOrderIdFromOrdersTable(productOrderId);
        }
        for (const productDetails of allProductDetails) {
            await ordersPageIns.verifyOrderedItemFromOrdersTable(productDetails);
        }
        await loginPageIns.logoutFromApplication();

    });

});