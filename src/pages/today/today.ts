import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import { FileHandeler } from './../../services/filehandeler.service';
import { Common } from './../../services/common.service';
import {Expense} from './../../services/expense.service';
import * as $ from 'jquery';
@Component({
  selector: 'page-today',
  templateUrl: 'today.html'
})
export class TodayPage  implements AfterViewInit {

  public model: any;
  constructor(public navCtrl: NavController, private file: FileHandeler, private common: Common, private expense: Expense) {
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
      if(this.model.dataArray.length === 0) {
        $("h4").show();
        $("table").hide();
      }
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
  deleteEntry(event: any, keyId: string, time: string) {
    if(confirm("Are you sure to delete entry of "+time+"?")) {
      this.expense.deleteEntryFromToday(keyId).then(() => {
        alert("Entry deleted. Close and start the app to get effect.");
        this.getTodaysData();
      }, () => {
        alert("Failed to delete entry");
      });
    }
  }
}
