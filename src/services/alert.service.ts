import { FileHandeler } from './filehandeler.service';
import {Injectable} from '@angular/core';
const alertFileName = "alert";
@Injectable()
export class Alert {
    constructor(private file: FileHandeler) {

    }

    public setAlertData(data: string): Promise<any> {
        return new Promise((resolve, reject) => {

        });
    }
}