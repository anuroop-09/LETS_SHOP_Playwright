import BaseClass from "./BaseClass.js";
import CartPage from "./CartPage.js";
import CheckoutPage from "./CheckoutPage.js";
import LoginPage from "./LoginPage.js";
import OrderConfirmPage from "./OrderConfirmPage.js";
import OrdersPage from "./OrdersPage.js";
import ProductCataloguePage from "./ProductCataloguePage.js";
import ProductPage from "./ProductPage.js";

export default class POM_Manager {

    constructor(page) {
        this.page = page;
        this.baseClassIns = new BaseClass(page);
        this.cartPageIns = new CartPage(page);
        this.checkoutPageIns = new CheckoutPage(page);
        this.loginPageIns = new LoginPage(page);
        this.orderConfirmPageIns = new OrderConfirmPage(page);
        this.ordersPageIns = new OrdersPage(page);
        this.productCataloguePageIns = new ProductCataloguePage(page);
        this.productPageIns = new ProductPage(page);
    }

    getBaseClass() {
        return this.baseClassIns;
    }

    getCartPage() {
        return this.cartPageIns;
    }

    getCheckoutPage() {
        return this.checkoutPageIns;
    }

    getLoginPage() {
        return this.loginPageIns;
    }

    getOrderConfirmPage() {
        return this.orderConfirmPageIns;
    }

    getOrdersPage() {
        return this.ordersPageIns;
    }

    getProductCataloguePage() {
        return this.productCataloguePageIns;
    }

    getProductPage() {
        return this.productPageIns;
    }

}