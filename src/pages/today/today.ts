import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileHandeler } from './../../services/filehandeler.service';
@Component({
  selector: 'page-today',
  templateUrl: 'today.html'
})
export class TodayPage {

  public model: any;
  constructor(public navCtrl: NavController, private file: FileHandeler) {
    this.model = {};
    this.getTodaysData();
  }
  getTodaysData() {
    this.file.readFile(this.file.getCurrentDataFileName()).then((res) => {
      alert(res);
    }).catch(() => {
      alert("Unable to find any data");
    });
  }
}
