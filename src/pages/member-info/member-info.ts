import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReviewsPage } from './reviews/reviews';
import { FavoritesPage } from './favorites/favorites';
import { ProfilePage } from './profile/profile';

import { SegmentButton, Slides } from 'ionic-angular';
/**
 * Generated class for the MemberInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-info',
  templateUrl: 'member-info.html',
})
export class MemberInfoPage {

  // @ViewChild('loopSlider') sliderComponent: Slides;
  // slides: Array<{ id: string, component: any }>;
  // selectedSegment = 'review';
  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  //   this.slides = [
  //     { id: 'review', component: ReviewsPage },
  //     { id: 'favorite', component: FavoritesPage },
  //     { id: 'profile', component: ProfilePage },
  //   ];
  // }
  tab1= ReviewsPage ;
  tab2= FavoritesPage ;
  tab3= ProfilePage ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(JSON.parse(window.localStorage.getItem('member')));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberInfoPage');
  }

  // onSegmentChanged(segmentButton: SegmentButton) {
  //   console.log('Segment changed to', segmentButton.value);
  //   const selectedIndex = this.slides.findIndex((slide) => {
  //     return slide.id === segmentButton.value;
  //   });
  //   this.sliderComponent.slideTo(selectedIndex);
  // }
  //
  // onSlideChanged(s: Slides) {
  //   console.log('Slide changed', s);
  //   if(s.getActiveIndex() < 3){
  //     const currentSlide = this.slides[s.getActiveIndex()];
  //     console.log('currentSlid = '+ currentSlide.id)
  //     this.selectedSegment = currentSlide.id;
  //   }
  // }
}
