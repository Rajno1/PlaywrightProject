# Test Organization & Tagging Guide

## 📁 **File Structure - Answer: YES, Separate Files!**

```
tests/
└── programs/
    ├── programs-list.spec.ts      ← TC-PP-001 to TC-PP-010
    ├── programs-add.spec.ts       ← TC-AP-001 to TC-AP-020
    ├── programs-edit.spec.ts      ← TC-EP-001 to TC-EP-020
    └── programs-e2e.spec.ts       ← End-to-end workflows
```

**Why separate files?**
- ✅ Each file is ~300-500 lines (manageable)
- ✅ Easy to find tests
- ✅ Can run specific features
- ✅ Team can work on different files
- ✅ CI/CD can run in parallel

---

## 🏷️ **Tagging Strategy**

### **Tag Levels:**

```typescript
test.describe('Programs List Page @programs @list', () => {
  //                              ^^^^^^^^  ^^^^^
  //                              Module    Feature
  
  test('TC-PP-001: View Page @smoke @regression', async () => {
    //                        ^^^^^^  ^^^^^^^^^^
    //                        Priority  Suite
  });
});
```

### **Module Tags:**
```typescript
@programs       // All program tests
@grants         // All grant tests
@applications   // All application tests
@users          // All user/registration tests
```

### **Feature Tags:**
```typescript
@list           // List/view tests
@add            // Create/add tests
@edit           // Edit/update tests
@delete         // Delete tests
@search         // Search tests
@filter         // Filter tests
```

### **Priority Tags:**
```typescript
@smoke          // Critical tests (run first)
@regression     // Full test suite
@negative       // Error/validation tests
@edge           // Edge case tests
```

### **Custom Tags:**
```typescript
@wip            // Work in progress
@skip           // Skip this test
@slow           // Tests that take >30 seconds
@e2e            // End-to-end workflows
```

---

## 🚀 **How to Run Tests with Tags**

### **Run by File:**
```bash
# Run all programs list tests
npx playwright test programs-list.spec.ts

# Run all programs add tests
npx playwright test programs-add.spec.ts

# Run all programs tests
npx playwright test tests/programs/
```

### **Run by Tag:**
```bash
# Run ONLY smoke tests (all files)
npx playwright test --grep @smoke

# Run ONLY regression tests
npx playwright test --grep @regression

# Run ONLY negative tests
npx playwright test --grep @negative

# Run all programs module tests
npx playwright test --grep @programs

# Run only programs list tests
npx playwright test --grep "@programs.*@list"
```

### **Combine Tags (AND):**
```bash
# Run smoke tests for programs module
npx playwright test --grep "@programs.*@smoke"

# Run regression tests for add feature
npx playwright test --grep "@add.*@regression"
```

### **Exclude Tags:**
```bash
# Run all tests EXCEPT work in progress
npx playwright test --grep-invert @wip

# Run all tests EXCEPT slow tests
npx playwright test --grep-invert @slow
```

### **Run Specific Test:**
```bash
# By test ID
npx playwright test -g "TC-PP-001"

# By test name
npx playwright test -g "View Programs Page"
```

### **Run with UI Mode:**
```bash
# Best for development
npx playwright test --ui

# Filter by tag in UI
npx playwright test --grep @smoke --ui
```

### **Run in Headed Mode (See Browser):**
```bash
npx playwright test programs-list.spec.ts --headed
```

---

## 📊 **Tag Usage Matrix**

### **Typical Test Tags:**

| Test Type | Tags | Run Command |
|-----------|------|-------------|
| Critical path | `@smoke @regression` | `--grep @smoke` |
| Happy path | `@regression` | `--grep @regression` |
| Validations | `@negative @regression` | `--grep @negative` |
| Edge cases | `@edge @regression` | `--grep @edge` |
| Full workflow | `@e2e @regression` | `--grep @e2e` |

---

## 🎯 **Your Test Scenarios - Organized:**

### **File 1: programs-list.spec.ts**
```typescript
test.describe('Programs List Page @programs @list', () => {
  
  test('TC-PP-001: View Programs Page @smoke @regression', async () => {
    // Your scenario:
    // - User is logged in as staff
    // - User navigates to programs page
    // - Page title should display as "Programs"
    // - "Add New Program" button is visible
    // - Filter options (Active, Inactive, All) are visible
  });

  test('TC-PP-002: Add New Program Navigation @smoke @regression', async () => {
    // Your scenario:
    // - User is on Programs list page
    // - User clicks "Add New Program" button
    // - User is navigated to Add Program page
    // - Page title shows "Add Program"
  });

  test('TC-PP-003: Filter Active Programs @regression', async () => { });
  test('TC-PP-004: Filter Inactive Programs @regression', async () => { });
  test('TC-PP-005: Search by Program Code @regression', async () => { });
  test('TC-PP-006: Search by Program Name @regression', async () => { });
  test('TC-PP-007: Pagination Next @regression', async () => { });
  test('TC-PP-008: Edit Program Navigation @regression', async () => { });
  
  // Negative tests
  test('TC-PP-NEG-001: Search Non-Existent Code @negative @regression', async () => { });
});
```

### **File 2: programs-add.spec.ts**
```typescript
test.describe('Add Program Page @programs @add', () => {
  
  test('TC-AP-001: Create Program All Fields @smoke @regression', async () => { });
  test('TC-AP-002: Create Program Required Fields @smoke @regression', async () => { });
  test('TC-AP-003: Verify Add Page Elements @smoke', async () => { });
  test('TC-AP-004: Fill Individual Fields @regression', async () => { });
  test('TC-AP-005: Cancel Program Creation @regression', async () => { });
  
  // Negative tests
  test('TC-AP-NEG-001: Submit Without Required Fields @negative @regression', async () => { });
  test('TC-AP-NEG-002: Invalid Budget Amount @negative @regression', async () => { });
  test('TC-AP-NEG-003: End Date Before Start Date @negative @regression', async () => { });
});
```

### **File 3: programs-edit.spec.ts**
```typescript
test.describe('Edit Program Page @programs @edit', () => {
  
  test('TC-EP-001: View Edit Page After Creation @smoke @regression', async () => { });
  test('TC-EP-002: Navigate Between Tabs @regression', async () => { });
  test('TC-EP-003: Add Contact Information @regression', async () => { });
  test('TC-EP-004: Upload Document @regression', async () => { });
  test('TC-EP-005: Configure Required Tabs @regression', async () => { });
});
```

---

## 📝 **Test Naming Convention**

```typescript
// Format:
test('TC-[MODULE]-[NUMBER]: [Description] @tags', async () => { });

// Examples:
test('TC-PP-001: View Programs Page @smoke @regression', async () => { });
test('TC-AP-001: Create Program @smoke @regression', async () => { });
test('TC-EP-001: Edit Program @smoke @regression', async () => { });
test('TC-AP-NEG-001: Submit Without Fields @negative @regression', async () => { });
test('TC-AP-EDGE-001: Max Length Code @edge @regression', async () => { });

// Module Codes:
// PP = Programs Page (List)
// AP = Add Program
// EP = Edit Program
// GP = Grants Page
// AG = Add Grant
// UP = Users/Registration
```

---

## 🎯 **CI/CD Integration**

### **package.json scripts:**
```json
{
  "scripts": {
    "test": "playwright test",
    "test:smoke": "playwright test --grep @smoke",
    "test:regression": "playwright test --grep @regression",
    "test:programs": "playwright test --grep @programs",
    "test:negative": "playwright test --grep @negative",
    "test:ui": "playwright test --ui",
    "test:headed": "playwright test --headed"
  }
}
```

### **GitHub Actions workflow:**
```yaml
# .github/workflows/tests.yml
jobs:
  smoke-tests:
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:smoke
  
  regression-tests:
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:regression
```

---

## ✅ **Best Practices**

### **1. Tag Every Test:**
```typescript
// ❌ BAD - No tags
test('View page', async () => { });

// ✅ GOOD - Has tags
test('TC-PP-001: View page @smoke @regression', async () => { });
```

### **2. Use Multiple Tags:**
```typescript
// Every test should have at least 2 tags:
// 1. Module/Feature tag (@programs @list)
// 2. Priority tag (@smoke or @regression or @negative)

test('TC-PP-001: View page @programs @list @smoke @regression', async () => { });
```

### **3. Group Related Tests:**
```typescript
test.describe('Filter Tests @filter', () => {
  test('TC-PP-003: Active filter @regression', async () => { });
  test('TC-PP-004: Inactive filter @regression', async () => { });
  test('TC-PP-005: All filter @regression', async () => { });
});
```

### **4. Use Consistent Test IDs:**
```typescript
// File: programs-list.spec.ts
TC-PP-001, TC-PP-002, TC-PP-003...  ✅

// File: programs-add.spec.ts
TC-AP-001, TC-AP-002, TC-AP-003...  ✅

// Don't mix:
TC-PP-001, TC-AP-002, TC-PP-003...  ❌
```

---

## 🚀 **Your Action Plan:**

### **Step 1: Create test files** (This week)
```bash
tests/programs/
├── programs-list.spec.ts    ← Start here (5-10 tests)
├── programs-add.spec.ts     ← Week 2 (10-15 tests)
└── programs-edit.spec.ts    ← Week 3 (10-15 tests)
```

### **Step 2: Tag appropriately**
- All tests get module tags: `@programs @list`
- Critical tests get: `@smoke`
- All tests get: `@regression`
- Error tests get: `@negative`

### **Step 3: Run incrementally**
```bash
# Run what you've written so far
npx playwright test programs-list.spec.ts --ui

# Run smoke tests
npx playwright test --grep @smoke
```

---

## 📊 **Summary - Your Questions Answered:**

| Question | Answer |
|----------|--------|
| **Separate spec files?** | ✅ YES - One file per page/feature |
| **Use tags?** | ✅ YES - Multiple tags per test |
| **How to run tags?** | `npx playwright test --grep @smoke` |
| **Your TC-PP-001 scenario?** | ✅ Perfect! Already implemented |
| **Your TC-PP-002 scenario?** | ✅ Perfect! Already implemented |

**You have everything you need to start writing tests!** 🎉