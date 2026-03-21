import { test } from "@playwright/test";
import POM_Manager from "../pages/POM_Manager.js";
import newuserdata from "../testdata/jsondata/newuserdata.json";

test.describe('Register Tests', async () => {

    test('Verify whether user able to create a new user and able to login to the application', async ({ page }) => {
        const pomManager = new POM_Manager(page);
        const loginPageIns = pomManager.getLoginPage();

        const userdata = {
            firstName: newuserdata.user_data1.first_name,
            lastName: newuserdata.user_data1.last_name,
            email: await loginPageIns.generateUniqueEmail("testuserpw"),
            phoneNumber: newuserdata.user_data1.phone_number,
            occupation: await loginPageIns.choice(newuserdata.user_data1.occupation),
            gender: await loginPageIns.choice(newuserdata.user_data1.gender),
            password: newuserdata.user_data1.password,
            confirmPassword: newuserdata.user_data1.password,
            isUnderAge: true
        };

        await loginPageIns.launchApplication();
        await loginPageIns.navigateToRegistrationPage();
        await loginPageIns.handleRegistrationForm(userdata);
        await loginPageIns.verifyAccountCreationPopup();
        await loginPageIns.navigateToLoginPageFromAccountCreated();
        await loginPageIns.loginToApplication(userdata.email, userdata.password);
        await loginPageIns.logoutFromApplication();
    });

    test('Verify whether user able to create a user which is already exists', async ({ page }) => {
        const pomManager = new POM_Manager(page);
        const loginPageIns = pomManager.getLoginPage();

        const userdata = {
            firstName: newuserdata.registered_user.first_name,
            lastName: newuserdata.registered_user.last_name,
            email: newuserdata.registered_user.email_id,
            phoneNumber: newuserdata.registered_user.phone_number,
            occupation: newuserdata.registered_user.occupation,
            gender: newuserdata.registered_user.gender,
            password: newuserdata.registered_user.password,
            confirmPassword: newuserdata.registered_user.password,
            isUnderAge: true,
            msgType: 'userRegistered'
        };

        await loginPageIns.launchApplication();
        await loginPageIns.navigateToRegistrationPage();
        await loginPageIns.handleRegistrationForm(userdata);
    });

    test('Verify whether user able to create a new user without last name', async ({ page }) => {
        const pomManager = new POM_Manager(page);
        const loginPageIns = pomManager.getLoginPage();

        const userdata = {
            firstName: newuserdata.user_data1.first_name,
            email: await loginPageIns.generateUniqueEmail("testuserpw"),
            phoneNumber: newuserdata.user_data1.phone_number,
            occupation: await loginPageIns.choice(newuserdata.user_data1.occupation),
            gender: await loginPageIns.choice(newuserdata.user_data1.gender),
            password: newuserdata.user_data1.password,
            confirmPassword: newuserdata.user_data1.password,
            isUnderAge: true,
            msgType: 'lastNameRequired'
        };

        await loginPageIns.launchApplication();
        await loginPageIns.navigateToRegistrationPage();
        await loginPageIns.handleRegistrationForm(userdata);
    });

    test('Verify whether user able to create a new user with invalid email', async ({ page }) => {
        const pomManager = new POM_Manager(page);
        const loginPageIns = pomManager.getLoginPage();

        const userdata = {
            firstName: newuserdata.user_data1.first_name,
            lastName: newuserdata.user_data1.last_name,
            email: "invalid@email", // Using an invalid email format
            phoneNumber: newuserdata.user_data1.phone_number,
            occupation: await loginPageIns.choice(newuserdata.user_data1.occupation),
            gender: await loginPageIns.choice(newuserdata.user_data1.gender),
            password: newuserdata.user_data1.password,
            confirmPassword: newuserdata.user_data1.password,
            isUnderAge: true,
            msgType: 'emailInvalid'
        };

        await loginPageIns.launchApplication();
        await loginPageIns.navigateToRegistrationPage();
        await loginPageIns.handleRegistrationForm(userdata);
    });

    test('Verify whether user able to create a new user with password less than 8 characters', async ({ page }) => {
        const pomManager = new POM_Manager(page);
        const loginPageIns = pomManager.getLoginPage();

        const userdata = {
            firstName: newuserdata.user_data1.first_name,
            lastName: newuserdata.user_data1.last_name,
            email: await loginPageIns.generateUniqueEmail("testuserpw"),
            phoneNumber: newuserdata.user_data1.phone_number,
            occupation: await loginPageIns.choice(newuserdata.user_data1.occupation),
            gender: await loginPageIns.choice(newuserdata.user_data1.gender),
            password: "1234567", // Using a password with less than 8 characters
            confirmPassword: "1234567",
            isUnderAge: true,
            msgType: 'passwordLessChar'
        };

        await loginPageIns.launchApplication();
        await loginPageIns.navigateToRegistrationPage();
        await loginPageIns.handleRegistrationForm(userdata);
    });

    test('Verify whether user able to create a new user with invalid password format', async ({ page }) => {
        const pomManager = new POM_Manager(page);
        const loginPageIns = pomManager.getLoginPage();

        const userdata = {
            firstName: newuserdata.user_data1.first_name,
            lastName: newuserdata.user_data1.last_name,
            email: await loginPageIns.generateUniqueEmail("testuserpw"),
            phoneNumber: newuserdata.user_data1.phone_number,
            occupation: await loginPageIns.choice(newuserdata.user_data1.occupation),
            gender: await loginPageIns.choice(newuserdata.user_data1.gender),
            password: "testuser123", // Using a password that does not meet the required format
            confirmPassword: "testuser123",
            isUnderAge: true,
            msgType: 'passwordFormat'
        };

        await loginPageIns.launchApplication();
        await loginPageIns.navigateToRegistrationPage();
        await loginPageIns.handleRegistrationForm(userdata);
    });
});