import { File } from '@ionic-native/file';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';

const rootFolderName = "SmallExpenseTracker";
const dataFolderName = "data";
const configFolderName = "config";

@Injectable()
export class FileHandeler {
    constructor(private file: File) {
        this.checkAndCreateDirectory()
    }
    private checkAndCreateDirectory() {
        this.file.checkDir(this.file.dataDirectory, rootFolderName).then((res) => {
            if(!res) {
                this.file.createDir(this.file.dataDirectory, rootFolderName, false).then(()=>{
                    this.file.createDir(this.file.dataDirectory+"/"+rootFolderName, dataFolderName , false);
                    this.file.createDir(this.file.dataDirectory+"/"+rootFolderName, configFolderName , false);
                },()=>{
                    alert("Initial directory building failed");
                });
            }        
        }, () => {});
        
    }

    private checkIfDirectoryExists(directoryPath: string, directoryName: string): Promise<any> {
        return this.file.checkDir(directoryPath, directoryName);
    }

    private writeData(filePath: string, fileName: string, data: string): Promise<any> {
        return this.file.writeFile(filePath, fileName, data);
    }

    public writeFile(fileName: string, data: string, type: string, directoryName?: string): Promise<any> {
        if(type === "data") {
            return this.checkIfDirectoryExists(this.file.dataDirectory+"/"+rootFolderName+"/"+dataFolderName,directoryName).then((res) => {
                if(!res) {
                    return this.file.createDir(this.file.dataDirectory+"/"+rootFolderName+"/"+dataFolderName, directoryName, false).then(() => {
                        return this.writeData(this.file.dataDirectory+"/"+rootFolderName+"/"+dataFolderName, fileName, data);                        
                    }, () => {});
                } else {
                    return this.writeData(this.file.dataDirectory+"/"+rootFolderName+"/"+dataFolderName, fileName, data);
                }
            }, () => {});
                
                
        }
        
    }
}