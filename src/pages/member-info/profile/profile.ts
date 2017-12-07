import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MemberProvider } from '../../../providers/member/member';
import { ToastProvider } from '../../../providers/toast/toast';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private member: any;
  private model: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public memberProvider: MemberProvider,
    public toastProvider: ToastProvider,
  ) {
    this.member = JSON.parse(window.localStorage.getItem('member'));
    console.log('this.member.memail='+this.member.memail);
    this.model = {'memail': this.member.memail, 'mpassword': this.member.mpassword, 'mnickname':this.member.mnickname};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  modify(modifyForm) {
    console.log('modify Form data = '+ this.model.memail);
    this.memberProvider.modify(this.model).subscribe(result => {
      // console.log('modify  = ' + result)
      // window.localStorage.setItem('member', result);
      console.log('profile.ts # localStorage 확인 = '+ window.localStorage.getItem('member'))
      this.toastProvider.presentToast('수정되었습니다.', 'bottom', 'bottomToast');
    })
  }

  // this.memberService.join(this.model.email, this.model.password, this.model.nickname, this.model.registype)
  //   .subscribe(res => {
  //     let member = JSON.parse(res);
  //     if (member.merror !== null) {
  //       this.presentToast(member.merror);
  //     } else {
  //       this.navCtrl.pop();
  //     }
  //   });

}
