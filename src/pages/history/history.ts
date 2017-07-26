import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import { Common } from './../../services/common.service';
import {Expense} from './../../services/expense.service';
import { DatePicker } from '@ionic-native/date-picker';
import * as $ from 'jquery';
@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage  implements AfterViewInit {

  public model: any;
  constructor(public navCtrl: NavController, private common: Common, private expense: Expense, private datePicker: DatePicker) {
    this.model = {};
    this.model.data = {};
    
  }
  ngAfterViewInit() {
    $("#div_data").hide();
    //this.getTotalExpenseOfToday();
    //this.getTodaysData();
  }
  private getDataByDate(date: string) {
    // this.model.dataArray = [];
    // this.file.readFile(this.file.getCurrentDataFileName()).then((res) => {
    //   $("h4").hide();
    //   $("table").show();
    //   this.model.dataArray = this.common.prepareArrayFromRawData(res);
    // }).catch(() => {
    //   this.model.dataArray = [];
    //   $("h4").show();
    //   $("table").hide();
    // });
    this.model.dataArray = [];
    this.expense.getExpensesByDate(date).then((response) => {
      this.model.dataArray = response;
      $("#div_data").show();
      $("h4").hide();
      $("table").show();
    }, () => {
      this.model.dataArray = [];
      $("h4").show();
      $("table").hide();
    });
  }
  
  displayDatePicker(): void {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      doneButtonLabel: "OK",
      cancelButtonLabel: "Cancel",
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
    }).then((date) => {
      this.dateSelected(date);
    });
  }
  public dateSelected(date: any) {
    let supportedDate = this.common.getSupprtedDateFromDateString(date);
    this.model.selectedDate = supportedDate;
    this.getDataByDate(supportedDate);
  }
}
