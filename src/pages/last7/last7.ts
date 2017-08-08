import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import {Expense} from './../../services/expense.service';
import {Common} from './../../services/common.service';
import * as $ from 'jquery';
@Component({
  selector: 'page-last7',
  templateUrl: 'last7.html'
})
export class Last7Page  implements AfterViewInit {

  public model: any;
  constructor(public navCtrl: NavController, private expense: Expense, private common: Common) {
    this.model = {};
    this.model.dataArray = [];
    this.model.presentMont = this.common.getCurrentMonthName();
    this.model.totalExpense = 0;
  }
  ngAfterViewInit() {
    this.getDaywiseTotalExpenseOfLast7Days();
  }
  getTotalExpenseOfLast30Days(dataArray: any) {
    for(let index = 0; index<dataArray.length; index++) {
      this.model.totalExpense += parseInt(dataArray[index].expense);
    }
  }
  getDaywiseTotalExpenseOfLast7Days() {
    this.expense.getDaywiseTotalExpenseOfLast7Days().then((response) => {
      if(!response.length) {
        $("h4").show();
        $("table").hide();
      } else {
        this.getTotalExpenseOfLast30Days(response);
        this.model.dataArray = response;
        $("h4").hide();
        $("table").show();
      }
      
    }, () => {
       $("h4").show();
       $("table").hide();
    });
  }
  
}
