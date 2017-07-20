import { File } from '@ionic-native/file';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FileHandeler {
    constructor(private file: File) {
        this.checkAndCreateDirectory()
    }
    private checkAndCreateDirectory() {
        this.file.createDir(this.file.dataDirectory, "SmallExpenseTracker", false).then(()=>{},()=>{
            alert("Initial directory building failed");
        });
    }
    public writeFile(fileName: string, data: string, directoryName?: string): Promise<any> {
        let promise;
        if(typeof directoryName === "undefined") {
            promise = this.file.writeFile(this.file.dataDirectory+"/SmallExpenseTracker", fileName, data);
            return promise;
        } else {
            return this.file.createDir(this.file.dataDirectory, directoryName, false).then(()=>{
                promise = this.file.writeFile(this.file.dataDirectory+"/SmallExpenseTracker"+directoryName, fileName, data);
                return promise;
            }, ()=>{
                alert("Directory building failed");
            });
            
        }
    }
}