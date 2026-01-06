import { Page } from "@playwright/test";
import fs from 'fs';
import path from 'path';
import { Paths } from '../constants/paths';
import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';
import { ExcelOutputType } from '../enums/Enum';


export class Basepage {

    readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async readJson(filename:string){
        const filepath = path.join(Paths.JSON_FOLDER_PATH,filename)
        const fileContent = fs.readFileSync(filepath,'utf-8');
        return JSON.parse(fileContent);   
    }

    async readCsv(filename:string){
        const filepath = path.join(Paths.CSV_FOLDER_PATH,filename)
        const csvData = fs.readFileSync(filepath,'utf-8');
        return parse(csvData,{columns:true, skip_empty_lines:true, bom: true})
    }

    async readExcel(filename:string,outputType: ExcelOutputType = ExcelOutputType.JSON){
       const filepath = path.join(Paths.EXCEL_FOLDER_PATH,filename);

       const workbook = XLSX.readFile(filepath);
       const sheets = workbook.SheetNames[0];
       const worksheet = workbook.Sheets[sheets];


       switch(outputType){
         case ExcelOutputType.CSV:
            const csvContent = XLSX.utils.sheet_to_csv(worksheet);
           return parse(csvContent,{columns:true,skip_empty_lines:true,bom:true}) ;
         case ExcelOutputType.JSON:
            default:
                return XLSX.utils.sheet_to_json(worksheet);
               
       }
        
    }
}