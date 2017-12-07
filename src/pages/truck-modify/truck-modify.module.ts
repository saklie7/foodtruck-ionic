import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TruckModifyPage } from './truck-modify';

@NgModule({
  declarations: [
    TruckModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(TruckModifyPage),
  ],
})
export class TruckModifyPageModule {}
