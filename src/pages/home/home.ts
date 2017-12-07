import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TruckMapPage } from '../truck-map/truck-map';
import { TruckListPage } from '../truck-list/truck-list';
import { CanivalPage } from '../canival/canival';
import { SupportPage } from '../support/support';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  obj = [
    { "TruckMapPage" : TruckMapPage },
    { "TruckListPage" : TruckListPage },
    { "CanivalPage" : CanivalPage },
    { "SupportPage" :  SupportPage },
  ]
  isLogin: boolean;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    if(localStorage.getItem('member')){
      this.isLogin = true;
    }
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
