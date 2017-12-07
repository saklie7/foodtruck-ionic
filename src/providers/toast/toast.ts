import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';


/*
  Generated class for the ToastProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  constructor(private toastCtrl: ToastController,) {
    console.log('Hello ToastProvider Provider');
  }

  presentToast(message: string, position:string, cssClass:any) {
    let toast = this.toastCtrl.create({
      message: message,
      cssClass: cssClass,
      position: position,
      duration: 2000,
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }
}
