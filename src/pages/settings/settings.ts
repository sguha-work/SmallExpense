import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileHandeler } from './../../services/filehandeler.service';
import { Common } from './../../services/common.service';
import { Alert } from './../../services/alert.service';
import { AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements AfterViewInit {
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
      data = this.model.alertAmount;
      this.alert.setAlertData(data).then(() => {
        alert("Successfully set the alert of "+data+" rupees.  Close and reopen the app to get effect");
        this.checkIfAlertFileExistsAndMadeUICHanges();
      }, () => {
        alert("Setting alert failed");
      });
      
    } else {
      alert("Provide amount and then press the button");
    }
  }

  ngAfterViewInit() {
    this.checkIfAlertFileExistsAndMadeUICHanges()  
  }

  checkIfAlertFileExistsAndMadeUICHanges(): void {
    this.alert.checkIfAlertFileExists().then((response) => {
      // alert is set previously
      this.model.alertAmount = JSON.parse(response).alertAmount;
      $("#btn_clearAlert").show();
    }, () => {
      // alert is not set
      $("#btn_clearAlert").hide();
    });
  }

  clearAlert() {
    if(confirm("Do you really want to delete the alert?")) {
      this.alert.clearAlert().then(() => {
        alert("Alert removed. Close and reopen the app to get effect");
        this.checkIfAlertFileExistsAndMadeUICHanges();
      }, () => {
        alert("Alert cannot be removed due to IO error");
      });
    }
  }
  
}
