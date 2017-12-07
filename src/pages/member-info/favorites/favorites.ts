import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { TruckInfoPage } from '../../../pages/truck-info/truck-info';

import { FavoriteProvider } from '../../../providers/favorite/favorite';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  favorites: Array<any>;

  member: any;
  error: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public favoriteProvider: FavoriteProvider,
  ) {
    this.member = JSON.parse(window.localStorage.getItem('member'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
    this.getFavorites(this.member.memail);

    //마이페이지를 통해서 트럭을 들어갔을 때, 트럭 즐겨찾기를 비동기적으로 제어
    this.favoriteProvider.getObservable().subscribe(result => {
      this.favorites = null;
      if (result.favo === 'insert') {
        this.getFavorites(this.member.memail);
      } else {
        this.getFavorites(this.member.memail);
      }
    });
  }

  getFavorites(email:string) {
    this.favoriteProvider.getFavorites(email)
      .subscribe(result => {
        // console.log(result);
        let json = JSON.parse(result);
        // console.log('favorite result = ' + json[0].herror);
        if(json[0].herror) {
          this.error = json[0].herror;
        } else {
          this.favorites = json;
        }
      });
  }

  //modal로 띄움
  goToTruckInfo(f) {
    let profileModal = this.modalCtrl.create(TruckInfoPage, {
      truck: f,
      modal: 'yes'
    });
    profileModal.present();
  }

  // presentProfileModal() {
  //   let profileModal = this.modalCtrl.create(FoodRegistPage, { userId: this.truck.tid });
  //   profileModal.present();
  // }
}
