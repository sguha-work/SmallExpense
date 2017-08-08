import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
import {FileHandeler} from './filehandeler.service';
@Injectable()
export class ImportExport {
    
    private emailId: string;
    
    constructor(public http: Http, private file: FileHandeler, private email: EmailComposer) {
        this.emailId = "sguha1988.life@gmail.com";
    }

    private sendDataAsEmail(data: string, email?: string) {
        let emailObject = {
            to: (typeof email === "undefined")?this.emailId:email,
            cc: '',
            bcc: [],
            attachments: [
            ],
            subject: 'Backup data',
            body: data,
            isHtml: true
            };

            // Send a text message using default options
            this.email.open(emailObject);
    }

    private backUpToGoogleDrive(data: string, fileName?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.sendDataAsEmail(data);    
            resolve(data);
        });
    }

    public export(): Promise<any> {
        let exportObject: any;
        let data: any;
        
        exportObject = {};
        data = {};

        return new Promise((resolve, reject) => {
            this.file.getFolderContents().then((fileArray) => {
                if(typeof fileArray === "undefined" || fileArray.length === 0) {
                    reject();
                } else {
                    let promiseArray = [];
                    for(let index=0; index<fileArray.length; index++) {
                        promiseArray.push(new Promise((res, rej) => {
                            this.file.readFileContent(fileArray[index].name).then((dataFromFile) => {
                                data[fileArray[index].name] = JSON.parse(dataFromFile);
                                res();
                            }, () => {
                                data[fileArray[index].name] = {};
                                res();
                            });
                        }));
                    }
                    Promise.all(promiseArray).then(() => {
                        exportObject.data = data;

                        // getting config data
                        this.file.getFolderContents("config")
                        // backup logic to google drive goes here
                        this.backUpToGoogleDrive(JSON.stringify(exportObject)).then((response) => {
                            resolve(response);
                        }, () => {
                            reject();
                        });
                    }, () => {});
                }
                
            }, () => {
                reject();
            });
        });
        
    }
}