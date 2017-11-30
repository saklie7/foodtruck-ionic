import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TruckRegistPage } from './truck-regist';

@NgModule({
  declarations: [
    TruckRegistPage,
  ],
  imports: [
    IonicPageModule.forChild(TruckRegistPage),
  ],
})
export class TruckRegistPageModule {}
