import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupportProvider } from '../../providers/support/support';

/**
 * Generated class for the SupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  private supports: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public supportService: SupportProvider
  ){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');
    this.getSupportList();
  }

  getSupportList() {
    this.supportService.getSupportList().subscribe(supports => {
      // console.log(supports.text());
      this.supports = JSON.parse(supports.text());
      console.log(this.supports);
    })
  }

  getContent() {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  }

}
