import { expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default class BasePage {

    constructor(page) {
        this.page = page;
        this.loginTitle = page.getByRole('heading', { name: 'Log in' });

    }

    /**
     * This method is used to launch the application on the browser session
     */
    async launchApplication() {
        try {
            // const url = process.env.APP_URL || "https://rahulshettyacademy.com/client/"
            // this.page.goto(url);
            this.page.goto('/client');
            await expect(this.loginTitle).toBeVisible();
            console.log('Application launched successfully');
        } catch (error) {
            console.error('An error occured in launchApplication', error.message);
        }
    }

}