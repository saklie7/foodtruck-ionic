import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { TruckMapPage } from '../truck-map/truck-map';
import { TruckListPage } from '../truck-list/truck-list';
import { CanivalPage } from '../canival/canival';
import { ReviewsPage } from '../reviews/reviews';
import { SupportPage } from '../support/support';
import { FavoritesPage } from '../favorites/favorites';

import { Member } from '../../_models/member.model';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  obj = [
    { "TruckMapPage" : TruckMapPage },
    { "TruckListPage" : TruckListPage },
    { "CanivalPage" : CanivalPage },
    { "ReviewsPage" :  ReviewsPage },
    { "SupportPage" :  SupportPage },
    { "FavoritesPage" :  FavoritesPage },
  ]
  isLogin: boolean;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    if(sessionStorage.getItem('member'))
        this.isLogin = true;
    }

  goToPages(page:string) {
    for(let i=0; i<this.obj.length; i++) {
      if(Object.keys(this.obj[i])[0] === page) {
        console.log(Object.keys(this.obj[i])[0]);
        this.navCtrl.push(this.obj[i][page]);
      }
    }
  }
}
