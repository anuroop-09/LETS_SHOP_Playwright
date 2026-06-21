export default class CommonUtil {

    constructor(page) {
        this.page = page;
    }

    /**
     * This method is used to select an option from dropdown based on the locator and value provided
     * @param {String} dropdownLoc 
     * @param {String} optionVal 
     */
    async selectOptionFromDropdown(dropdownLoc, selectType = 'value', optionVal) {
        try {
            const dropdown = dropdownLoc;
            if (selectType === 'value') {
                await dropdown.selectOption(optionVal);
            } else if (selectType === 'visibleText') {
                await dropdown.selectOption({ label: optionVal });
            } else if (selectType === 'index') {
                await dropdown.selectOption({ index: optionVal });
            }
            console.log(`Selected ${optionVal} in dropdown`);
        } catch (error) {
            console.error('An error occured in selectOptionFromDropdown', error.message);
        }
    }

    /**
     * This method ise used to get the column or index position value
     * @param {String} locatorEle
     * @param {String} fieldName
     */
    async getColIndex(locatorEle, fieldName) {
        try {
            let index = 1;
            const itemsCount = await this.page.locator(locatorEle).count();
            for (let i = 0; i < itemsCount; i++) {
                const itemName = await this.page.locator(locatorEle).nth(i).textContent();
                if (itemName === fieldName) {
                    console.log(`Found '${fieldName}' column or index position at ${index} on the current ${await this.page.title()} page`);
                    return index;
                }
                index += 1;
            }
        } catch (error) {
            console.error('An error occured in getColIndex', error.message);
        }
    }

    /**
     * This method is used to compare the screenshots and verify if there is any visual regression in the application
     */
    async compareAndVerifyScreenShot(locator, screenshotName, screenshotOptions = null) {
        try {
            let options = { ...screenshotOptions };
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);
            await expect(locator).toHaveScreenshot(screenshotName, options);
            console.log(`Screenshot ${screenshotName} compared successfully`);
        } catch (error) {
            console.error('An error occured in compareAndVerifyScreenShot', error.message);
        }
    }
}