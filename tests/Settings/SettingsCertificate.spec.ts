import { test, expect } from '@playwright/test';
import { SettingsCertificate } from '../../pages/SettingsCertificate';

test.describe('Sign Up Page', () => {
  let settingsCertificate: SettingsCertificate;

  test.beforeEach(async ({ page }) => {
    settingsCertificate = new SettingsCertificate(page);
    await settingsCertificate.navigateToBaseURL();
    await settingsCertificate.fillCredentials('suleyman.atmaca@emm-it.de', 'T%633642945806oc');
    await expect(page).toHaveTitle('EMM-IT | Course Manager');
  });

test('US-35 All certificate input box labels should listed ', async ({ browser }) => {

  const welcomeText = await settingsCertificate.getHomePageWelcomeText();
        console.log(welcomeText);
        expect(welcomeText).toBe('Welcome to our application EMM-IT GmbH!');
  // Navigate to the Certificate section
  await settingsCertificate.navigateToCertificateSection();

  // Verify Certificate Details
  await settingsCertificate.verifyCertificateDetails();
});

});
