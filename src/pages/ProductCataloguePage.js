import { expect } from "@playwright/test";
import CommonUtil from "../utils/CommonUtil.js";
import ToastMessage from "../page-components/ToastMessage.js";

export default class ProductCataloguePage {

    constructor(page) {
        this.page = page;

        this.logoHeader = page.getByRole('heading', { name: 'Automation' });
        this.homeSearchHeader = page.locator('#sidebar').getByText('Home | Search');
        this.navHomeLink = page.getByRole('button', { name: ' HOME' });
        this.navOrdersLink = page.getByRole('button', { name: '   ORDERS' });
        this.navCartLink = page.getByRole('button', { name: '   Cart' });
        this.navSignOutLink = page.getByRole('button', { name: 'Sign Out' });
        this.filtersHeader = page.getByRole('heading', { name: 'Filters' });
        this.searchInput = page.getByRole('textbox', { name: 'search' });
        this.priceRangeHeader = page.getByRole('heading', { name: 'Price Range' });
        this.minPriceInput = page.getByRole('textbox', { name: 'Min Price' });
        this.maxPriceInput = page.getByRole('textbox', { name: 'Max Price' });
        this.categoriesHeader = page.getByRole('heading', { name: 'Categories', exact: true });
        this.fashionCategory = page.locator('#sidebar').getByText('fashion');
        this.electronicsCategory = page.locator('#sidebar').getByText('electronics');
        this.householdCategory = page.locator('#sidebar').getByText('household');
        this.subCategoriesHeader = page.getByRole('heading', { name: 'Sub Categories' });
        this.tShirtsCategory = page.locator('#sidebar').getByText('t-shirts');
        this.shirtsCategory = page.locator('#sidebar').getByText('shirts', { exact: true });
        this.shoesCategory = page.locator('#sidebar').getByText('shoes');
        this.mobilesCategory = page.locator('#sidebar').getByText('mobiles');
        this.laptopsCategory = page.locator('#sidebar').getByText('laptops');
        this.searchForHeader = page.getByRole('heading', { name: 'Search For' });
        this.menCategory = page.locator('#sidebar').getByText('men', { exact: true });
        this.womenCategory = page.locator('#sidebar').getByText('women');
        this.showProductResultsText = page.getByText('Showing 3 results |');
        this.userCanOnlySeeMaximum9Text = page.getByText('User can only see maximum 9');

        this.productCards = page.locator('div.card');

        // CLASSES
        this.commonutilsIns = new CommonUtil(page);
        this.toastMessageIns = new ToastMessage(page);
    }

    /**
     * This method is used to verify the Product Catalogue page is displayed after login
     */
    async verifyProductCataloguePage() {
        try {
            await expect(this.logoHeader).toBeVisible();
            console.log('Product Catalogue page is displayed successfully');
            await expect(this.homeSearchHeader).toBeVisible();
            console.log('Home | Search header is displayed successfully');
            await expect(this.navHomeLink).toBeVisible();
            console.log('Home link is displayed successfully');
            await expect(this.navOrdersLink).toBeVisible();
            console.log('Orders link is displayed successfully');
            await expect(this.navCartLink).toBeVisible();
            console.log('Cart link is displayed successfully');
            await expect(this.navSignOutLink).toBeVisible();
            console.log('Sign Out link is displayed successfully');
            await expect(this.filtersHeader).toBeVisible();
            console.log('Filters header is displayed successfully');
            await expect(this.searchInput).toBeVisible();
            console.log('Search input field is displayed successfully');
            await expect(this.priceRangeHeader).toBeVisible();
            console.log('Price Range header is displayed successfully');
            await expect(this.minPriceInput).toBeVisible();
            console.log('Min Price input field is displayed successfully');
            await expect(this.maxPriceInput).toBeVisible();
            console.log('Max Price input field is displayed successfully');
            await expect(this.categoriesHeader).toBeVisible();
            console.log('Categories header is displayed successfully');
            await expect(this.fashionCategory).toBeVisible();
            console.log('Fashion category is displayed successfully');
            await expect(this.electronicsCategory).toBeVisible();
            console.log('Electronics category is displayed successfully');
            await expect(this.householdCategory).toBeVisible();
            console.log('Household category is displayed successfully');
            await expect(this.subCategoriesHeader).toBeVisible();
            console.log('Sub Categories header is displayed successfully');
            await expect(this.tShirtsCategory).toBeVisible();
            console.log('T-Shirts sub-category is displayed successfully');
            await expect(this.shirtsCategory).toBeVisible();
            console.log('Shirts sub-category is displayed successfully');
            await expect(this.shoesCategory).toBeVisible();
            console.log('Shoes sub-category is displayed successfully');
            await expect(this.mobilesCategory).toBeVisible();
            console.log('Mobiles sub-category is displayed successfully');
            await expect(this.laptopsCategory).toBeVisible();
            console.log('Laptops sub-category is displayed successfully');
            await expect(this.searchForHeader).toBeVisible();
            console.log('Search For header is displayed successfully');
            await expect(this.menCategory).toBeVisible();
            console.log('Men category is displayed successfully');
            await expect(this.womenCategory).toBeVisible();
            console.log('Women category is displayed successfully');
            await expect(this.productCards.first()).toBeVisible();
            console.log('Products displayed on Product Catalouge page');
            await expect(this.showProductResultsText).toBeVisible();
            console.log('Showing 3 results | text is displayed successfully');
            await expect(this.userCanOnlySeeMaximum9Text).toBeVisible();
            console.log('User can only see maximum 9 text is displayed successfully');
        } catch (error) {
            console.error('An error occured in verifyProductCataloguePage', error.message);
        }
    }

    /**
     * This method is used to add any specific product to cart based on the name
     * @param {String} productName
     * @returns {Object}
     */
    async addProductToCartByName(productName = null) {
        try {
            await expect(this.productCards.first()).toBeVisible();
            console.log('Products displayed on Product Catalouge page');
            const productDetails = {};
            const productCardsCount = await this.productCards.count();
            for (let i = 0; i < productCardsCount; i++) {
                const currentCardProductName = await this.productCards.nth(i).locator('css=b').textContent();
                if (currentCardProductName === productName) {
                    await this.productCards.nth(i).getByRole('button', { name: '   Add To Cart' }).click();
                    console.log(`${productName} product added to Cart`);
                    await this.toastMessageIns.validateToastMessage('productAdded');
                    const productPrice = await this.productCards.nth(i).locator('div.text-muted').textContent();
                    const formattedProductPrice = productPrice.split(" ")[1].trim();
                    productDetails.productName = productName;
                    productDetails.productPrice = formattedProductPrice;
                    console.log('Retreived Product Information details successfully');
                    break;
                }
            }
            return productDetails;
        } catch (error) {
            console.error('An error occured in addProductToCartByName', error.message);
            return null;
        }
    }

    /**
     * This method is used to click on View button of any specific product based on the name
     * @param {String} productName 
     * @returns 
     */
    async clickOnViewProductByName(productName = null) {
        try {
            await expect(this.productCards.first()).toBeVisible();
            console.log('Products displayed on Product Catalouge page');
            const productDetails = {};
            const productCardsCount = await this.productCards.count();
            for (let i = 0; i < productCardsCount; i++) {
                const currentCardProductName = await this.productCards.nth(i).locator('css=b').textContent();
                if (currentCardProductName === productName) {
                    const productPrice = await this.productCards.nth(i).locator('div.text-muted').textContent();
                    const formattedProductPrice = productPrice.split(" ")[1].trim();
                    productDetails.productName = productName;
                    productDetails.productPrice = formattedProductPrice;
                    console.log('Retreived Product Information details successfully');
                    await this.productCards.nth(i).getByRole('button', { name: 'View' }).click();
                    console.log(`${productName} product view clicked`);
                    break;
                }
            }
            return productDetails;
        } catch (error) {
            console.error('An error occured in clickOnViewProductByName', error.message);
            return null;
        }
    }
}