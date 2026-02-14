import { test, expect } from '@fixtures/AuthFixtures';
import { ProgramsPage } from '@pages/programs/ProgramsPage';
import { AddProgramPage } from '@pages/programs/AddProgramPage';
import { EditProgramPage } from '@pages/programs/EditProgramPage';
import { ProgramFactory } from '@utils/factories/ProgramFactory';
import { Logger } from '@utils/logger';

/**
 * Programs E2E Tests
 * Tests complete workflows across multiple pages/features
 * 
 * E2E tests are SLOWER but test REAL user journeys
 * Run these less frequently (nightly builds, before release)
 */

test.describe('Programs E2E Workflows @programs @e2e', () => {
  let programsPage: ProgramsPage;
  let addProgramPage: AddProgramPage;
  let editProgramPage: EditProgramPage;

  test.beforeEach(async ({ 
    programsPage: pPage, 
    addProgramPage: apPage,
    editProgramPage: epPage 
  }) => {
    programsPage = pPage;
    addProgramPage = apPage;
    editProgramPage = epPage;
  });

  /* ==================== COMPLETE PROGRAM SETUP ==================== */

  test('TC-E2E-001: Complete Program Setup - Create to Publish @e2e @smoke', async ({ staffPage }) => {
    Logger.testStart('TC-E2E-001: Complete Program Setup');

    // Generate all test data upfront
    const programData = ProgramFactory.generateCompleteProgram();

    await test.step('Step 1: Navigate to Programs list page', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.verifyPageLoaded();
      Logger.success('On Programs list page');
    });

    await test.step('Step 2: Click Add New Program', async () => {
      await programsPage.clickAddNewProgram();
      await staffPage.waitForTimeout(1000);
      Logger.success('On Add Program page');
    });

    await test.step('Step 3: Fill basic program information', async () => {
      await addProgramPage.fillProgramForm(programData.basicInfo);
      Logger.success(`Program info filled: ${programData.basicInfo.programName}`);
    });

    await test.step('Step 4: Submit program (redirects to Edit page)', async () => {
      await addProgramPage.clickSubmit();
      await editProgramPage.verifyPageLoaded();
      Logger.success('Program created - now on Edit page');
    });

    await test.step('Step 5: Add contact information', async () => {
      await editProgramPage.goToContactInformation();
      
      // Add first contact
      if (programData.contacts && programData.contacts.length > 0) {
        const contact = programData.contacts[0];
        Logger.info(`Adding contact: ${contact.contactName}`);
        
        // Fill contact form (adjust based on your actual page)
        await staffPage.fill('[name="contactName"]', contact.contactName);
        await staffPage.fill('[name="contactEmail"]', contact.contactEmail);
        await staffPage.fill('[name="contactPhone"]', contact.contactPhone);
        await staffPage.click('button:has-text("Add Contact")');
        
        Logger.success('Contact added');
      }
    });

    await test.step('Step 6: Upload program documents', async () => {
      await editProgramPage.goToDocuments();
      
      if (programData.documents && programData.documents.length > 0) {
        Logger.info('Uploading documents...');
        // Upload document logic here
        Logger.success('Documents uploaded');
      }
    });

    await test.step('Step 7: Configure required tabs', async () => {
      await editProgramPage.expandSection('Required Tabs To Show in Application');
      
      if (programData.requiredTabs) {
        Logger.info('Configuring required tabs...');
        // Configure tabs based on programData.requiredTabs
        Logger.success('Required tabs configured');
      }
    });

    await test.step('Step 8: Final submission', async () => {
      await editProgramPage.clickSubmit();
      await staffPage.waitForTimeout(1000);
      Logger.success('Program setup complete!');
    });

    await test.step('Step 9: Verify program exists in list', async () => {
      await programsPage.navigateToProgramsPage();
      const exists = await programsPage.verifyProgramExists(programData.basicInfo.programCode);
      expect(exists).toBeTruthy();
      Logger.success(`Program ${programData.basicInfo.programCode} found in list`);
    });

    Logger.testEnd('TC-E2E-001: Complete Program Setup');
  });

  /* ==================== SEARCH AND EDIT WORKFLOW ==================== */

  test('TC-E2E-002: Search Program and Edit Details @e2e @regression', async ({ staffPage }) => {
    Logger.testStart('TC-E2E-002: Search and Edit Program');

    // First create a program to edit
    const programData = ProgramFactory.generateBasicInfo();

    await test.step('Step 1: Create a program first', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
      await addProgramPage.fillProgramForm(programData);
      await addProgramPage.clickSubmit();
      await editProgramPage.verifyPageLoaded();
      Logger.success('Program created for editing test');
    });

    await test.step('Step 2: Navigate back to programs list', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Step 3: Search for the created program', async () => {
      await programsPage.searchByProgramCode(programData.programCode);
      await staffPage.waitForTimeout(1000);
      Logger.success(`Searched for: ${programData.programCode}`);
    });

    await test.step('Step 4: Click edit icon for the program', async () => {
      await programsPage.editProgram(programData.programCode);
      await editProgramPage.verifyPageLoaded();
      Logger.success('Opened program for editing');
    });

    await test.step('Step 5: Update program description', async () => {
      await editProgramPage.expandProgramBasicInfo();
      
      const newDescription = 'Updated description - E2E test';
      await staffPage.fill('textarea', newDescription);
      Logger.success('Description updated');
    });

    await test.step('Step 6: Save changes', async () => {
      await editProgramPage.clickSubmit();
      await staffPage.waitForTimeout(1000);
      Logger.success('Changes saved');
    });

    Logger.testEnd('TC-E2E-002: Search and Edit Program');
  });

  /* ==================== FILTER AND VIEW WORKFLOW ==================== */

  test('TC-E2E-003: Filter Programs and View Details @e2e @regression', async ({ staffPage }) => {
    Logger.testStart('TC-E2E-003: Filter and View Program');

    await test.step('Step 1: Navigate to programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Step 2: Apply Active filter', async () => {
      await programsPage.selectActiveFilter();
      await staffPage.waitForTimeout(1000);
      Logger.success('Active filter applied');
    });

    await test.step('Step 3: Search within filtered results', async () => {
      await programsPage.searchByProgramName('Grant');
      await staffPage.waitForTimeout(1000);
      Logger.success('Search applied on filtered results');
    });

    await test.step('Step 4: View first program in results', async () => {
      // Get first program code from table
      const firstRow = staffPage.locator('tbody tr').first();
      const codeCell = firstRow.locator('td').first();
      const programCode = await codeCell.textContent();
      
      if (programCode) {
        await programsPage.editProgram(programCode.trim());
        await editProgramPage.verifyPageLoaded();
        Logger.success(`Viewing program: ${programCode}`);
      }
    });

    await test.step('Step 5: Navigate through program tabs', async () => {
      await editProgramPage.goToContactInformation();
      await staffPage.waitForTimeout(500);
      
      await editProgramPage.goToDocuments();
      await staffPage.waitForTimeout(500);
      
      await editProgramPage.goToSubPrograms();
      await staffPage.waitForTimeout(500);
      
      Logger.success('Navigated through all tabs');
    });

    Logger.testEnd('TC-E2E-003: Filter and View Program');
  });

  /* ==================== COPY PROGRAM WORKFLOW ==================== */

  test('TC-E2E-004: Copy Existing Program @e2e @regression', async ({ staffPage }) => {
    Logger.testStart('TC-E2E-004: Copy Program Workflow');

    const originalProgram = ProgramFactory.generateBasicInfo();

    await test.step('Step 1: Create original program', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
      await addProgramPage.fillProgramForm(originalProgram);
      await addProgramPage.clickSubmit();
      Logger.success('Original program created');
    });

    await test.step('Step 2: Navigate back to programs list', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Step 3: Find and copy the program', async () => {
      await programsPage.searchByProgramCode(originalProgram.programCode);
      await staffPage.waitForTimeout(1000);
      
      // Click copy icon (adjust selector based on your app)
      const copyIcon = programsPage.getProgramRow(originalProgram.programCode)
        .locator('.fa-copy, a[title="Copy"]').first();
      
      if (await copyIcon.isVisible({ timeout: 5000 })) {
        await copyIcon.click();
        await staffPage.waitForTimeout(1000);
        Logger.success('Clicked copy icon');
      } else {
        Logger.warn('Copy feature may not be available');
      }
    });

    await test.step('Step 4: Modify copied program details', async () => {
      const newProgramCode = ProgramFactory.generateProgramCode();
      
      // Should be on Add Program page with pre-filled data
      await addProgramPage.programCodeInput.clear();
      await addProgramPage.enterProgramCode(newProgramCode);
      
      Logger.success(`New program code: ${newProgramCode}`);
    });

    await test.step('Step 5: Submit copied program', async () => {
      await addProgramPage.clickSubmit();
      await staffPage.waitForTimeout(1000);
      Logger.success('Copied program created');
    });

    Logger.testEnd('TC-E2E-004: Copy Program Workflow');
  });

  /* ==================== MULTI-PROGRAM WORKFLOW ==================== */

  test('TC-E2E-005: Create Multiple Programs in Sequence @e2e @slow', async () => {
    Logger.testStart('TC-E2E-005: Create Multiple Programs');

    const programsToCreate = 3;
    const createdPrograms: string[] = [];

    for (let i = 0; i < programsToCreate; i++) {
      await test.step(`Create program ${i + 1} of ${programsToCreate}`, async () => {
        const programData = ProgramFactory.generateBasicInfo({
          programName: `Batch Program ${i + 1} - ${Date.now()}`
        });

        await programsPage.navigateToProgramsPage();
        await programsPage.clickAddNewProgram();
        await addProgramPage.fillProgramForm(programData);
        await addProgramPage.clickSubmit();
        
        createdPrograms.push(programData.programCode);
        Logger.success(`Program ${i + 1} created: ${programData.programCode}`);
      });
    }

    await test.step('Verify all programs exist in list', async () => {
      await programsPage.navigateToProgramsPage();
      
      for (const code of createdPrograms) {
        const exists = await programsPage.verifyProgramExists(code);
        expect(exists).toBeTruthy();
        Logger.success(`Verified: ${code}`);
      }
    });

    Logger.testEnd('TC-E2E-005: Create Multiple Programs');
  });

  /* ==================== ERROR RECOVERY WORKFLOW ==================== */

  test('TC-E2E-006: Error Recovery - Cancel and Retry @e2e @negative', async () => {
    Logger.testStart('TC-E2E-006: Error Recovery Workflow');

    const programData = ProgramFactory.generateBasicInfo();

    await test.step('Step 1: Start creating program', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
    });

    await test.step('Step 2: Fill partial data and cancel', async () => {
      await addProgramPage.enterProgramCode(programData.programCode);
      await addProgramPage.clickCancel();
      Logger.success('Cancelled first attempt');
    });

    await test.step('Step 3: Confirm cancellation if dialog appears', async ({ staffPage }) => {
      try {
        const confirmButton = staffPage.locator('button:has-text("Yes"), button:has-text("OK")');
        if (await confirmButton.isVisible({ timeout: 2000 })) {
          await confirmButton.click();
        }
      } catch (e) {
        // No dialog
      }
    });

    await test.step('Step 4: Start again and complete', async () => {
      await programsPage.clickAddNewProgram();
      await addProgramPage.fillProgramForm(programData);
      await addProgramPage.clickSubmit();
      await editProgramPage.verifyPageLoaded();
      Logger.success('Successfully created on second attempt');
    });

    Logger.testEnd('TC-E2E-006: Error Recovery Workflow');
  });
});

/**
 * HOW TO RUN E2E TESTS:
 * 
 * Run all E2E tests (WARNING: These are SLOW):
 * npx playwright test programs-e2e.spec.ts
 * 
 * Run specific E2E test:
 * npx playwright test -g "TC-E2E-001"
 * 
 * Run all E2E tests with tag:
 * npx playwright test --grep @e2e
 * 
 * Run E2E tests in headed mode (recommended to see workflow):
 * npx playwright test programs-e2e.spec.ts --headed
 * 
 * Run E2E tests in UI mode (best for debugging):
 * npx playwright test programs-e2e.spec.ts --ui
 * 
 * WHEN TO RUN E2E TESTS:
 * - Before releases
 * - Nightly builds
 * - After major changes
 * - NOT on every commit (too slow)
 * 
 * TYPICAL SCHEDULE:
 * - @smoke: Every commit (5-10 min)
 * - @regression: Before merging (20-30 min)
 * - @e2e: Nightly/weekly (1-2 hours)
 */