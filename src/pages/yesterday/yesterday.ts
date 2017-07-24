import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
//import { FileHandeler } from './../../services/filehandeler.service';
import { Common } from './../../services/common.service';
import {Expense} from './../../services/expense.service';
import * as $ from 'jquery';
@Component({
  selector: 'page-yesterday',
  templateUrl: 'yesterday.html'
})
export class YesterdayPage  implements AfterViewInit {

  public model: any;
  constructor(public navCtrl: NavController, private common: Common, private expense: Expense) {
    this.model = {};
    this.model.date = this.common.getYesterdaysDate();
    
  }
  ngAfterViewInit() {
    this.getTotalExpenseOfYesterday();
    this.getYesterdaysData();
  }
  private getYesterdaysData() {
    this.expense.getExpensesByDate(this.model.date).then((response) => {
      $("h4").hide();
      $("table").show();
      this.model.dataArray = response;
    }, () => {
      this.model.dataArray = [];
      $("h4").show();
      $("table").hide();
    });
  }
  private getTotalExpenseOfYesterday() {
    this.expense.getTotalExpenseByDate(this.model.date).then((reponse) => {
      this.model.yesterdaysTotalExpense = reponse;
    }, () => {
      this.model.yesterdaysTotalExpense = 0;
    });
  }
}
