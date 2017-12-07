import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
//pages
import { TruckInfoPage } from '../../../pages/truck-info/truck-info';
//providers
import { ReviewProvider } from '../../../providers/review/review';

/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class ReviewsPage {
  private reviews: Array<any>;
  private member: any;

  private error: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public reviewProvider: ReviewProvider,

  ) {
    this.member = JSON.parse(window.localStorage.getItem('member'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsPage');
    this.getMemberReview(this.member.memail);
  }

  //내가 남긴 모든 리뷰목록
  getMemberReview(email: string) {
    this.reviewProvider.getMemberReview(email)
      .subscribe(result => {
        // console.log('review result = ' + result);
        let json = JSON.parse(result);
        // console.log('review result = ' + json[0].rerror);
        if(json[0].rerror) {
          this.error = json[0].rerror;
        } else {
          this.reviews = json;
        }
      });
  }

  //TODO:modal로 띄움
  goToTruckInfo(f) {
    let profileModal = this.modalCtrl.create(TruckInfoPage, {
      truck: f,
      modal: 'yes'
    });
    profileModal.present();
  }

}
