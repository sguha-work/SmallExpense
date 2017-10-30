import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeTabDefaultPagePage } from '../home-tab-default-page/home-tab-default-page';
import { AddExpensesDefaultPagePage } from '../add-expenses-default-page/add-expenses-default-page';
import { CloudTabDefaultPagePage } from '../cloud-tab-default-page/cloud-tab-default-page';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root: any = HomeTabDefaultPagePage;
  tab2Root: any = AddExpensesDefaultPagePage;
  tab3Root: any = CloudTabDefaultPagePage;
  constructor(public navCtrl: NavController) {
  }
  
}
