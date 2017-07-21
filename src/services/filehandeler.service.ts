import { File } from '@ionic-native/file';
import {Injectable} from '@angular/core';

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
            alert("Directory exists");        
        }).catch(() => {
            this.file.createDir(this.file.dataDirectory, rootFolderName, false).then(()=>{
                this.file.createDir(this.file.dataDirectory+"/"+rootFolderName, dataFolderName , false).then(()=>{
                    alert("data directory created");
                }).catch(() => {
                    alert("Initial data directory building failed");    
                });
                this.file.createDir(this.file.dataDirectory+"/"+rootFolderName, configFolderName , false).then(()=>{
                    alert(" config directory created");
                }).catch(() => {
                    alert("Initial config directory building failed");    
                });
            },()=>{
                alert("Initial directory building failed");
            });
        });
        
    }

    private checkIfDirectoryExists(directoryPath: string, directoryName: string): Promise<any> {
        return this.file.checkDir(directoryPath, directoryName);
    }

    private writeData(filePath: string, fileName: string, data: string): Promise<any> {
        return this.file.writeFile(filePath, fileName, data).then(() => {return true;}).catch(() => {return false;});
    }

    public getCurrentDataFileName(): string {
        let today = new Date();
        let dateString: string;
        dateString = (today.getDate()).toString() + '-' + (today.getMonth()+1).toString() + '-' + today.getFullYear().toString();
        return dateString;
    }

    public writeFile(fileName: string, data: string, type: string, directoryName?: string): Promise<any> {
        if(type === "data") {
                return this.writeData(this.file.dataDirectory+"/"+rootFolderName+"/"+dataFolderName, fileName, data).then(()=>{
                    alert("writing done "+fileName);
                    return true;
                }).catch(()=>{
                    alert("unable to write file "+fileName);
                    return false;
                });
                
        }
        
    }
    public removeFolderContents(folderName?: string): Promise<any> {
        if(typeof folderName === "undefined") {
            folderName = rootFolderName;
        }
        return this.file.removeRecursively(this.file.dataDirectory, folderName);
    }

    public getFolderContents(folderName?: string): Promise<any>{
        if(typeof folderName === "undefined") {
            folderName = "data";
        }
        return this.file.resolveDirectoryUrl(this.file.dataDirectory+"/"+rootFolderName+"/"+dataFolderName).then((res) => {
            return res.getDirectory(folderName, {create:false});
        }).catch(() => {
            return false;
        });
        
    }
    public readFile(fileName: string): Promise<any> {
        return this.file.readAsText(this.file.dataDirectory+"/"+rootFolderName+"/"+dataFolderName, fileName);
    }
}