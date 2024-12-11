import { config } from "../../playwright.config";
import { BasePage } from "../BasePage";

export class SettingsCategory extends BasePage{
    private userEmail = this.page.locator('#email');
    private userPassword = this.page.locator('#password');
    private signInButton = this.page.locator("[type='submit']");
    private settingsButton = this.page.getByRole('button', { name: 'Settings' });
    private homePageWelcomeText = this.page.getByText('Welcome to our application EMM-IT GmbH!');
    private categoryLink = this.page.getByRole('link', { name: 'category', exact: true });
    private searchModuleInputBox = this.page.getByPlaceholder('Search Module');
    private allModulesList = this.page.getByRole('cell', { name: 'Aviation Legislation', exact: true });
    private selectCategoryDropdown = this.page.locator('app-category-settings').getByRole('combobox');
    private firstCategory = this.page.getByRole('heading', { name: 'Selected Category: Cat A1 Aeroplanes Turbine' });
    private firstModuleName = this.page.getByRole('cell', { name: 'Physics' }).first();
    private firstModuleNo = this.page.getByRole('cell', { name: 'Module 2' }).first();
    private addButtonIcon = this.page.locator('div:nth-child(2) > .panel > .table-responsive > .table-striped > tbody > tr > .text-center > .mat-mdc-tooltip-trigger').first()
    private deleteButtonIcon = this.page.locator('.text-center > .mat-mdc-tooltip-trigger').first();
    private addButton = this.page.getByRole('button', { name: 'Add' });
    private deleteButton = this.page.getByRole('button', { name: 'Delete' });
    private cancelButton = this.page.getByRole('button', { name: 'Cancel' });


async fillCredentials(email = config.credentials.userEmail, password = config.credentials.userPassword) {
    await this.userEmail.fill(email);
    await this.userPassword.fill(password);
    await this.signInButton.click();
};

async clickSignInButton(): Promise<void> {
    await this.signInButton.click();
};

async getHomePageWelcomeText(): Promise<string | null> {
    return await this.homePageWelcomeText.textContent();
};

async navigateToSettingsCategoryTab(): Promise<void> {
    await this.settingsButton.click();
    await this.categoryLink.click();
};

async verifySearchModuleInput(): Promise<void> {
    await this.searchModuleInputBox.isVisible();
}

async verifyAllModulesList(): Promise<void> {
    await this.allModulesList.isVisible();
}

async getFirstCategoryText(): Promise<string | null> {
    await this.selectCategoryDropdown.click();
    await this.selectCategoryDropdown.selectOption('1: Object');
    return await this.firstCategory.textContent();
}

async verifyDeleteButtonIconVisible(): Promise<void> {
    await this.deleteButtonIcon.isVisible();
}

async verifAddButtonIconVisible(): Promise<void> {
    await this.addButtonIcon.isVisible();
}

async getFirstModuleNameText(): Promise<string | null> {
return await this.firstModuleName.textContent();

}

async getFirstModuleNoText(): Promise<string | null> {
return await this.firstModuleNo.textContent();
    
}

}