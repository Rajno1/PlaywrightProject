# E2E (End-to-End) Testing Guide

## 🎯 **What are E2E Tests?**

### **Regular Tests vs E2E Tests:**

| Regular Tests | E2E Tests |
|--------------|-----------|
| Test ONE page | Test COMPLETE workflow |
| Fast (5-10 seconds) | Slow (30-60 seconds) |
| Run on every commit | Run nightly/weekly |
| Test features | Test user journeys |

---

## 📊 **Example Comparison:**

### **❌ Regular Test (Unit/Feature Test):**
```typescript
// File: programs-add.spec.ts
test('TC-AP-001: Create Program', async ({ addProgramPage }) => {
  // ONLY tests Add Program page
  await addProgramPage.fillProgramForm(data);
  await addProgramPage.clickSubmit();
  // ✅ DONE - One page tested
});
```

### **✅ E2E Test (Complete Workflow):**
```typescript
// File: programs-e2e.spec.ts
test('TC-E2E-001: Complete Program Setup', async ({ 
  programsPage,      // Page 1
  addProgramPage,    // Page 2
  editProgramPage    // Page 3-6 (multiple tabs)
}) => {
  // Step 1: Navigate to list page
  await programsPage.navigateToProgramsPage();
  
  // Step 2: Click Add New Program (Page 1 → Page 2)
  await programsPage.clickAddNewProgram();
  
  // Step 3: Fill and submit program (Page 2)
  await addProgramPage.fillProgramForm(data);
  await addProgramPage.clickSubmit();
  
  // Step 4: Add contact (Page 3 - Edit page, Contact tab)
  await editProgramPage.goToContactInformation();
  await editProgramPage.addContact(contact);
  
  // Step 5: Upload documents (Edit page, Documents tab)
  await editProgramPage.goToDocuments();
  await editProgramPage.uploadDocument(doc);
  
  // Step 6: Configure tabs (Edit page, Settings tab)
  await editProgramPage.expandSection('Required Tabs');
  await editProgramPage.configureRequiredTabs(config);
  
  // Step 7: Final submit
  await editProgramPage.clickSubmit();
  
  // Step 8: Verify in list (Back to Page 1)
  await programsPage.navigateToProgramsPage();
  const exists = await programsPage.verifyProgramExists(code);
  
  // ✅ DONE - Complete journey tested (6+ pages/tabs)
});
```

---

## 🎯 **E2E Test Categories:**

### **1. Complete Setup Workflows**
Test creating something from start to finish

**Example:**
```typescript
test('TC-E2E-001: Complete Program Setup', async () => {
  // List → Add → Edit (multiple tabs) → Back to List
  // Tests: Navigation + Creation + Configuration + Verification
});
```

### **2. Search and Modify Workflows**
Test finding and updating existing data

**Example:**
```typescript
test('TC-E2E-002: Search and Edit Program', async () => {
  // Create → List → Search → Edit → Save → Verify
  // Tests: CRUD operations in sequence
});
```

### **3. Multi-Entity Workflows**
Test creating related entities

**Example:**
```typescript
test('TC-E2E-003: Program → Grant → Application', async () => {
  // Create Program → Create Grant under Program → Submit Application
  // Tests: Related entity creation
});
```

### **4. Filter and View Workflows**
Test navigation through filtered data

**Example:**
```typescript
test('TC-E2E-004: Filter → Search → View Details', async () => {
  // Apply filter → Search → Open → Navigate tabs
  // Tests: Complex navigation patterns
});
```

### **5. Error Recovery Workflows**
Test recovering from errors

**Example:**
```typescript
test('TC-E2E-005: Cancel and Retry', async () => {
  // Start → Fill partial → Cancel → Start again → Complete
  // Tests: Error handling and retry logic
});
```

### **6. Batch Operations**
Test creating/updating multiple items

**Example:**
```typescript
test('TC-E2E-006: Create Multiple Programs', async () => {
  // Create Program 1 → Create Program 2 → Create Program 3 → Verify all
  // Tests: Sequential operations
});
```

---

## 📁 **When to Create E2E Tests:**

### **✅ DO create E2E tests for:**
1. **Critical user journeys**
   - "Staff creates program from start to published state"
   - "User registers → applies for grant → checks status"

2. **Multi-page workflows**
   - Create program (3+ pages)
   - Submit application (multiple sections)

3. **Complex business processes**
   - Approval workflows
   - Status transitions
   - Multi-step forms

4. **Integration points**
   - Program → Grant → Application chain
   - User → Organization → Application flow

### **❌ DON'T create E2E tests for:**
1. **Simple validations** - Use regular tests
2. **Single-page operations** - Use feature tests
3. **Quick checks** - Use smoke tests

---

## 🏗️ **E2E Test Structure:**

### **File Organization:**
```
tests/
└── programs/
    ├── programs-list.spec.ts      ← Feature tests (fast)
    ├── programs-add.spec.ts       ← Feature tests (fast)
    ├── programs-edit.spec.ts      ← Feature tests (fast)
    └── programs-e2e.spec.ts       ← E2E tests (slow) ⭐
```

### **Test Structure Pattern:**
```typescript
test('TC-E2E-XXX: Workflow Name @e2e @slow', async ({ 
  // Import ALL pages needed
  programsPage,
  addProgramPage,
  editProgramPage,
  grantsPage,
  applicationsPage
}) => {
  
  // Step 1: Setup/Navigation
  await test.step('Navigate to starting point', async () => {
    // ...
  });
  
  // Step 2: First Action
  await test.step('Perform first action', async () => {
    // ...
  });
  
  // Step 3: Second Action (different page)
  await test.step('Perform second action', async () => {
    // ...
  });
  
  // Step 4-N: Continue workflow
  
  // Step N: Final Verification
  await test.step('Verify complete workflow', async () => {
    // ...
  });
});
```

---

## 🏷️ **E2E Tags:**

```typescript
test.describe('Programs E2E @programs @e2e', () => {
  
  test('TC-E2E-001: Critical workflow @e2e @smoke', async () => {
    // Critical E2E - run more often
  });
  
  test('TC-E2E-002: Full workflow @e2e @regression', async () => {
    // Regular E2E - run nightly
  });
  
  test('TC-E2E-003: Edge case workflow @e2e @slow', async () => {
    // Slow E2E - run weekly
  });
});
```

---

## 🚀 **How to Run E2E Tests:**

### **Run all E2E tests:**
```bash
npx playwright test --grep @e2e
```

### **Run specific E2E test:**
```bash
npx playwright test -g "TC-E2E-001"
```

### **Run E2E in UI mode (recommended):**
```bash
npx playwright test programs-e2e.spec.ts --ui
```

### **Run E2E in headed mode (see browser):**
```bash
npx playwright test programs-e2e.spec.ts --headed
```

---

## ⏱️ **Test Execution Strategy:**

### **Daily (CI/CD on every commit):**
```bash
# Fast tests only (5-10 minutes)
npm run test:smoke
```

### **Before Merging PR:**
```bash
# All feature tests (20-30 minutes)
npm run test:regression
```

### **Nightly Build:**
```bash
# Include E2E tests (1-2 hours)
npm run test:e2e
```

### **Before Release:**
```bash
# Everything (2-3 hours)
npm run test:all
```

---

## 📝 **Real E2E Examples for Your System:**

### **1. Complete Program Lifecycle:**
```typescript
test('TC-E2E-001: Program Creation to Publication', async () => {
  // 1. Navigate to Programs list
  // 2. Click Add New Program
  // 3. Fill basic info, submit
  // 4. Add contact information (Edit page, Contact tab)
  // 5. Upload documents (Edit page, Documents tab)
  // 6. Configure required tabs (Edit page, Settings)
  // 7. Add sub-programs if needed
  // 8. Submit final program
  // 9. Verify appears in active programs list
  // 10. Search for program and verify details
});
```

### **2. Funding Source to Program Allocation:**
```typescript
test('TC-E2E-002: Funding Source Creation and Allocation', async () => {
  // 1. Create Program A
  // 2. Create Program B
  // 3. Navigate to Funding Sources
  // 4. Create new funding source
  // 5. Allocate funds to Program A
  // 6. Allocate funds to Program B
  // 7. Submit funding source
  // 8. Verify in funding sources list
  // 9. Open Program A, verify funding appears
  // 10. Open Program B, verify funding appears
});
```

### **3. Grant Application Workflow:**
```typescript
test('TC-E2E-003: Complete Grant Application Flow', async () => {
  // 1. Create Program
  // 2. Create Grant under Program
  // 3. Register new organization user
  // 4. Login as organization user
  // 5. Search for available grants
  // 6. Start application for created grant
  // 7. Fill application (multiple sections)
  // 8. Upload required documents
  // 9. Submit application
  // 10. Verify application status
  // 11. Logout as org user
  // 12. Login as staff
  // 13. Verify application in review queue
});
```

### **4. User Registration to Application:**
```typescript
test('TC-E2E-004: New User to Application Submission', async () => {
  // 1. Navigate to registration page
  // 2. Fill registration form
  // 3. Submit registration
  // 4. Verify email/success message
  // 5. Login with new credentials
  // 6. Complete user profile
  // 7. Browse available programs
  // 8. Select a grant
  // 9. Fill application
  // 10. Submit application
  // 11. Verify submission confirmation
});
```

### **5. Edit and Resubmit Workflow:**
```typescript
test('TC-E2E-005: Search, Edit, and Resubmit', async () => {
  // 1. Create program
  // 2. Navigate to programs list
  // 3. Search for created program
  // 4. Edit program
  // 5. Modify multiple tabs
  // 6. Save changes
  // 7. Navigate back to list
  // 8. Search again
  // 9. Verify updated details
  // 10. Edit again (different tabs)
  // 11. Save and verify
});
```

---

## 💡 **E2E Best Practices:**

### **1. Independent Tests:**
```typescript
// ✅ GOOD - Each E2E test is independent
test('TC-E2E-001: Complete setup', async () => {
  const program = ProgramFactory.generateBasicInfo(); // Fresh data
  // Create → Configure → Verify
});

test('TC-E2E-002: Search and edit', async () => {
  const program = ProgramFactory.generateBasicInfo(); // Fresh data
  // Create → Search → Edit → Verify
});

// ❌ BAD - Tests depend on each other
test('TC-E2E-001: Create program', async () => {
  // Creates program with code "TEST123"
});

test('TC-E2E-002: Edit program', async () => {
  // Assumes "TEST123" exists from previous test ❌
});
```

### **2. Use Factories:**
```typescript
// ✅ GOOD - Use factories for all data
test('TC-E2E-001', async () => {
  const program = ProgramFactory.generateCompleteProgram();
  const contact = ProgramFactory.generateContact();
  const document = ProgramFactory.generateDocument();
  // ...
});
```

### **3. Clear Steps:**
```typescript
// ✅ GOOD - Clear, numbered steps
await test.step('Step 1: Navigate to Programs', async () => { });
await test.step('Step 2: Create program', async () => { });
await test.step('Step 3: Add contact', async () => { });

// ❌ BAD - Unclear steps
await test.step('Do stuff', async () => { });
```

### **4. Verify at End:**
```typescript
// ✅ GOOD - Final verification
await test.step('Step 8: Verify complete workflow', async () => {
  await programsPage.navigateToProgramsPage();
  const exists = await programsPage.verifyProgramExists(code);
  expect(exists).toBeTruthy();
});
```

---

## 📊 **Test Pyramid for Your System:**

```
        E2E Tests (5%)
        [6 tests - Critical workflows]
        Run: Nightly
        ↑
        
    Feature Tests (25%)
    [20-30 tests - Page-specific]
    Run: Before merge
    ↑
    
Smoke Tests (70%)
[50-60 tests - Quick checks]
Run: Every commit
```

---

## ✅ **Your E2E Test Plan:**

### **Week 1-2: Build Feature Tests**
Focus on fast tests first

### **Week 3: Add E2E Tests**
Create 3-5 critical E2E workflows

### **Week 4: Polish**
Refine and optimize

---

## 🎯 **Summary:**

| Test Type | File | When to Run | Count |
|-----------|------|-------------|-------|
| **Smoke** | programs-list.spec.ts | Every commit | 10-15 |
| **Feature** | programs-add.spec.ts | Before merge | 15-20 |
| **Feature** | programs-edit.spec.ts | Before merge | 15-20 |
| **E2E** | programs-e2e.spec.ts | Nightly | 5-10 |

**E2E tests are the icing on the cake - build feature tests first!** 🎂