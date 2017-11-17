import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { TruckMapPage } from '../truck-map/truck-map';
import { TruckListPage } from '../truck-list/truck-list';
import { CanivalPage } from '../canival/canival';
import { ReviewsPage } from '../reviews/reviews';
import { SupportPage } from '../support/support';
import { FavoritesPage } from '../favorites/favorites';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  session:boolean = true;


  constructor(public navCtrl: NavController) {

  }


  goToTruckList() {
    this.navCtrl.push(TruckListPage);
  }

  goToTruckMap() {
    this.navCtrl.push(TruckMapPage);
  }

  goToCanival() {
    this.navCtrl.push(CanivalPage);
  }

  goToSupport() {
    this.navCtrl.push(SupportPage);
  }

  goToFavorites() {
    this.navCtrl.push(FavoritesPage);
  }

  goToReviews() {
    this.navCtrl.push(ReviewsPage);
  }




}
