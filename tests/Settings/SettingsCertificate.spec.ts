import { test, expect } from '@playwright/test';

test('test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userEmail = page.locator('#email');
  const userPassword = page.locator('#password');
  const signInButton = page.locator("[type='submit']");
  const homePage = page.getByText('Welcome to our application');
  await page.goto("https://cm.emm-itech.de/");
  console.log(await page.title());
  await expect(page).toHaveTitle("EMM-IT | Course Manager");
  //await page.getByPlaceholder('Type your password').click();
  await userEmail.fill("suleyman.atmaca@emm-it.de");
  await userPassword.fill("T%633642945806oc");
  await signInButton.click();
  console.log(await homePage.textContent());
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('link', { name: 'certificate', exact: true }).click();
  await page.getByText('Training Manager Name');
  await page.getByText('EASA-Text');
  await page.getByText('Place Of Birth');
  await page.getByText('Date Of Birth');
  await page.getByText('Main Text');
  await page.getByText('Reference Text');
  await page.getByText('End Of List Text');
  await page.getByText('Company Name');
  await page.getByText('Certificate Title');
});