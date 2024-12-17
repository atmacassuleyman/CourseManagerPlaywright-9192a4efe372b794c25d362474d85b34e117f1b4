import { config } from "../../playwright.config";
import { BasePage } from "../BasePage";

export class SettingsCategory extends BasePage{
    private userEmail = this.page.locator('#email');
    private userPassword = this.page.locator('#password');
    private signInButton = this.page.locator("[type='submit']");
    private homePageWelcomeText = this.page.getByText('Welcome to our application EMM-IT GmbH!');
    private settingsButton = this.page.getByRole('button', { name: 'Settings' });
    private categoryLink = this.page.getByRole('link', { name: 'category', exact: true });
    private searchModuleInputBox = this.page.getByPlaceholder('Search Module');
    private allModulesList = this.page.getByRole('cell', { name: 'Aviation Legislation', exact: true });
    private selectCategoryDropdown = this.page.locator('app-category-settings').getByRole('combobox');
    private firstCategory = this.page.getByRole('heading', { name: 'Selected Category: Cat A1 Aeroplanes Turbine' });
    private firstModuleName = this.page.getByRole('cell', { name: 'Physics' }).first();
    private firstModuleNo = this.page.getByRole('cell', { name: 'Module 2' }).first();
    private allModulesAddButtons = this.page.locator('//h6[contains(text(), "All Modules")]/..//table//button').first();
    private selectedCategoryDeleteButtons = this.page.locator('//h6[contains(text(), "Selected Category")]/..//table//button');
    private addCategoryPopup = this.page.getByText('Add Category×');
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

async verifySelectedDeleteButtonsVisible(): Promise<void> {
    await this.selectedCategoryDeleteButtons.isVisible();
}

async verifAllModulesAddButtonsVisible(): Promise<void> {
    await this.allModulesAddButtons.isVisible();
}

async getFirstModuleNameText(): Promise<string | null> {
return await this.firstModuleName.textContent();

}

async getFirstModuleNoText(): Promise<string | null> {
return await this.firstModuleNo.textContent();
    
}

async pleaseSelectCategory(): Promise<string | null> {
    await this.allModulesAddButtons.click();
    const selectCategoryPopup = await this.page.getByRole('heading', { name: 'Please select a category.' });
    return await selectCategoryPopup.textContent();
}

async categoryAlreadyHasModule(): Promise<string | null> {
    await this.selectCategoryDropdown.click();
    await this.selectCategoryDropdown.selectOption('1: Object');
    await this.allModulesAddButtons.click();
    await this.addButton.click();
    const categoryHasModule = await this.page.getByRole('heading', { name: 'The category has already the module you want to add!' });
    return await categoryHasModule.textContent();
}

async addModuleUntilSuccess(): Promise<void> {
    const allModulesList = await this.page.locator('.//h6[contains(text(), "All Modules")]/..//table');
    const allModulesAddButtons = await allModulesList.locator('button');

    // for (let i = 0; i < allModulesList.; i++) {
    //     const allModule = allModulesList[i]
    // }

}
}