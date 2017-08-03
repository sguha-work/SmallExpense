import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import {Expense} from './../../services/expense.service';
import {Common} from './../../services/common.service';
import {FileHandeler} from './../../services/filehandeler.service';
@Component({
  selector: 'page-importexport',
  templateUrl: 'importexport.html'
})
export class ImportExportPage  implements AfterViewInit {

  public model: any;

  constructor(public navCtrl: NavController, private expense: Expense, private common: Common, private file: FileHandeler) {
    this.model = {};
    
  }

  ngAfterViewInit() {
  }
  
  public import() {

  }

  public export() {
    this.file.getFolderContents().then((response) => {
      alert(JSON.stringify(response))
    }, () => {
      alert("Error");
    });
  }
  
}
