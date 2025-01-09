import { test, expect } from '@playwright/test';
import { SettingsCertificate } from '../../page objects/Settings/SettingsCertificate';

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

  test('US-41 All certificate input box labels should listed', async ({}) => {

    // Navigate to the Certificate section
    await settingsCertificate.navigateToSettingsCertificateTab();

    // Verify Certificate Details
    await settingsCertificate.verifyCertificateLabels();
  });

  test('US-42 Verify All Input Text Error Messages', async ({}) => {

    await settingsCertificate.navigateToSettingsCertificateTab();

    // Validate error messages dynamically, clear, and restore text
    await settingsCertificate.validateInputErrorMessageAndRestoreDefaultInput(
      'Training Manager Name',
      'Enter Training Manager Name',
      //'', //Training Manager Name is required!
      'Aziz Kale (Training Manager)',
    );

    await settingsCertificate.validateInputErrorMessageAndRestoreDefaultInput(
      'EASA-Text',
      'EASA-Text',
      //'', //EASA-Text is required!
      'EASA Form Issue 3',
    );

    await settingsCertificate.validateInputErrorMessageAndRestoreDefaultInput(
      'Place Of Birth',
      'Place Of Birth',
      //'', //Place Of Birth is required!
      'Place of Birth',
    );

    await settingsCertificate.validateInputErrorMessageAndRestoreDefaultInput(
      'Date Of Birth',
      'Date Of Birth',
      //'', //Date Of Birth is required!
      'Date of Birth',
    );

    // await settingsCertificate.validateInputErrorMessageAndRestoreDefaultInput(
    //   'Main Text',
    //   'Main Text',
    //   '', //Main Text is required!
    //   'Bildungs GmbH, Friedrichshafener ',
    // );

    await settingsCertificate.validateInputErrorMessageAndRestoreDefaultInput(
      'Reference Text',
      'Reference Text',
      //'', //Reference Text is required!
      'Reference: DE.147.0002-',
    );

    await settingsCertificate.validateInputErrorMessageAndRestoreDefaultInput(
      'End Of List Text',
      'End Of List Text',
      //'', //End Of List Text is required!
      '- end of list -',
    );

    await settingsCertificate.validateInputErrorMessageAndRestoreDefaultInput(
      'Company Name',
      'Company Name',
      //'', //Company Name is required!
      'Emm-it GmbH',
    );

    await settingsCertificate.validateInputErrorMessageAndRestoreDefaultInput(
      'Certificate Title',
      'Certificate Title',
      //'', //Certificate Title is required!
      'Certificate of Recognition',
    );

    //await settingsCertificate.clickUpdateButton();
    await settingsCertificate.clickUpdateUntilSuccess();
    await expect(settingsCertificate.successPopupMessage).toBeVisible();

  });

  test('US-43 Verify Main Text Warning Messages', async ({page}) => {
    
    await settingsCertificate.navigateToSettingsCertificateTab();
    const mainTextwarningMessage = await settingsCertificate.mainTextWarningIconHover();
    const mainTextexpectedMessage = "You should not delete or change '${certTypeName}' from the main text!";
    expect(mainTextwarningMessage).toBe(mainTextexpectedMessage);
    console.log(mainTextwarningMessage);

    await settingsCertificate.navigateToSettingsCertificateTab();
    await settingsCertificate.updateMainText();
    expect(mainTextwarningMessage).toBe(mainTextexpectedMessage);
    console.log(mainTextwarningMessage);

    await settingsCertificate.navigateToSettingsCertificateTab();
    const mainTextInputError = await settingsCertificate.deleteMainText();
    const mainTextexpectedError = "Main Text is required!";
    expect(mainTextInputError).toBe(mainTextexpectedError);
    console.log(mainTextInputError);

    await page.goto('https://cm.emm-itech.de/settings/set-certificate');
    await settingsCertificate.navigateToSettingsCertificateTab();
    await settingsCertificate.updateReferenceText();

    await settingsCertificate.navigateToSettingsCertificateTab();
    const referenceTextInputError = await settingsCertificate.deleteReferenceText();
    const referenceTextexpectedError = "Reference Text is required!";
    expect(referenceTextInputError).toBe(referenceTextexpectedError);
    console.log(referenceTextInputError);

  });
  
});
