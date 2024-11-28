import { config } from "../playwright.config";
import { BasePage } from "./BasePage";


export class SettingsCertificate extends BasePage{
    private userEmail = this.page.locator('#email');
    private userPassword = this.page.locator('#password');
    private signInButton = this.page.locator("[type='submit']");
    private settingsButton = this.page.getByRole('button', { name: 'Settings' });
    private certificateLink = this.page.getByRole('link', { name: 'certificate', exact: true });
    private trainingManagerName = this.page.getByText('Training Manager Name');
    private easaText = this.page.getByText('EASA-Text');
    private placeOfBirth = this.page.getByText('Place Of Birth');
    private dateOfBirth = this.page.getByText('Date Of Birth');
    private mainText = this.page.getByText('Main Text');
    private referenceText = this.page.getByText('Reference Text');
    private endOfListText = this.page.getByText('End Of List Text');
    private companyName = this.page.getByText('Company Name');
    private certificateTitle = this.page.getByText('Certificate Title');
    private homePageWelcomeText = this.page.getByText('Welcome to our application EMM-IT GmbH!');

    async fillCredentials(email = config.credentials.userEmail, password = config.credentials.userPassword) {
        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
        await this.signInButton.click();
    }

    async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }

    async getHomePageWelcomeText(): Promise<string | null> {
        return await this.homePageWelcomeText.textContent();
    }

    async navigateToCertificateSection(): Promise<void> {
        await this.settingsButton.click();
        await this.certificateLink.click();
    }

    async verifyCertificateDetails(): Promise<void> {
        await this.trainingManagerName.isVisible();
        await this.easaText.isVisible();
        await this.placeOfBirth.isVisible();
        await this.dateOfBirth.isVisible();
        await this.mainText.isVisible();
        await this.referenceText.isVisible();
        await this.endOfListText.isVisible();
        await this.companyName.isVisible();
        await this.certificateTitle.isVisible();
    }

} 