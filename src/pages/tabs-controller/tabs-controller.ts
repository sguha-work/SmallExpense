import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TodayPage } from '../today/today';
//import { MonthPage } from '../month/month';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root: any = HomePage;
  tab2Root: any = TodayPage;
  tab3Root: any = TodayPage;
  constructor(public navCtrl: NavController) {
  }
  
}
