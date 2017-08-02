import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import {Expense} from './../../services/expense.service';
import {Common} from './../../services/common.service';
import * as $ from 'jquery';
@Component({
  selector: 'page-last30',
  templateUrl: 'last30.html'
})
export class Last30Page  implements AfterViewInit {

  public model: any;
  constructor(public navCtrl: NavController, private expense: Expense, private common: Common) {
    this.model = {};
    this.model.dataArray = [];
    this.model.presentMont = this.common.getCurrentMonthName();
  }
  ngAfterViewInit() {
    this.getDaywiseTotalExpenseOfLast30Days();
  }
  getDaywiseTotalExpenseOfLast30Days() {
    this.expense.getDaywiseTotalExpenseOfLast30Days().then((response) => {
      if(!response.length) {
        $("h4").show();
        $("table").hide();
      } else {
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
