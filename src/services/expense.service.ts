import { FileHandeler } from './filehandeler.service';
import { Common } from './common.service';
import {Injectable} from '@angular/core';

@Injectable()
export class Expense {
    constructor(private file: FileHandeler, private common: Common) {

    }

    public getExpenseByDate(date: string): Promise<any> {
        let expense: number;
        let expenseFileName: string;
        expenseFileName = date;
        return new Promise((resolve, reject) => {
            this.file.readFile(expenseFileName).then((res) => {
                let dataArray = this.common.prepareArrayFromRawData(res);
                expense = 0;
                for(let index in dataArray) {
                    expense += parseInt(dataArray[index].amount);
                }
                resolve(expense);
            }).catch(() => {
                reject(0);
            });
        });
        // return this.file.readFile(expenseFileName).then((res) => {

        // }).catch(() => {
        //     expense
        // });
        
    }
    public getTodaysExpense(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getExpenseByDate(this.common.getTodaysDate()).then((response) => {
                resolve(response);
            }, () => {
                reject(0);
            });
        });
    }
}