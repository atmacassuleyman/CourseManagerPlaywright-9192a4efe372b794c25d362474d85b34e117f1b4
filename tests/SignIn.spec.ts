import { test, expect } from '@playwright/test';
import { SignInPage } from '../page objects/SignIn';

test.describe('Sign In Page', () => {
    let signInPage: SignInPage;

    test.beforeEach(async ({ page }) => {
        signInPage = new SignInPage(page);
        await signInPage.navigateToBaseURL();
        const title = await expect(page).toHaveTitle('EMM-IT | Course Manager');
        console.log(title);
        expect(await signInPage.isSignInButtonDisabled()).toBeTruthy(); // Assert Sign In button is disabled
});

test('US-06 Sign In Button is Disabled', async ({})=>
    {
        // Fill only password and check for email required message
        await signInPage.clickEmail();
        await signInPage.fillCredentials('', 'T%633642945806oc');
        const emailRequiredMessage = await signInPage.getEmailRequiredMessage();
        console.log(emailRequiredMessage);

        // Refresh and fill only email
        await signInPage.navigateToBaseURL();
        await signInPage.fillCredentials('suleymanatmaca.de', 'T%633642945806oc');
        const invalidEmailMessage = await signInPage.getInvalidEmailMessage();
        console.log(invalidEmailMessage);

        // Assert Sign In button is still disabled
        const isButtonStillDisabled = await signInPage.isSignInButtonDisabled();
        expect(isButtonStillDisabled).toBeTruthy();

    });

test('US-07 Invalid e-mail or password', async ({})=>
    {
        // Attempt login with invalid credentials
        await signInPage.fillCredentials('suleyma.atmaca@emm-it.de', 'T%T%633642945806');
        await signInPage.clickSignInButton();
        const invalidEmailOrPasswordPopup = await signInPage.getInvalidErrorPopupMessage();
        console.log(invalidEmailOrPasswordPopup);

        // Attempt login with another set of invalid credentials
        await signInPage.navigateToBaseURL();
        await signInPage.fillCredentials('suleymaatmaca@emm-it.de', 'T%T%633642945806');
        await signInPage.clickSignInButton();
        const errorMessage2 = await signInPage.getInvalidErrorPopupMessage();
        console.log(errorMessage2);
    });

test('US-08 Verify sign in fields accepts valid format', async ({page})=>
    {
        // Fill email and verify email error message is hidden
        await signInPage.fillEmail('suleyman.atmaca@emm-it.de');
        await signInPage.isEmailErrorHidden();
        
        // Fill password and verify password error message is hidden
        await signInPage.fillPassword('T%633642945806oc');
        await signInPage.isPasswordErrorHidden();
        await signInPage.clickSignInButton();
    });  

test('US-09 Verify "Not registered yet?" link is correct', async ({page})=>
    {
        await signInPage.clickNotRegisteredLink();
        await signInPage.verifySignUpPage();
    });  

test('US-10 Verify page layout and UI elements', async ({page})=>
    {
        // Verify UI elements are visible
        await signInPage.verifyLogoIsVisible();
        await signInPage.verifyEmailFieldIsVisible();
        await signInPage.verifyPasswordFieldIsVisible();
        await signInPage.verifySignInButtonIsVisible();
        await signInPage.verifyNotRegisteredLinkIsVisible();
    });

test('US-11 Verify Sign In input boxes place holder texts are not bold font', async ({page})=>
    {
        // Verify placeholder text font weight for email and password fields
        const isEmailPlaceholderBold = await signInPage.isEmailPlaceholderBold();
        const isPasswordPlaceholderBold = await signInPage.isPasswordPlaceholderBold();

        // Assert that placeholders are not bold
        expect(isEmailPlaceholderBold).toBe(false);
        expect(isPasswordPlaceholderBold).toBe(false);
    });

test('US-12 Sign In With Correct Credentials', async ({page})=>
    {
        await signInPage.signInWithCredentials('suleyman.atmaca@emm-it.de', 'T%633642945806oc');
        
        // Verify home page welcome text
        const welcomeText = await signInPage.getHomePageWelcomeText();
        console.log(welcomeText);
        expect(welcomeText).toBe('Welcome to our application EMM-IT GmbH!');
    });

});