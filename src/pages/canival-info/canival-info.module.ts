import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CanivalInfoPage } from './canival-info';

@NgModule({
  declarations: [
    CanivalInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CanivalInfoPage),
  ],
})
export class CanivalInfoPageModule {}
