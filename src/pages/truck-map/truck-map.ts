import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { TruckInfoPage } from '../../pages/truck-info/truck-info';
import { TruckProvider } from '../../providers/truck/truck';

import { Truck } from '../../_models/truck.model';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker,
  HtmlInfoWindow
} from '@ionic-native/google-maps';
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
  map: GoogleMap;
  infoWindows: any;

  trucks: Truck[] = [];

  lat:number;
  lng:number;

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private truckService: TruckProvider,
    private googleMaps: GoogleMaps
  ) {
    this.infoWindows = [];

  }

  ionViewDidLoad(){
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
    this.loadMap();
  }

  loadMap(){
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);
    this.map.getMyLocation().then(res => {
      this.lat = res.latLng['lat'];
      this.lng = res.latLng['lng'];
    })

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      console.log('Map is ready!');
      this.map.setCameraTarget({lat: this.lat, lng: this.lng});
      this.map.addMarker({
        title: 'Ionic',
        icon: 'red',
        animation: 'BOUNCE',
        position: {
          lat: this.lat,
          lng: this.lng
        }
      })

      // Now you can use all methods safely.
      this.truckService.truckgetAll().subscribe(trucks => {
      this.trucks = trucks.json();
      for(let i=0; i<this.trucks.length; i++) {

        // info window
        let htmlInfoWindow = new HtmlInfoWindow();
        let frame: HTMLElement = document.createElement('div');
        frame.innerHTML = [
          '<h3>'+this.trucks[i].tname+'</h3>',
          '<button (click)="goToPage()">바로가기</button>'
        ].join("");
        // frame.getElementsByTagName("img")[0].addEventListener("click", () => {
        //   htmlInfoWindow.setBackgroundColor('red');
        // });
        htmlInfoWindow.setContent(frame, {width: "40%", height: "10%"});

        // add marker
        this.map.addMarker({
        // title: this.trucks[i].tname,
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: parseFloat(this.trucks[i].tlat),
          lng: parseFloat(this.trucks[i].tlng)
        }
      })
      .then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
        .subscribe(() => {
          htmlInfoWindow.open(marker);
        });
      });
    }
  });
});
}
goToPage() {
  this.navCtrl.push(TruckInfoPage);
}

}
