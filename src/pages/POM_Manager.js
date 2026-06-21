import BasePage from "./BasePage.js";
import CartPage from "./CartPage.js";
import CheckoutPage from "./CheckoutPage.js";
import LoginPage from "./LoginPage.js";
import OrderConfirmPage from "./OrderConfirmPage.js";
import OrdersPage from "./OrdersPage.js";
import ProductCataloguePage from "./ProductCataloguePage.js";
import ProductPage from "./ProductPage.js";

import Navbar from "../page-components/Navbar.js";

import RandomDataUtil from "../utils/RandomDataUtil.js";

export default class POM_Manager {

    constructor(page) {
        this.page = page;

        // PAGES
        this.basePageIns = new BasePage(page);
        this.cartPageIns = new CartPage(page);
        this.checkoutPageIns = new CheckoutPage(page);
        this.loginPageIns = new LoginPage(page);
        this.orderConfirmPageIns = new OrderConfirmPage(page);
        this.ordersPageIns = new OrdersPage(page);
        this.productCataloguePageIns = new ProductCataloguePage(page);
        this.productPageIns = new ProductPage(page);

        // PAGE-COMPONENTS
        this.navbarIns = new Navbar(page);

        // UTILS
        this.randomDataUtilIns = new RandomDataUtil();
    }

    // PAGES
    getBasePage() {
        return this.basePageIns;
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

    // PAGE-COMPONENTS
    getNavbar() {
        return this.navbarIns;
    }

    // UTILS
    getRandomDataUtil() {
        return this.randomDataUtilIns;
    }
}