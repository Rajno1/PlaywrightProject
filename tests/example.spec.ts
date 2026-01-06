import { ExcelOutputType } from '../src/enums/Enum';
import { test , expect } from '../src/fixture/fixture';

test('My first test', async()=>{
   test.step('First test step', async()=>{
         console.log('Welcome to my first test.....')
   })
})

test('Parameterization', async({pages})=>{

   test.step('Reading data from json', async()=>{
      // calling readJson method from Basepage file 
      const jsonContent:any = await pages.basepage.readJson('data.json');
      for (const {username,password,email} of jsonContent) {
         console.log(`user name is : ${username}`);
         console.log(`password is : ${password}`);
         console.log(`email is : ${email}`);
      }
   })


   test.step('Reading data from CSV',async()=>{

         const csvContent:any = await pages.basepage.readCsv('data.csv');
         for (const record of csvContent) {
            console.log(`fist name is : ${record.firstname}`);
            console.log(`last name is : ${record.lastname}`);
            console.log(`username is : ${record.username}`);
            console.log(`password is : ${record.password}`);
         }
   })

   test.step('Reading data from excel',async()=>{

      console.log(' ***  Converting sheet to JSON ***')
      const jsonData:any = await pages.basepage.readExcel('data.xlsx');
       for (const {username,password,email} of jsonData) {
         console.log(`user name is : ${username}`);
         console.log(`password is : ${password}`);
         console.log(`email is : ${email}`);
      }

      console.log(' ***  Converting sheet to CSV ***')
      const csvData:any = await pages.basepage.readExcel('data.xlsx',ExcelOutputType.CSV);
         for (const record of csvData) {
            console.log(`fist name is : ${record.firstname}`);
            console.log(`last name is : ${record.lastname}`);
            console.log(`username is : ${record.username}`);
            console.log(`password is : ${record.password}`);
         }

   })
})