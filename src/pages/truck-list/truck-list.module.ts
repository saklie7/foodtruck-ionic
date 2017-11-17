import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TruckListPage } from './truck-list';

@NgModule({
  declarations: [
    TruckListPage,
  ],
  imports: [
    IonicPageModule.forChild(TruckListPage),
  ],
})
export class TruckListPageModule {}
