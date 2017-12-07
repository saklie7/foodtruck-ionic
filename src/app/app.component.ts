import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TruckMapPage } from '../pages/truck-map/truck-map';
import { TruckListPage } from '../pages/truck-list/truck-list';
import { TruckInfoPage } from '../pages/truck-info/truck-info';
import { CanivalPage } from '../pages/canival/canival';
import { SupportPage } from '../pages/support/support';
import { LoginPage } from '../pages/login/login';
import { JoinPage } from '../pages/join/join';
import { MemberInfoPage } from '../pages/member-info/member-info';
import { TruckRegistPage } from '../pages/truck-regist/truck-regist';

//providers
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { TruckProvider } from '../providers/truck/truck';
import { MemberProvider } from '../providers/member/member';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  member: any;
  truck: any;
  nickname: string;
  registype: number;
  check: number; //사업자 회원이 트럭등록을 했는지 체크
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authService: AuthenticationProvider,
    public truckProvider: TruckProvider,
    public memberProvider: MemberProvider,
  ) {
    this.initializeApp();

    //새로고침을 할 때, 스토리지 확인해서 로그인 상태인지 확인
    if (window.localStorage.getItem('member')) {
      this.member = JSON.parse(window.localStorage.getItem('member'));
      this.nickname = this.member.mnickname;
      this.registype = this.member.mregistype;
      // console.log(this.registype);
      if (this.registype === 2) {
        // console.log('2222');
        this.checkTruck(this.member.memail);
      }
    }

    // 기본으로 보여주는 페이지
    // used for an example of ngFor and navigation
    this.pages = [
      { title: '푸드트럭홈', component: HomePage },
      { title: '트럭 지도', component: TruckMapPage },
      { title: '트럭 목록', component: TruckListPage },
      { title: '축제 정보', component: CanivalPage },
      { title: '고객 센터', component: SupportPage },
    ];

    // 로그인을 했을 때, 비동기방법으로 처리.
    // console.log('app.component start')
    this.authService.getObservable().subscribe(
      result => {
        if (result.login) {
          //로그인 함
          this.member = JSON.parse(window.localStorage.getItem('member'));
          this.nickname = this.member.mnickname;
          this.registype = this.member.mregistype;

          if (this.registype === 2) { //사업자일때, 등록트럭체크
            this.checkTruck(this.member.memail);
          }
          this.nav.setRoot(HomePage);
        } else {
          //로그아웃 함
          this.member = null;
          this.nickname = null;
          this.registype = null;
          window.localStorage.removeItem('member');
        }
      }
    );

    //프로필 수정 했을 때, 비동기방법으로 처리해서 nickname을 새로 설정
    this.memberProvider.getObservable().subscribe(
      result => {
        //확인
        console.log('appcomponent localStorage = '+window.localStorage.getItem('member'));
        console.log('appcomponent result.modify= '+ result.modify);
        this.member = JSON.parse(window.localStorage.getItem('member'));
        this.nickname = this.member.mnickname;
      }
    )

    //사업자가 트럭 등록을 하면 나의 트럭가기 버튼으로 변경할 수 있게 제어
    this.truckProvider.getObservable().subscribe(res => {
      if (res.check == 'true') {
        this.checkTruck(this.member.memail);
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //사업자회원이면 트럭등록을 했는지 확인
  checkTruck(email: string) {
    this.authService.checkTruck(email).subscribe(result => {
      // console.log('appcomponent checkTruck = '+res);
      let res = result.text();
      if (res === '0') {
        //트럭등록 안함
        this.check = 0;
      } else {
        //트럭등록 함
        // console.log('res ===== '+JSON.parse(res))
        this.truck = JSON.parse(res);
        this.check = 1;
      }
    });
  }

  //기본 페이지
  openPage(page) {
      this.nav.setRoot(page.component);
  }

  goToLogin() {
    this.nav.push(LoginPage);
  }

  goToJoin() {
    this.nav.setRoot(JoinPage);
  }

  goToLogout() {
    this.authService.logout().subscribe(res => {
      localStorage.removeItem('member');
      this.nav.setRoot(HomePage);
    });
  }

  //마이페이지와 비슷 - 나의리뷰,즐겨찾기,프로필수정 이용
  goToMemberInfo() {
    this.nav.push(MemberInfoPage);
  }

  goToTruckRegist() {
    this.nav.push(TruckRegistPage);
  }

  goToTruckInfo() {
    //TODO:나의 트럭가기 보충해줘야함
    this.nav.push(TruckInfoPage, {
      truck: this.truck
    });
  }
}
