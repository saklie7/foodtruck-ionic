import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberInfoPage } from './member-info';
import { FavoritesPage } from './favorites/favorites';
import { ProfilePage } from './profile/profile';
import { ReviewsPage } from './reviews/reviews';

@NgModule({
  declarations: [
    MemberInfoPage,
    FavoritesPage,
    ProfilePage,
    ReviewsPage
  ],
  imports: [
    IonicPageModule.forChild(MemberInfoPage),
  ],
  entryComponents: [
    MemberInfoPage,
    FavoritesPage,
    ProfilePage,
    ReviewsPage
  ],
})
export class MemberInfoPageModule { }
