import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { TodayPage } from '../pages/today/today';
import { YesterdayPage } from '../pages/yesterday/yesterday';
import { MonthPage } from '../pages/month/month';
import { TabsControllerPage } from './../pages/tabs-controller/tabs-controller';
import { TagService } from './../services/tag.service';
import { NumberService } from './../services/number.service';
import { FileHandeler } from './../services/filehandeler.service';
import { SettingsPage } from './../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {File} from '@ionic-native/file';
import {HttpModule} from '@angular/http';

import { Common } from './../services/common.service';
import { Alert } from './../services/alert.service';
import { Expense } from './../services/expense.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TodayPage,
    MonthPage,
    TabsControllerPage,
    SettingsPage,
    YesterdayPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TodayPage,
    MonthPage,
    SettingsPage,
    TabsControllerPage,
    YesterdayPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TagService,
    NumberService,
    FileHandeler,
    Common,
    Expense,
    Alert
  ]
})
export class AppModule {}