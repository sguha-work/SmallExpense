import { FileHandeler } from './filehandeler.service';
import { Common } from './common.service';
import {Injectable} from '@angular/core';

@Injectable()
export class Expense {
    constructor(private file: FileHandeler, private common: Common) {

    }

    public getExpensesByDate(date: string, requiredRaw?: boolean): Promise<any> {
        let expenseFileName: string;
        expenseFileName = date;
        return new Promise((resolve, reject) => {
            this.file.readFile(expenseFileName).then((res) => {
                if(requiredRaw) {
                    resolve(res);    
                }
                let dataArray = this.common.prepareArrayFromRawData(res);
                resolve(dataArray);
            }).catch(() => {
                reject([]);
            });
        });
    }

    public getTotalExpenseByDate(date: string): Promise<any> {
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
    }
    
    public getTodaysTotalExpense(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getTotalExpenseByDate(this.common.getTodaysDate()).then((response) => {
                resolve(response);
            }, () => {
                reject(0);
            });
        });
    }

    public storeExpense(fileName: string, data: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.file.updateFile(fileName, data).then(() => {
                resolve();
            }, () => {
                reject();
            });
        });
    }

    public deleteEntryFromToday(keyId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getExpensesByDate(this.common.getTodaysDate(), true).then((response) => {
                let data = JSON.parse(response);
                let keys = Object.keys(data);
                let newData = {};
                for(let index in keys) {
                    if(keys[index].toString() !== keyId.toString()) {
                        newData[keys[index]] = data[keys[index]];
                    }                    
                }
                this.storeExpense(this.common.getTodaysDate(), JSON.stringify(newData)).then(() => {
                    // data file updated
                    resolve();
                }, () => {
                    // unable to update data file
                    reject();
                });
            }, () => {
                // unable to get data
                reject();
            });
        });
        
    }

 
}