import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileHandeler } from './../../services/filehandeler.service';
import { Common } from './../../services/common.service';
import { Alert } from './../../services/alert.service';
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  public model: any;
  constructor(public navCtrl: NavController, private file: FileHandeler, private common: Common, private alert: Alert) {
    this.model = {};
  }

  removeAllLocalFilesFolders(): void{
    if(confirm("")) {
      this.file.removeFolderContents().then(() => {
        alert(" Folder deleted successfully");
        this.file.createDataDirectory();
      }, () => {
        alert("Folder deletion failed");
      });
    }
    
  }

  setAlert(): void {
    if(this.model.alertAmount){
      let data: string;
      data = this.common.prepareAlertFileData(this.model.alertAmount);
      this.alert.setAlertData(data).then(() => {
        alert("Successfully set the alert of "+data+" rupees");
      }, () => {
        alert("Setting alert failed");
      });
      
    } else {
      alert("Provide amount and then press the button");
    }
  }
  
}
