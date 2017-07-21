import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import { FileHandeler } from './../../services/filehandeler.service';
import { Common } from './../../services/common.service';
import * as $ from 'jquery';
@Component({
  selector: 'page-today',
  templateUrl: 'today.html'
})
export class TodayPage  implements AfterViewInit {

  public model: any;
  constructor(public navCtrl: NavController, private file: FileHandeler, private common: Common) {
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
      this.model.dataArray = this.common.prepareArrayFromRawData(res);
    }).catch(() => {
      this.model.dataArray = [];
      $("h4").show();
      $("table").hide();
    });
  }
}
