import path from 'path'; //path is a built-in Node.js module

/**
 * Path Constants
 * Centralized path management for test data and resources
 */
export class Paths {
  // Base directories
  static readonly PROJECT_ROOT = process.cwd();
  static readonly TEST_DATA_ROOT = path.join(this.PROJECT_ROOT, 'testData');
  
  // Test data folders
  static readonly JSON_FOLDER_PATH = path.join(this.TEST_DATA_ROOT, 'json');
  static readonly CSV_FOLDER_PATH = path.join(this.TEST_DATA_ROOT, 'csv');
  static readonly EXCEL_FOLDER_PATH = path.join(this.TEST_DATA_ROOT, 'excel');
  
  // Auth folder
  static readonly AUTH_FOLDER_PATH = path.join(this.PROJECT_ROOT, '.auth');
  
  // Auth files
  static readonly STAFF_AUTH_FILE = path.join(this.AUTH_FOLDER_PATH, 'staffLogin.json');
  static readonly ORG_AUTH_FILE = path.join(this.AUTH_FOLDER_PATH, 'orgLogin.json');
  static readonly INDIVIDUAL_AUTH_FILE = path.join(this.AUTH_FOLDER_PATH, 'individualLogin.json');
  
  // Report folders
  static readonly TEST_RESULTS = path.join(this.PROJECT_ROOT, 'test-results');
  static readonly PLAYWRIGHT_REPORT = path.join(this.PROJECT_ROOT, 'playwright-report');
  static readonly ALLURE_RESULTS = path.join(this.PROJECT_ROOT, 'allure-results');
  static readonly ALLURE_REPORT = path.join(this.PROJECT_ROOT, 'allure-report');
}
