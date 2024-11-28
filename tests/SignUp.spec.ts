import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignUpPage } from '../pages/SignUp';

test.describe('Sign Up Page', () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.navigateToBaseURL();
    await signUpPage.clickNotRegisteredLink();
    await expect(page).toHaveTitle('EMM-IT | Course Manager');
  });

test('US-1 Sign Up Button is Disabled', async ({ }) => {
  //verify Sign Up Button is Disabled if only the userPassword is filled
  await signUpPage.fillSignUpCredentials('', 'Ab123@Ab123@', '');
  expect(await signUpPage.isSignUpButtonDisabled()).toBeTruthy();

  //verify Sign Up Button is Disabled if only the userEmail is filled
  await signUpPage.navigateToSignUpPage();
  await signUpPage.fillSignUpCredentials('ss.atm@emm-it.de', '', '');
  expect(await signUpPage.isSignUpButtonDisabled()).toBeTruthy();

  //verify Sign Up Button is Disabled if only the userConfirmPassword is filled
  await signUpPage.navigateToSignUpPage();
  await signUpPage.fillSignUpCredentials('', '', 'Ab123@Ab123@');
  expect(await signUpPage.isSignUpButtonDisabled()).toBeTruthy();

  //getEmailRequiredErrorMessage
  await signUpPage.navigateToSignUpPage();
  await signUpPage.fillSignUpCredentials('', 'Ab123@Ab123@', 'Ab123@Ab123@');
  console.log(await signUpPage.getEmailRequiredErrorMessage());
  expect(await signUpPage.isSignUpButtonDisabled()).toBeTruthy();

  //getPasswordRequiredErrorMessage
  await signUpPage.navigateToSignUpPage();
  await signUpPage.fillSignUpCredentials('ss.atm@emm-it.de', '', 'Ab123@Ab123@');
  console.log(await signUpPage.getPasswordRequiredErrorMessage());
  expect(await signUpPage.isSignUpButtonDisabled()).toBeTruthy();

  //getConfirmPasswordRequiredMessage
  await signUpPage.navigateToSignUpPage();
  await signUpPage.fillSignUpCredentials('ss.atm@emm-it.de', 'Ab123@Ab123@', '');
  await signUpPage.userPasswordInput();
  console.log(await signUpPage.getConfirmPasswordRequiredMessage());
  expect(await signUpPage.isSignUpButtonDisabled()).toBeTruthy();
  });

test('US-2 Unable to Sign Up without correct credentials', async ({ }) => {
  // Invalid email format
  await signUpPage.fillSignUpCredentials('ss.atm-it.de', 'Ab123@Ab123@', 'Ab123@Ab123@');
  console.log(await signUpPage.getInvalidEmailErrorMessage());
  expect(await signUpPage.isSignUpButtonDisabled()).toBeTruthy();

  // Password and Confirm Password do not match
  await signUpPage.navigateToSignUpPage();
  await signUpPage.fillSignUpCredentials('ss.atm@emm-it.de', 'Ab123@Ab123@', 'Ab123@Ab123');
  await signUpPage.clickSignUp();
  const passwordShouldSame = await signUpPage.getPasswordShouldSame();
  console.log(passwordShouldSame);

  // Email already in use
  await signUpPage.navigateToSignUpPage();
  await signUpPage.fillSignUpCredentials('suleyman.atmaca@emm-it.de', 'T%633642945806oc', 'T%633642945806oc');
  await signUpPage.clickSignUp();
  const emailInUseError = await signUpPage.getEmailInUseErrorPopupMessage();
  console.log(emailInUseError);

  // Password less than minimum characters
  await signUpPage.navigateToSignUpPage();
  await signUpPage.fillSignUpCredentials('ss.atm@emm-it.de', '123A2@', '123A2@');
  console.log(await signUpPage.getInputCharacterInputErrorMessage());
  expect(await signUpPage.isSignUpButtonDisabled()).toBeTruthy();

  // Password more than maximum characters
  await signUpPage.navigateToSignUpPage();
  await signUpPage.fillSignUpCredentials('ss.atm@emm-it.de', '123Ab2@123Ab2@123Ab2@', '123Ab2@123Ab2@123Ab2@');
  console.log(await signUpPage.getInputCharacterInputErrorMessage());
  expect(await signUpPage.isSignUpButtonDisabled()).toBeTruthy();

  // Password without lowercase letter
  await signUpPage.navigateToSignUpPage();
  await signUpPage.fillSignUpCredentials('ss.atm@emm-it.de', 'B123@B123@', 'B123@B123@');
  console.log(await signUpPage.getinputLowercaseErrorMessage());
  expect(await signUpPage.isSignUpButtonDisabled()).toBeTruthy();
  
  // Password without uppercase letter
  await signUpPage.navigateToSignUpPage();
  await signUpPage.fillSignUpCredentials('ss.atm@emm-it.de', 'b123@b123@', 'b123@b123@');
  console.log(await signUpPage.getinputUppercaseErrorMessage());
  expect(await signUpPage.isSignUpButtonDisabled()).toBeTruthy();
  });

test('US-3 Redirect to the Sign In page', async ({  }) => {
  await signUpPage.navigateToSignUpPage();
  await signUpPage.clickSignInLink();
  });

test('US-4 Verify Sign Up input boxes place holder texts are not bold font', async ({  }) => {
  await signUpPage.navigateToSignUpPage();

  // Verify placeholder text font weight for email and password fields
  const isEmailPlaceholderBold = await signUpPage.isEmailPlaceholderBold();
  const isPasswordPlaceholderBold = await signUpPage.isPasswordPlaceholderBold();
  const isConfirmPasswordPlaceholderBold = await signUpPage.isConfirmPasswordPlaceholderBold();

  // Assert that placeholders are not bold
  expect(isEmailPlaceholderBold).toBe(false);
  expect(isPasswordPlaceholderBold).toBe(false);
  expect(isConfirmPasswordPlaceholderBold).toBe(false);
  });

test('US-5 Sign Up With Correct Credentials', async ({ page}) => {
  await signUpPage.navigateToSignUpPage();
  const userEmail = page.locator('#email');
  const randomEmail = faker.internet.email();
  await userEmail.fill(randomEmail);
  await signUpPage.fillSignUpPasswordFields('Ab123@Ab123@', 'Ab123@Ab123@');
  await signUpPage.clickSignUp();
  const successfullySignedUpMessage = await signUpPage.getSuccessfullySignedUpMessage();
  console.log(successfullySignedUpMessage);
  });

});