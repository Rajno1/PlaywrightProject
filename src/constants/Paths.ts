import path from 'path'; //path is a built-in Node.js module

export class Paths{
    static readonly JSON_FOLDER_PATH = path.join(process.cwd(),'testData/json');
    static readonly CSV_FOLDER_PATH = path.join(process.cwd(),'testData/csv');
    static readonly EXCEL_FOLDER_PATH = path.join(process.cwd(),'testData/excel');
}
