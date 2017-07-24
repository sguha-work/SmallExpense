import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as $ from 'jquery';
import { HomePage } from './../pages/home/home';
import { SettingsPage } from './../pages/settings/settings';
import { TodayPage } from './../pages/today/today';
import {YesterdayPage} from './../pages/yesterday/yesterday';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = HomePage;
  public nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
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
    }
    this.closeMenu();
    
  }
  closeMenu(): void {
    $("#menu-button-close").trigger('click');
  }
  
}
