import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import { FileHandeler } from './../../services/filehandeler.service';
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
  constructor(public navCtrl: NavController, private file: FileHandeler, private common: Common, private expense: Expense, private datePicker: DatePicker) {
    this.model = {};
    this.model.date = this.file.getCurrentDataFileName();
    
  }
  ngAfterViewInit() {
    this.getTotalExpenseOfToday();
    this.getTodaysData();
  }
  private getTodaysData() {
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
  private getTotalExpenseOfToday() {
    this.expense.getTodaysTotalExpense().then((reponse) => {
      this.model.todaysTotalExpense = reponse;
    }, () => {
      this.model.todaysTotalExpense = 0;
    });
  }
  displayDatePicker(): void {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      doneButtonLabel: "",
      cancelButtonLabel: "",
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
    }).then((date) => {
      this.dateSelected(date);
    });
  }
  dateSelected(date: any) {
    alert(date);
  }
}