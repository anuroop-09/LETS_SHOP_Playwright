import { expect } from "@playwright/test";
import BaseClass from "./BaseClass.js";

export default class ProductPage extends BaseClass {

    constructor(page) {
        super(page);
        this.page = page;
    }
}