import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TodayPage } from '../pages/today/today';
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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TodayPage,
    MonthPage,
    TabsControllerPage,
    SettingsPage
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
    TabsControllerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TagService,
    NumberService,
    FileHandeler
  ]
})
export class AppModule {}