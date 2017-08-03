import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { TodayPage } from '../pages/today/today';
import { Last30Page } from '../pages/last30/last30';
import { YesterdayPage } from '../pages/yesterday/yesterday';
import { ChartPage } from '../pages/chart/chart';
import { TagWisePage } from '../pages/tagwise/tagwise';
import { ImportExportPage } from '../pages/importexport/importexport';
import { TabsControllerPage } from './../pages/tabs-controller/tabs-controller';
import { TagService } from './../services/tag.service';
import { NumberService } from './../services/number.service';
import { FileHandeler } from './../services/filehandeler.service';
import { SettingsPage } from './../pages/settings/settings';
import { HistoryPage } from './../pages/history/history';
import { Events } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {File} from '@ionic-native/file';
import {HttpModule} from '@angular/http';
import { DatePicker } from '@ionic-native/date-picker';
import { EmailComposer } from '@ionic-native/email-composer';

import { Common } from './../services/common.service';
import { Alert } from './../services/alert.service';
import { Expense } from './../services/expense.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TodayPage,
    ChartPage,
    TabsControllerPage,
    SettingsPage,
    YesterdayPage,
    AboutPage,
    HistoryPage,
    Last30Page,
    TagWisePage,
    ImportExportPage
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
    ChartPage,
    SettingsPage,
    TabsControllerPage,
    YesterdayPage,
    AboutPage,
    HistoryPage,
    Last30Page,
    TagWisePage,
    ImportExportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TagService,
    NumberService,
    FileHandeler,
    Common,
    Expense,
    Alert,
    DatePicker,
    Events
  ]
})
export class AppModule {}