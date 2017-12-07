import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CanivalProvider } from '../../providers/canival/canival';

import { CanivalInfoPage } from '../canival-info/canival-info';

/**
* Generated class for the CanivalPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-canival',
  templateUrl: 'canival.html',
})
export class CanivalPage {

  canivals:object[]=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public canivalProvider: CanivalProvider ) {
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad CanivalPage');
      this.canivalProvider.getCanivalList().subscribe(res => {
          console.log(res.json());
          this.canivals=res.json();
        }
      )}

    click(key){
        // console.log(key);
        this.navCtrl.push(CanivalInfoPage, {
          key: key
        });
      }

    }
