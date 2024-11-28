import { expect } from '@playwright/test';
import { config } from '../playwright.config';
import { BasePage } from './BasePage';

export class SignInPage extends BasePage {
    private pageLogo = this.page.getByRole('heading', {name:'Course Manager'});
    private userEmail = this.page.locator('#email');
    private userPassword = this.page.locator('#password');
    private inputEmailRequiredErrorMessage = this.page.getByText('Email is required!');
    private inputPasswordRequiredErrorMessage = this.page.getByText('Password is required!');
    private inputInvalidEmailMessage = this.page.getByText('Invalid format for Email!');
    private signInButton = this.page.locator("[type='submit']");
    private notRegisteredLink = this.page.getByText('Not registered yet?');
    private signUpPageHeading = this.page.getByRole('heading', { name: 'Sign Up' });
    private homePageWelcomeText = this.page.getByText('Welcome to our application EMM-IT GmbH!');

    async fillCredentials(email = config.credentials.userEmail, password = config.credentials.userPassword) {
        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
    }

    async fillEmail(email: string): Promise<void> {
        await this.userEmail.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.userPassword.fill(password);
    }


    async clickEmail(): Promise<void> {
        await this.userEmail.click();
    }
    
      async clickPassword(): Promise<void> {
        await this.userPassword.click();
    }

    async isSignInButtonDisabled(): Promise<boolean> {
        return await this.signInButton.isDisabled();
    }

    async getInvalidErrorPopupMessage(): Promise<string | null> {
        const invalidErrorPopUPMessage = this.page.getByRole('heading', { name: 'Invalid e-mail or password.' });
        return await invalidErrorPopUPMessage.textContent();
    }
    
    async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }

    async isEmailErrorHidden(): Promise<void> {
        await expect(this.inputEmailRequiredErrorMessage).toBeHidden();
    }

    async isPasswordErrorHidden(): Promise<void> {
        await expect(this.inputPasswordRequiredErrorMessage).toBeHidden();
    }

    async getEmailRequiredMessage(): Promise<string | null> {
        if(await this.inputEmailRequiredErrorMessage.isVisible()){
            return await this.inputEmailRequiredErrorMessage.textContent();
        }
        throw new Error('Email required error message not found on the page.');
    }

    async getPasswordRequiredMessage(): Promise<string | null> {
        if(await this.inputPasswordRequiredErrorMessage.isVisible()){
            return await this.inputPasswordRequiredErrorMessage.textContent();
        }
        throw new Error('Password required error message not found on the page.');
    }

    async getInvalidEmailMessage(): Promise<string | null> {
        if(await this.inputInvalidEmailMessage.isVisible()){
            return await this.inputInvalidEmailMessage.textContent();
        }
        throw new Error('Invalid email error message not found on the page.');
    }

    async clickNotRegisteredLink(): Promise<void> {
        await this.notRegisteredLink.click();
    }

    async getSignUpPageHeading(): Promise<string | null> {
        return await this.signUpPageHeading.textContent();
    }

    async verifySignUpPage(): Promise<void> {
        const heading = await this.getSignUpPageHeading();
        console.log(heading);
        expect(heading).toBe('Sign Up');
    }

    async verifyLogoIsVisible(): Promise<void> {
        await expect(this.pageLogo).toBeVisible();
    }

    async verifyEmailFieldIsVisible(): Promise<void> {
        await expect(this.userEmail).toBeVisible();
    }

    async verifyPasswordFieldIsVisible(): Promise<void> {
        await expect(this.userPassword).toBeVisible();
    }

    async verifySignInButtonIsVisible(): Promise<void> {
        await expect(this.signInButton).toBeVisible();
    }

    async verifyNotRegisteredLinkIsVisible(): Promise<void> {
        await expect(this.notRegisteredLink).toBeVisible();
    }

    async isPlaceholderBold(inputLocator: string): Promise<boolean> {
        const elementHandle = await this.page.locator(inputLocator).elementHandle();
        if (!elementHandle) return false;

        return await this.page.evaluate((inputElement) => {
            if (!inputElement) return false;
            const placeholderStyle = window.getComputedStyle(inputElement, '::placeholder');
            return placeholderStyle.fontWeight === 'bold' || parseInt(placeholderStyle.fontWeight) >= 700;
        }, elementHandle);
    }

    async isEmailPlaceholderBold(): Promise<boolean> {
        return await this.isPlaceholderBold('#email');
    }

    async isPasswordPlaceholderBold(): Promise<boolean> {
        return await this.isPlaceholderBold('#password');
    }

    async signInWithCredentials(email: string, password: string): Promise<void> {
        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
        await this.signInButton.click();
    }

    async getHomePageWelcomeText(): Promise<string | null> {
        return await this.homePageWelcomeText.textContent();
    }

}