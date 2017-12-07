import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
//providers
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ToastProvider } from '../../providers/toast/toast';
//pages
import { JoinPage } from '../join/join';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  model: any = {};
  error: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastProvider: ToastProvider,
    public authService: AuthenticationProvider,
    public modalCtrl: ModalController,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //회원가입 페이지를 모달로 띄우기.
  goToJoin() {
    // this.navCtrl.push('JoinPage');
    let joinModal = this.modalCtrl.create(JoinPage);
    joinModal.present();
  }

  //form에서 받은 email, password를 loginForm으로 받음
  login(loginForm) {
    this.authService.login(this.model.email, this.model.password)
      .then(result => {
        let member = JSON.parse(result);
        // console.log('login # member memail = ' + member.memail)
        if (member.merror === null) {
          //에러메세지가 없으면  HomePage로 이동
          // this.navCtrl.push(HomePage);
          this.navCtrl.first();
        } else {
          this.toastProvider.presentToast(member.merror, 'top', null);
        }
      });
  }
}
