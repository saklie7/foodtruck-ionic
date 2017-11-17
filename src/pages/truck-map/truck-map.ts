import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
* Generated class for the TruckMapPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-truck-map',
  templateUrl: 'truck-map.html',
})
export class TruckMapPage implements OnInit{

  // public trucks: Truck[] = [];
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public mapTypeId: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.zoom = 16;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.mapTypeId = 'roadmap'; // 'roadmap'|'hybrid'|'satellite'|'terrain'
    //set current position
    this.setCurrentPosition();
  }

  private setCurrentPosition() {
    console.log('set='+ navigator);
    console.log('set='+ navigator.geolocation.getCurrentPosition);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.latitude = position.coords.latitude;
        console.log('lat'+this.latitude)
        this.longitude = position.coords.longitude;
        console.log('lng'+this.longitude)
        this.zoom = 16;
        console.log(position.coords);
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TruckMapPage');
  }

}
