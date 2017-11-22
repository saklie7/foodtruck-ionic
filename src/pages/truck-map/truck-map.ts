import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { TruckProvider } from '../../providers/truck/truck';

import { Truck } from '../../_models/truck.model';
/**
* Generated class for the TruckMapPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

declare var google;

@Component({
  selector: 'page-truck-map',
  templateUrl: 'truck-map.html',
})
export class TruckMapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  infoWindows: any;

  trucks: Truck[] = [];

  lat:number;
  lng:number;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public truckService: TruckProvider,
  ) {
    this.infoWindows = [];
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      let latLng = new google.maps.LatLng(this.lat, this.lng);

      let mapOptions = {
        center: latLng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  // Add Marker & infowindow
  addMarker() {
  this.truckService.truckgetAll().subscribe(trucks => {
    this.trucks = trucks.json();
    for(let i=0; i<this.trucks.length; i++) {
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: {
          lat : this.trucks[i].tlat,
          lng : this.trucks[i].tlng
        }
      });

      let content = "<p>"+this.trucks[i].tname+"</p><hr><a (click)=test1()>바로가기</a>";

      let infoWindow = new google.maps.InfoWindow({
        content: content
      });

      // Marker clicked popup infowindow
      google.maps.event.addListener(marker, 'click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
      this.map.setCenter({
        lat : this.trucks[i].tlat,
        lng : this.trucks[i].tlng
      });
    });
    this.infoWindows.push(infoWindow);
  }
});
}

// get Truck list
getTrucks() {
this.truckService.truckgetAll().subscribe(trucks => {
  this.trucks = trucks.json();
});
}

// infowindow close
closeAllInfoWindows() {
for(let window of this.infoWindows) {
  window.close();
};
}

}
