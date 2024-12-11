import { expect } from '@playwright/test';
import { config } from '../playwright.config';
import { BasePage } from './BasePage';

export class SignUpPage extends BasePage {
  private pageLogo = this.page.getByRole('heading', {name:'Course Manager'});
  private notRegisteredLink = this.page.getByText('Not registered yet?');
  private userEmail = this.page.getByPlaceholder('Type your email address');
  private userPassword = this.page.getByPlaceholder('Type your password', { exact: true });
  private userConfirmPassword = this.page.getByPlaceholder('Type your password again');
  private signUpButton = this.page.getByRole('button',{name:'Sign Up', exact: true});
  private alreadyHaveAccount = this.page.getByText('Already have an account?');
  private inputEmailRequiredErrorMessage = this.page.getByText('Email is required!');
  private inputPasswordRequiredErrorMessage = this.page.getByText('Password is required!');
  private inputInvalidEmailErrorMessage = this.page.getByText('Invalid format for Email!');
  private inputCharacterErrorMessage = this.page.getByText('Password must be between 8 and 20 characters!');
  private inputLowercaseErrorMessage = this.page.getByText('Password must include at least one lowercase letter!');
  private inputUppercaseErrorMessage = this.page.getByText('Password must include at least one uppercase letter!');
  private confirmPasswordIsRequiredMessage = this.page.getByText('Repeat Password is required!');
  private signInPage = this.page.getByText('Already have an account?');
  //private passwordShouldSameErrorMessage = this.page.getByRole('heading', { name: 'Password and Confirm password should be same!' });

  async verifyLogoIsVisible(): Promise<void> {
    await expect(this.pageLogo).toBeVisible();
  }

  async clickNotRegisteredLink(): Promise<void> {
    await this.notRegisteredLink.click();
}

  async fillSignUpCredentials(email= config.signUpCredentials.userEmail, password= config.signUpCredentials.userPassword, confirmPassword= config.signUpCredentials.userConfirmPassword) {
    await this.userEmail.fill(email);
    await this.userPassword.fill(password);
    await this.userConfirmPassword.fill(confirmPassword);
  }

  async fillSignUpEmail(email: string): Promise<void> {
    await this.userEmail.fill(email);
  }

  async fillSignUpPassword(password: string): Promise<void> {
    await this.userPassword.fill(password);
  }

  async fillSignUpConfirmPassword(confirmPassword: string): Promise<void> {
    await this.userPassword.fill(confirmPassword);
  }

  async isSignUpButtonDisabled(): Promise<boolean> {
    return await this.signUpButton.isDisabled();
  }

  async getEmailRequiredErrorMessage(): Promise<string | null> {
    return await this.inputEmailRequiredErrorMessage.textContent();
  }

  async getPasswordRequiredErrorMessage(): Promise<string | null> {
    return await this.inputPasswordRequiredErrorMessage.textContent();
  }

  async getConfirmPasswordRequiredMessage(): Promise<string | null> {
    return await this.confirmPasswordIsRequiredMessage.textContent();
  }

  async getEmailInUseErrorPopupMessage(): Promise<string | null> {
    const invalidErrorPopUPMessage = this.page.getByRole('heading', { name: 'is already in use!' });
    return await invalidErrorPopUPMessage.textContent();
  }

  async getPasswordShouldSame(): Promise<string | null> {
    const passwordShouldSame = this.page.getByRole('heading', { name: 'Password and Confirm password should be same!' });
    return await passwordShouldSame.textContent();
  }

  async userPasswordInput(): Promise<void> {
    await this.userPassword.click();
  }

  async getInputCharacterInputErrorMessage(): Promise<string | null> {
    return await this.inputCharacterErrorMessage.textContent();
  }

  async getInvalidEmailErrorMessage(): Promise<string | null> {
    return await this.inputInvalidEmailErrorMessage.textContent();
  }

  async getinputLowercaseErrorMessage(): Promise<string | null> {
    return await this.inputLowercaseErrorMessage.textContent();
  }

  async getinputUppercaseErrorMessage(): Promise<string | null> {
    return await this.inputUppercaseErrorMessage.textContent();
  }

  async clickSignUp(): Promise<void> {
    await this.signUpButton.click();
  }

  async clickSignInLink(): Promise<void> {
    await this.signInPage.click();
  }

  async verifyEmailFieldIsVisible(): Promise<void> {
    await expect(this.userEmail).toBeVisible();
  }

  async verifyPasswordFieldIsVisible(): Promise<void> {
      await expect(this.userPassword).toBeVisible();
  }

  async verifyConfirmPasswordFieldIsVisible(): Promise<void> {
    await expect(this.userConfirmPassword).toBeVisible();
  }

  async verifySignUpButtonIsVisible(): Promise<void> {
      await expect(this.signUpButton).toBeVisible();
  }

  async verifyAlreadyHaveAccountLinkIsVisible(): Promise<void> {
      await expect(this.alreadyHaveAccount).toBeVisible();
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

  async isConfirmPasswordPlaceholderBold(): Promise<boolean> {
    return await this.isPlaceholderBold('#passwordConfirm');
  }

  async fillSignUpPasswordFields(password= config.signUpCredentials.userPassword, confirmPassword= config.signUpCredentials.userConfirmPassword) {
    await this.userPassword.fill(password);
    await this.userConfirmPassword.fill(confirmPassword);
  };

  async getSuccessfullySignedUpMessage(): Promise<string | null> {
    const successfullySignedUpMessage = this.page.getByRole('heading', { name: 'You are successfully signed up!' });
    return await successfullySignedUpMessage.textContent();
}

 

  };