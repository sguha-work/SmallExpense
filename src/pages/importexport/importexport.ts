import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import {Expense} from './../../services/expense.service';
import {Common} from './../../services/common.service';
import {ImportExport} from './../../services/importexport.service';
@Component({
  selector: 'page-importexport',
  templateUrl: 'importexport.html'
})
export class ImportExportPage  implements AfterViewInit {

  public model: any;

  constructor(public navCtrl: NavController, private expense: Expense, private common: Common, private impexp: ImportExport) {
    this.model = {};
    
  }

  ngAfterViewInit() {
  }
  
  public import() {

  }

  public export() {
    this.impexp.export().then((response) => {
      alert(response);
    }, () => {
      alert("Error");
    });
  }
  
}
