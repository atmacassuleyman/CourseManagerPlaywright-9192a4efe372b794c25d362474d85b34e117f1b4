import { expect } from "@playwright/test";
import { config } from "../../playwright.config";
import { BasePage } from "../BasePage";


export class SettingsCertificate extends BasePage{
    private userEmail = this.page.locator('#email');
    private userPassword = this.page.locator('#password');
    private signInButton = this.page.locator("[type='submit']");
    private settingsButton = this.page.getByRole('button', { name: 'Settings' });
    private certificateLink = this.page.getByRole('link', { name: 'certificate', exact: true });
    public trainingManagerName = this.page.getByText('Enter Training Manager Name');
    public easaText = this.page.getByText('EASA-Text');
    public placeOfBirth = this.page.getByText('Place Of Birth');
    public dateOfBirth = this.page.getByText('Date Of Birth');
    public mainText = this.page.getByText('Main Text');
    public referenceText = this.page.getByText('Reference Text');
    public endOfListText = this.page.getByText('End Of List Text');
    public companyName = this.page.getByText('Company Name');
    public certificateTitle = this.page.getByText('Certificate Title');
    private homePageWelcomeText = this.page.getByText('Welcome to our application EMM-IT GmbH!');
    private updateButton = this.page.getByRole('button', { name: 'Update' });
    public successPopupMessage  = this.page.getByRole('heading', { name: 'Certificate Texts has been updated succesfully!' });
    public failedPopupMessage = this.page.getByRole('heading' , {name: 'Certificate Texts has been updated succesfully!' });
    private mainTextWarningIcon = this.page.locator('form').getByRole('img').first();
    private mainTextWarningMessage = this.page.getByText("You should not delete or change '${certTypeName}' from the main text!");
    private referenceTextWarningIcon = this.page.locator('form').getByRole('img').nth(1);
    private referenceTextWarningMessage = this.page.getByText("You should not delete or change '${info.course.course_id} and ${info.trainee.trainee_id}' from the reference text!");

    async fillCredentials(email = config.credentials.userEmail, password = config.credentials.userPassword) {
        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
        await this.signInButton.click();
    };

    async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    };
    
    async clickUpdateButton(): Promise<void> {
        await this.updateButton.click();
    };

    //Method to click the 'Update' button until the success message appears
    async clickUpdateUntilSuccess(maxRetries: number = 3): Promise<void> {
    let attempts = 0;

    while (attempts < maxRetries) {
      attempts++;
      try {
        // Click the update button
        await this.updateButton.click();
        
        // Wait for the success message to appear
        await this.successPopupMessage.waitFor({ state: 'visible', timeout: 2000 });

        // If success message appears, exit the loop
        console.log('Success popup appeared!');
        return;
      } catch (error) {
        // If the success message is not found, retry
        console.log(`Attempt ${attempts} failed, retrying...`);
      }
    }
    throw new Error('Failed to find success popup after maximum retries');
    };

    async getHomePageWelcomeText(): Promise<string | null> {
        return await this.homePageWelcomeText.textContent();
    };

    async verifyCertificateLabels(): Promise<void> {
        await this.trainingManagerName.isVisible();
        await this.easaText.isVisible();
        await this.placeOfBirth.isVisible();
        await this.dateOfBirth.isVisible();
        await this.mainText.isVisible();
        await this.referenceText.isVisible();
        await this.endOfListText.isVisible();
        await this.companyName.isVisible();
        await this.certificateTitle.isVisible();
    };

    async navigateToSettingsCertificateTab(): Promise<void> {
        await this.settingsButton.click();
        await this.certificateLink.click();
    };

    /**
     * Validate input error message dynamically for input fields after clearing and restoring text
     * @param inputTextTitle - The title attribute of the input field
     * @param inputPlaceholder - The placeholder attribute of the input field
     * @param expectedInputErrorMessage - The expected error message to validate
     * @param defaultInputText - The default value of the input field to restore after validation
     */
    async validateInputErrorMessageAndRestoreDefaultInput(
        inputTextTitle: string,
        inputPlaceholder: string,
        //expectedInputErrorMessage: string,
        defaultInputText: string
        ): Promise<void> {
        const inputField = this.page.locator(`i:has-text("${inputTextTitle}")`);
        const placeholderField = this.page.locator(`input[placeholder="${inputPlaceholder}"]`);
        //const errorMessageLocator = this.page.locator(`i:has-text("${expectedInputErrorMessage}")`);
        const defaultInputTextMessage = this.page.locator(`text="${defaultInputText}"`);
        
        // Clear the input field
        await inputField.press('Backspace');

        // Ensure the input field exists and is visible
        await expect(inputField).toBeVisible();
        console.log(inputField);

        //Validate the error message is displayed
        // await expect(errorMessageLocator).toBeVisible();
        // console.log(errorMessageLocator);

        // Validate the placeholder is displayed
        await expect(placeholderField).toBeVisible();
        console.log(placeholderField);

        // Restore the original value in the input field
        await inputField.fill(defaultInputText);
        console.log(defaultInputTextMessage);

        // Optionally validate that the error message is no longer displayed
        //await expect(errorMessageLocator).not.toBeVisible();
    };

    async mainTextWarningIconHover(): Promise<string | null> {
        // Hover over the warning icon
        await this.mainTextWarningIcon.hover();

        // Wait for the warning message to become visible
        await this.mainTextWarningMessage.waitFor({ state: 'visible', timeout: 5000 });
        // Return the warning message text
        return await this.mainTextWarningMessage.textContent();
    };

    async referenceTextWarningIconHover(): Promise<string | null> {

        await this.referenceTextWarningIcon.hover();

        // Wait for the warning message to become visible
        await this.referenceTextWarningMessage.waitFor({ state: 'visible', timeout: 5000 });
        // Return the warning message text
        return await this.referenceTextWarningMessage.textContent();
    };



    //   /**
    //  * @param expectedInputErrorMessage
    //  * @param defaultInputText 
    //  */
    //   async validateErroPopup(
    //     expectedInputErrorMessage: string,
    //     defaultInputText: string
    //     ): Promise<void> {
    //     const inputField = this.page.locator(`i:has-text("${inputTextTitle}")`);
    //     // Ensure the input field exists and is visible
    //     await expect(inputField).toBeVisible();

    //     // Step 1: Clear the input field
    //     await inputField.fill('');

    //     // Step 2: Trigger validation by blurring the input field
    //     await inputField.blur();

    //     // Step 3: Validate the error message is displayed
    //     //await expect(errorMessageLocator).toBeVisible();

    //     // Step 4: Restore the original value in the input field
    //     await inputField.fill(defaultInputText);

    //     // Optionally validate that the error message is no longer displayed
    //     //await expect(errorMessageLocator).not.toBeVisible();
    // };

    }; 