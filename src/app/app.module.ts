import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TruckMapPage } from '../pages/truck-map/truck-map';
import { TruckListPage } from '../pages/truck-list/truck-list';
import { TruckInfoPage } from '../pages/truck-info/truck-info';
import { TruckRegistPage } from '../pages/truck-regist/truck-regist';
import { TruckModifyPage } from '../pages/truck-modify/truck-modify';
import { CanivalPage } from '../pages/canival/canival';
import { CanivalInfoPage } from '../pages/canival-info/canival-info';
import { ReviewWritePage } from '../pages/review-write/review-write';
import { SupportPage } from '../pages/support/support';
import { LoginPage } from '../pages/login/login';
import { JoinPage } from '../pages/join/join';
import { FoodRegistPage } from '../pages/food-regist/food-regist';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

import { TruckProvider } from '../providers/truck/truck';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { CanivalProvider } from '../providers/canival/canival';
import { ToastProvider } from '../providers/toast/toast';
import { MemberProvider } from '../providers/member/member';
import { FoodProvider } from '../providers/food/food';
import { ReviewProvider } from '../providers/review/review';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { SupportProvider } from '../providers/support/support';

// page module
import { MemberInfoPageModule } from '../pages/member-info/member-info.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TruckMapPage,
    TruckListPage,
    TruckInfoPage,
    TruckRegistPage,
    TruckModifyPage,
    CanivalPage,
    CanivalInfoPage,
    ReviewWritePage,
    SupportPage,
    LoginPage,
    JoinPage,
    FoodRegistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    MemberInfoPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TruckMapPage,
    TruckListPage,
    TruckInfoPage,
    TruckRegistPage,
    TruckModifyPage,
    CanivalPage,
    CanivalInfoPage,
    ReviewWritePage,
    SupportPage,
    LoginPage,
    JoinPage,
    FoodRegistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TruckProvider,
    AuthenticationProvider,
    GoogleMaps,
    CanivalProvider,
    ToastProvider,
    MemberProvider,
    FoodProvider,
    ReviewProvider,
    FavoriteProvider,
    SupportProvider
  ]
})
export class AppModule {}
