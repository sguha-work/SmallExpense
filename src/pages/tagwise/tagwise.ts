import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import {Expense} from './../../services/expense.service';
import {Common} from './../../services/common.service';
import * as $ from 'jquery';
@Component({
  selector: 'page-tagwise',
  templateUrl: 'tagwise.html'
})
export class TagWisePage  implements AfterViewInit {

  public model: any;
  constructor(public navCtrl: NavController, private expense: Expense, private common: Common) {
    this.model = {};
    this.model.dataArray = [];
    this.model.dataLength = 0;
    this.model.presentMont = this.common.getCurrentMonthName();
    this.model.totalExpense = 0;
  }
  ngAfterViewInit() {
    $("h4").hide();
    $("table").hide();
    $("h1").hide();
  }
  
  public tagWiseDisplay(noOfDays: any): void {
    this.model.dataLength = noOfDays;
    if((noOfDays).toString() === "7") {
      this.getTagWiseTotalExpenseOfLast7Days();
    }
    if((noOfDays).toString() === "30") {
      this.getTagWiseTotalExpenseOfLast30Days();
    }
  }
  getTagWiseTotalExpenseOfLast30Days() {
    
    this.expense.getTagWiseTotalExpenseOf30Days().then((response) => {
      if(!Object.keys(response).length) {
        $("h4").show();
        $("table").hide();
        $("h1").hide();
      } else {
        let keys = Object.keys(response);
        let data = [];
        for(let index=0; index<keys.length; index++) {
          let obj = {
            "tag": "",
            "amount": 0
          };
          obj.tag = keys[index];
          obj.amount = response[keys[index]]; 
          data.push(obj);
        }
        this.model.dataArray = data;
        $("h4").hide();
        $("table").show();
        $("h1").show();
      }
      
    }, () => {
       $("h4").show();
       $("table").hide();
       $("h1").hide();
    });
  
  }
  getTagWiseTotalExpenseOfLast7Days() {
    this.expense.getTagWiseTotalExpenseOf7Days().then((response) => {
      if(!Object.keys(response).length) {
        $("h4").show();
        $("table").hide();
        $("h1").hide();
      } else {
        let keys = Object.keys(response);
        let data = [];
        for(let index=0; index<keys.length; index++) {
          let obj = {
            "tag": "",
            "amount": 0
          };
          obj.tag = keys[index];
          obj.amount = response[keys[index]]; 
          data.push(obj);
        }
        this.model.dataArray = data;
        $("h4").hide();
        $("table").show();
        $("h1").show();
      }
      
    }, () => {
       $("h4").show();
       $("table").hide();
       $("h1").hide();
    });
  }
  
}
