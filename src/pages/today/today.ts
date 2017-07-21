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
  getTodaysData() {
    this.model.dataArray = [];
    this.file.readFile(this.file.getCurrentDataFileName()).then((res) => {
      $("h4").hide();
      $("table").show();
      let data = JSON.parse(res);
      let keys = Object.keys(data);
      for(let index in keys) {
        this.model.dataArray.push(data[keys[index]]);
      }
    }).catch(() => {
      this.model.dataArray = [];
      $("h4").show();
      $("table").hide();
    });
  }
}
