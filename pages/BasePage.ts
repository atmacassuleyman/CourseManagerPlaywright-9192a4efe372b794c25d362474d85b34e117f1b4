import { expect, Page } from '@playwright/test';
import { config } from '../playwright.config';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToBaseURL(): Promise<void> {
    await this.page.goto(config.baseURL);
}

async navigateToSignUpPage(): Promise<void> {
  await this.page.goto(config.signUpPage);
}

async getTitle(expectedTitle?: string): Promise<string> {
  const title = await this.page.title();
  if (expectedTitle) {
      await expect(this.page).toHaveTitle(expectedTitle); // Assertion
  }
  return title;
}
}