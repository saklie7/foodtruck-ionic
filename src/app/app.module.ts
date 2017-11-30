import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TruckMapPage } from '../pages/truck-map/truck-map';
import { TruckListPage } from '../pages/truck-list/truck-list';
import { TruckInfoPage } from '../pages/truck-info/truck-info';
import { TruckRegistPage } from '../pages/truck-regist/truck-regist';
import { CanivalPage } from '../pages/canival/canival';
import { ReviewsPage } from '../pages/reviews/reviews';
import { SupportPage } from '../pages/support/support';
import { FavoritesPage } from '../pages/favorites/favorites';
import { MemberInfoPage } from '../pages/member-info/member-info';
import { LoginPage } from '../pages/login/login';
import { JoinPage } from '../pages/join/join';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

import { TruckProvider } from '../providers/truck/truck';
import { AuthenticationProvider } from '../providers/authentication/authentication';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TruckMapPage,
    TruckListPage,
    TruckInfoPage,
    TruckRegistPage,
    CanivalPage,
    ReviewsPage,
    SupportPage,
    FavoritesPage,
    MemberInfoPage,
    LoginPage,
    JoinPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
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
    CanivalPage,
    ReviewsPage,
    SupportPage,
    FavoritesPage,
    MemberInfoPage,
    LoginPage,
    JoinPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TruckProvider,
    AuthenticationProvider,
    GoogleMaps
  ]
})
export class AppModule {}
