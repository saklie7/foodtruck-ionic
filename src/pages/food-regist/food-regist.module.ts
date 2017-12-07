import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodRegistPage } from './food-regist';

@NgModule({
  declarations: [
    FoodRegistPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodRegistPage),
  ],
})
export class FoodRegistPageModule {}
