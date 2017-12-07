import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

//Toast를 위해 추가
import { ToastProvider } from '../../providers/toast/toast';

import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-join',
  templateUrl: 'join.html',
})
export class JoinPage {
  model: any = {};

  // joinForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public memberProvider: MemberProvider,
    private toastProvider: ToastProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinPage');
  }

  join(joinForm) {
    this.memberProvider.join(this.model.email, this.model.password, this.model.nickname, this.model.registype)
      .subscribe(res => {
        let member = JSON.parse(res.text());
        if (member.merror !== null) {
          this.toastProvider.presentToast(member.merror, 'top', null);
        } else {
          console.log('join success!')
          this.dismiss();
        }
      });

  }

  goToLogin() {
    this.navCtrl.push('LoginPage');
  }

  //모달 창 닫기
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
