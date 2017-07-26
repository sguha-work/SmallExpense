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
  }
  ngAfterViewInit() {
    $("#div_data").hide();
  }

  private populateTotalExpenseByDate(date: string): void {
    this.expense.getTotalExpenseByDate(date).then((totalExpense) => {
      this.model.totalExpense = totalExpense;
    }, () => {
      this.model.totalExpense = 0;
    });
  }
  private getDataByDate(date: string) {
    this.model.dataArray = [];
    this.expense.getExpensesByDate(date).then((response) => {
      this.model.dataArray = response;
      $("#div_data").show();
      $("h4").hide();
      $("table").show();
      $("#p_totalExpense").show();
      this.populateTotalExpenseByDate(date);
    }, () => {
      this.model.dataArray = [];
      $("h4").show();
      $("table").hide();
      $("#p_totalExpense").hide();
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
  public dateSelected(date: any): void {
    let supportedDate = this.common.getSupprtedDateFromDateString(date);
    this.model.selectedDate = supportedDate;
    this.getDataByDate(supportedDate);
  }
}
