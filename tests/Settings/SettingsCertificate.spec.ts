import { test, expect } from '@playwright/test';
import { SettingsCertificate } from '../../pages/SettingsCertificate';

test.describe('Settings certificate page', () => {
  let settingsCertificate: SettingsCertificate;

  test.beforeEach(async ({ page }) => {
    settingsCertificate = new SettingsCertificate(page);
    await settingsCertificate.navigateToBaseURL();
    await settingsCertificate.fillCredentials('suleyman.atmaca@emm-it.de', 'T%633642945806oc');
    await expect(page).toHaveTitle('EMM-IT | Course Manager');
    const welcomeText = await settingsCertificate.getHomePageWelcomeText();
    console.log(welcomeText);
  });

test('US-35 All certificate input box labels should listed', async ({ browser }) => {

  // Navigate to the Certificate section
  await settingsCertificate.navigateToCertificateSection();

  // Verify Certificate Details
  await settingsCertificate.verifyCertificateDetails();
});

test('US-36 Verify All Input Text Error Messages', async ({  }) => {

  await settingsCertificate.navigateToCertificateSection();

  // Validate error messages dynamically, clear, and restore text
  await settingsCertificate.validateErrorMessageAndRestoreInput(
    'Training Manager Name',
    'Enter Training Manager Name',
    '', //Training Manager Name is required!
    'Aziz Kale (Training Manager)',
  );

  await settingsCertificate.validateErrorMessageAndRestoreInput(
    'EASA-Text',
    'EASA-Text',
    '', //EASA-Text is required!
    'EASA Form Issue 3',
  );

  await settingsCertificate.validateErrorMessageAndRestoreInput(
    'Place Of Birth',
    'Place Of Birth',
    '', //Place Of Birth is required!
    'Place of Birth',
  );

  // await settingsCertificate.validateErrorMessageAndRestoreInput(
  //   'Main Text',
  //   'Main Text',
  //   '', //Main Text is required!
  //   'Bildungs GmbH, Friedrichshafener ',
  // );

  // await settingsCertificate.validateErrorMessageAndRestoreInput(
  //   'Reference Text',
  //   'Reference Text',
  //   '', //Reference Text is required!
  //   'Reference: DE.147.0002-',
  // );

  await settingsCertificate.validateErrorMessageAndRestoreInput(
    'End Of List Text',
    'End Of List Text',
    '', //End Of List Text is required!
    'Aziz Kale (Training Manager)',
  );

  await settingsCertificate.validateErrorMessageAndRestoreInput(
    'End Of List Text',
    'End Of List Text',
    '', //End Of List Text is required!
    '- end of list -',
  );

  await settingsCertificate.validateErrorMessageAndRestoreInput(
    'Company Name',
    'Company Name',
    '', //Company Name is required!
    'Emm-it GmbH',
  );

  await settingsCertificate.validateErrorMessageAndRestoreInput(
    'Certificate Title',
    'Certificate Title',
    '', //Certificate Title is required!
    'Certificate of Recognition',
  );

  await settingsCertificate.clickUpdateButton();
  //await settingsCertificate.clickUpdateUntilSuccess();
  //await expect(settingsCertificate.successPopupMessage).toBeVisible();

});

test('US-37 VErify All Text Warning Messages', async ({}) => {

  await settingsCertificate.navigateToCertificateSection();

  const mainTextwarningMessage = await settingsCertificate.mainTextHoverAndGetWarningMessage();
  const mainTextexpectedMessage = "You should not delete or change '${certTypeName}' from the main text!";
  expect(mainTextwarningMessage).toBe(mainTextexpectedMessage);

  const referenceTextwarningMessage = await settingsCertificate.referenceTextHoverAndGetWarningMessage();
  const referenceTextexpectedMessage = "You should not delete or change '${info.course.course_id} and ${info.trainee.trainee_id}' from the reference text!";
  expect(referenceTextwarningMessage).toBe(referenceTextexpectedMessage);

} )
});
