import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import { FileHandeler } from './../../services/filehandeler.service';
import * as $ from 'jquery';
@Component({
  selector: 'page-today',
  templateUrl: 'today.html'
})
export class TodayPage  implements AfterViewInit {

  public model: any;
  constructor(public navCtrl: NavController, private file: FileHandeler) {
    this.model = {};
    this.model.date = this.file.getCurrentDataFileName();
    
  }
  ngAfterViewInit() {
    this.getTodaysData();
  }
  convertTimeStampToTime(timeStamp: string) {
    var date = new Date(parseInt(timeStamp));
    // Hours part from the timestamp
    var hours = date.getHours();
    let hoursString: string;
    if(hours>12) {
      hours = hours-12;
      hoursString =" PM"
    } else {
      hoursString =" AM"
    }
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + hoursString;
    return formattedTime;
  }
  getTodaysData() {
    this.model.dataArray = [];
    this.file.readFile(this.file.getCurrentDataFileName()).then((res) => {
      $("h4").hide();
      $("table").show();
      let data = JSON.parse(res);
      let keys = Object.keys(data);
      for(let index in keys) {
        data[keys[index]].time = this.convertTimeStampToTime(data[keys[index]].time);
        this.model.dataArray.push(data[keys[index]]);
      }
    }).catch(() => {
      this.model.dataArray = [];
      $("h4").show();
      $("table").hide();
    });
  }
}
