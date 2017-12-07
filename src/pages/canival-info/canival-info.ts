import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CanivalProvider } from '../../providers/canival/canival';
/**
 * Generated class for the CanivalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-canival-info',
  templateUrl: 'canival-info.html',
})
export class CanivalInfoPage {

  canival: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public canivalProvider: CanivalProvider
  ) {
    this.canival = navParams.get('key');
  }

  ionViewDidLoad() {
    console.log('tttt' + this.canival);
    console.log('ionViewDidLoad CanivalInfoPage');
  }

}
