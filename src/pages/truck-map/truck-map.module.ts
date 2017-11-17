import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TruckMapPage } from './truck-map';

@NgModule({
  declarations: [
    TruckMapPage,
  ],
  imports: [
    IonicPageModule.forChild(TruckMapPage),
  ],
})
export class TruckMapPageModule {}
