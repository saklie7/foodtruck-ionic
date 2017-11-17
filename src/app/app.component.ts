import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: '푸드트럭', component: HomePage },
      // { title: 'List', component: ListPage },
      { title: '트럭 지도', component: TruckMapPage },
      { title: '트럭 목록', component: TruckListPage},
      // { title: '', component: },
      { title: '축제 정보', component: CanivalPage},
      { title: '고객 센터', component: SupportPage},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
