import { test, expect } from '../src/fixtures/authFixtures';
import { DataReader } from '../src/utils/dataReader';
import { ExcelOutputType } from '../src/enums/Enums';
import { Logger } from '../src/utils/logger';
import { TestData, CsvData } from '../src/types';

/**
 * Data-Driven Testing Examples
 */
test.describe('Data-Driven Tests', () => {

  test('Read and validate JSON test data', async () => {
    Logger.testStart('Read and validate JSON test data');

    await test.step('Read JSON data', async () => {
      const jsonData = await DataReader.readJson<TestData[]>('data.json');
      
      Logger.info(`Total records in JSON: ${jsonData.length}`);
      
      for (const record of jsonData) {
        Logger.info(`Username: ${record.username}, Email: ${record.email}`);
        expect(record.username).toBeTruthy();
        expect(record.password).toBeTruthy();
        expect(record.email).toContain('@');
      }
    });

    Logger.testEnd('Read and validate JSON test data');
  });

  test('Read and validate CSV test data', async () => {
    Logger.testStart('Read and validate CSV test data');

    await test.step('Read CSV data', async () => {
      const csvData = await DataReader.readCsv<CsvData>('data.csv');
      
      Logger.info(`Total records in CSV: ${csvData.length}`);
      
      for (const record of csvData) {
        Logger.info(`Name: ${record.firstname} ${record.lastname}, Username: ${record.username}`);
        expect(record.firstname).toBeTruthy();
        expect(record.lastname).toBeTruthy();
        expect(record.username).toBeTruthy();
        expect(record.password).toBeTruthy();
      }
    });

    Logger.testEnd('Read and validate CSV test data');
  });

  test('Read Excel data as JSON', async () => {
    Logger.testStart('Read Excel data as JSON');

    await test.step('Read Excel as JSON', async () => {
      const excelData = await DataReader.readExcel('data.xlsx', ExcelOutputType.JSON);
      
      Logger.info(`Total records in Excel: ${excelData.length}`);
      
      for (const record of excelData) {
        Logger.info(`Record: ${JSON.stringify(record)}`);
        expect(record).toBeTruthy();
      }
    });

    Logger.testEnd('Read Excel data as JSON');
  });

  test('Read Excel data as CSV', async () => {
    Logger.testStart('Read Excel data as CSV');

    await test.step('Read Excel as CSV', async () => {
      const excelData = await DataReader.readExcel<CsvData>('data.xlsx', ExcelOutputType.CSV);
      
      Logger.info(`Total records in Excel (CSV format): ${excelData.length}`);
      
      for (const record of excelData) {
        Logger.info(`Name: ${record.firstname} ${record.lastname}`);
        expect(record.firstname).toBeTruthy();
      }
    });

    Logger.testEnd('Read Excel data as CSV');
  });

  test('Read all sheets from Excel', async () => {
    Logger.testStart('Read all sheets from Excel');

    await test.step('Read all Excel sheets', async () => {
      const allSheets = await DataReader.readExcelAllSheets('data.xlsx');
      
      Logger.info(`Total sheets: ${Object.keys(allSheets).length}`);
      
      for (const [sheetName, data] of Object.entries(allSheets)) {
        Logger.info(`Sheet: ${sheetName}, Records: ${data.length}`);
        expect(data).toBeTruthy();
        expect(Array.isArray(data)).toBeTruthy();
      }
    });

    Logger.testEnd('Read all sheets from Excel');
  });
});

/**
 * Parameterized Test Example
 */
const testUsers: TestData[] = [
  { username: 'user1', password: 'pass1', email: 'user1@test.com' },
  { username: 'user2', password: 'pass2', email: 'user2@test.com' },
  { username: 'user3', password: 'pass3', email: 'user3@test.com' },
];

test.describe('Parameterized Tests', () => {
  for (const user of testUsers) {
    test(`Validate user: ${user.username}`, async () => {
      Logger.testStart(`Validate user: ${user.username}`);

      await test.step('Validate user data', async () => {
        Logger.info(`Testing user: ${user.username}`);
        expect(user.username).toBeTruthy();
        expect(user.password).toBeTruthy();
        expect(user.email).toContain('@');
      });

      Logger.testEnd(`Validate user: ${user.username}`);
    });
  }
});
