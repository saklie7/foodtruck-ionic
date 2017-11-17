import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TruckMapPage } from '../pages/truck-map/truck-map';
import { TruckListPage } from '../pages/truck-list/truck-list';
import { TruckInfoPage } from '../pages/truck-info/truck-info';
import { CanivalPage } from '../pages/canival/canival';
import { ReviewsPage } from '../pages/reviews/reviews';
import { SupportPage } from '../pages/support/support';
import { FavoritesPage } from '../pages/favorites/favorites';
import { LoginPage } from '../pages/login/login';
import { JoinPage } from '../pages/join/join';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from '@ionic-native/http';

import { TruckProvider } from '../providers/truck/truck';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TruckMapPage,
    TruckListPage,
    TruckInfoPage,
    CanivalPage,
    ReviewsPage,
    SupportPage,
    FavoritesPage,
    LoginPage,
    JoinPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBFQmGdDApLDMW8Fp3F8VtOv9kwAg1xAUU',
      region: "kr",
      libraries: ["places"],
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TruckMapPage,
    TruckListPage,
    TruckInfoPage,
    CanivalPage,
    ReviewsPage,
    SupportPage,
    FavoritesPage,
    LoginPage,
    JoinPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TruckProvider,
  ]
})
export class AppModule {}
