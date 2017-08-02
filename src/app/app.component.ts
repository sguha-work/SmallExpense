import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as $ from 'jquery';
import { HomePage } from './../pages/home/home';
import { SettingsPage } from './../pages/settings/settings';
import { TodayPage } from './../pages/today/today';
import {YesterdayPage} from './../pages/yesterday/yesterday';
import {AboutPage} from './../pages/about/about';
import {HistoryPage} from './../pages/history/history';
import {ChartPage} from './../pages/chart/chart';
import { Last30Page } from '../pages/last30/last30';
import { AfterViewInit } from '@angular/core';
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements AfterViewInit {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = HomePage;
  public nav: Nav;
  public presentMonth: string;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ngAfterViewInit() {
    
  }
  goToPage(pageName: string): void {
    switch(pageName) {
      case 'settings':
        this.navCtrl.push(SettingsPage);
      break;
      case 'today':
        this.navCtrl.push(TodayPage);
      break;
      case 'yesterday':
        this.navCtrl.push(YesterdayPage);
      break;
      case 'about':
        this.navCtrl.push(AboutPage);
      break;
      case 'history':
        this.navCtrl.push(HistoryPage);
      break;
      case 'chart':
        this.navCtrl.push(ChartPage);
      break;  
      case 'last30':
        this.navCtrl.push(Last30Page);
      break;
    }
    this.closeMenu();
    
  }
  closeMenu(): void {
    $("#menu-button-close").trigger('click');
  }
  
}
