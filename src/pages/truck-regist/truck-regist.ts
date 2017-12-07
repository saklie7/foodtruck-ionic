import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { TruckListPage } from '../../pages/truck-list/truck-list';

import { TruckProvider } from '../../providers/truck/truck';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/**
* Generated class for the TruckRegistPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-truck-regist',
  templateUrl: 'truck-regist.html',
})
export class TruckRegistPage {

  truck: any = {};
  url: string;
  selectedFiles: FileList;
  currentFileUpload: File;

  latitude: number;
  longitude: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public truckProvider: TruckProvider,
    public authService: AuthenticationProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TruckRegistPage');
  }

  agm() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      // console.log(position.coords.latitude)
      this.longitude = position.coords.longitude;
      // console.log(position.coords.longitude)
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0)
    console.log(this.selectedFiles)
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  submit() {
    this.truck.file = this.currentFileUpload;
    this.truck.lat = this.latitude;
    this.truck.lng = this.longitude;
    this.truck.member = JSON.parse(window.localStorage.getItem('member')).memail;
    console.log(this.currentFileUpload)
    console.log(this.truck);

    this.truckProvider.postTruck(this.truck);
    this.truckProvider.getObservable().subscribe(res => {
      if (res.check == 'true') {
        // this.authService.checkTruck(this.truck.member); //이거 꼭 해줘야하나?
        this.navCtrl.push(TruckListPage);
      }
    });

  }

}
