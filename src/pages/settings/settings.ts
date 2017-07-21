import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileHandeler } from './../../services/filehandeler.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, private file: FileHandeler) {
    
  }

  removeAllLocalFilesFolders(): void{
    this.file.removeFolderContents().then(() => {
      alert(" Folder deleted successfully");
    }, () => {});
  }
  
}
