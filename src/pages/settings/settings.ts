import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileHandeler } from './../../services/filehandeler.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  public model: any;
  constructor(public navCtrl: NavController, private file: FileHandeler) {
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
  
}
