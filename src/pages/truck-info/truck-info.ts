import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
//pages
import { FoodRegistPage } from '../../pages/food-regist/food-regist';
import { ReviewWritePage } from '../../pages/review-write/review-write';
import { TruckModifyPage } from '../../pages/truck-modify/truck-modify';
//providers
import { FoodProvider } from '../../providers/food/food';
import { ReviewProvider } from '../../providers/review/review';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { TruckProvider } from '../../providers/truck/truck';
import { ToastProvider } from '../../providers/toast/toast';

/**
 * Generated class for the TruckInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-truck-info',
  templateUrl: 'truck-info.html',
})
export class TruckInfoPage {
  truck: any;
  foods: any[] = [];
  reviews: any[] = [];

  //로그인 되었는지 체크
  member: any;

  //트럭주인인지 체크
  truckOwner: boolean = false;

  //등록되지 않은 메세지 처리
  foodError: string;
  reviewError: string;

  //modal처리시 필요
  modal: string;

  //즐겨찾기
  check: boolean = false;
  hid: string;

  //segment의 default값 지정
  pet: string = 'menus';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private toastProvider: ToastProvider,
    public foodProvider: FoodProvider,
    public reviewProvider: ReviewProvider,
    public favoriteProvider: FavoriteProvider,
    public truckProvider: TruckProvider,
  ) {
    // console.log('TruckInfoPage constructor = ' + navParams.get('truck'));
    this.truck = navParams.get('truck');
    this.modal = navParams.get('modal');
  }

  //시작할 때 기동
  ionViewDidLoad() {
    console.log('ionViewDidLoad TruckInfoPage');
    console.log(this.navParams.get('truck'));
    //로그인이 되어 있는지 체크
    if (window.localStorage.getItem('member')) {
      this.member = JSON.parse(window.localStorage.getItem('member'));
      this.checkTruck(); //트럭주인체크
      if(!this.truckOwner){ //트럭주인이 아니면 즐겨찾기 체크를 함
        this.checkFavorite(this.truck.tid);
      }
    }

    //메뉴리스트 불러오기
    this.foodProvider.getAllfoods(this.truck.tid).subscribe(res => {
      let json = res.json();
      // console.log(json);
      if (json[0].ferror) {
        this.foodError = json[0].ferror;
      } else {
        this.foods = res.json();
      }
    });

    //푸드등록을 하면 비동기적으로 getAllfoods() 처리
    this.foodProvider.getObservable().subscribe(res => {
      if (res.check == 'true') {
        this.foodProvider.getAllfoods(this.truck.tid).subscribe(res => {
          this.foodError = null;
          // console.log(res.json());
          this.foods = res.json();
        });
      }
    });

    //트럭리뷰 불러오기
    this.reviewProvider.getTruckReview(this.truck.tid).subscribe(res => {
      let json = res.json();
      if (json[0].rerror) {
        this.reviewError = json[0].rerror;
      } else {
        this.reviews = res.json();
      }
    });

    //리뷰등록을 하면 비동기적으로 getTruckReview() 처리
    this.reviewProvider.getObservable().subscribe(res => {
      console.log(res.review)
      if (res.review == 'insert') {
        this.reviewProvider.getTruckReview(this.truck.tid).subscribe(res => {
          this.reviewError = null;
          // console.log(res.json());
          this.reviews = res.json();
        });
      }
    });

    //즐겨찿기 추가&삭제 시, 버튼 변경
    this.favoriteProvider.getObservable().subscribe(result => {
      if (result.favo === 'insert') {
        console.log('즐겨찾기 추가시 icon = heart = ' + result.favo)
        this.check = true;
      } else {
        console.log('즐겨찾기 삭제시 icon = heart-outline = ' + result.favo)
        this.check = false;
      }
    });

    //트럭을 수정하면 비동기적으로 처리
    this.truckProvider.getObservable().subscribe(result => {
      console.log(result.modify);
      if(result.modify){
        this.truck = JSON.parse(result.modify);
      }
    });
  } //// End ionViewDidLoad
  //음식등록모달
  presentProfileModal() {
    let profileModal = this.modalCtrl.create(FoodRegistPage, { userId: this.truck.tid });
    profileModal.present();
  }

  //리뷰등록모달
  presentReviewModal() {
    let profileModal = this.modalCtrl
      .create(ReviewWritePage, {
        tid: this.truck.tid,
        email:this.member.memail
      });
    profileModal.present();
  }

  //트럭정보 수정 모달
  presentTruckModal() {
    let profileModal = this.modalCtrl.create(TruckModifyPage, { truck: this.truck });
    profileModal.present();
  }

  //즐겨찾기를 통해서 들어왔을때 사용할 모달닫기
  dismiss() {
    this.viewCtrl.dismiss();
  }

  //트럭 주인인지 아닌지를 확인
  checkTruck() {
    console.log('checkTruck # truckOwner')
    if (this.member.memail === this.truck.tmember) {
      this.truckOwner = true;
    } else {
      this.truckOwner = false;
    }
  }

  //즐겨찾기 추가
  addFavorite(tid: any) {
    this.favoriteProvider.addFavorite(tid).subscribe(() => {
      this.toastProvider.presentToast('추가되었습니다.', 'bottom', 'bottomToast');
    });
  }

  //즐겨찾기 삭제
  deleteFavorite(tid: string) {
    this.checkFavorite(tid);
    console.log('deleteFavorite hid = ' + this.hid);
    this.favoriteProvider.deleteFavorite(this.hid).subscribe(() => {
      this.toastProvider.presentToast('삭제되었습니다.', 'bottom', 'bottomToast');
    });
  }


  //즐겨찾기 체크 ->
  //1.해당 즐겨찾기의 hid 구함
  //2.새로고침했을 때, icon heart로 보일 수 있게 check값 변경
  checkFavorite(tid: string) {
    this.favoriteProvider.checkFavorite(this.truck.tid).subscribe(res => {
      if (res) {
        this.hid = JSON.parse(res).hid;
        this.check = true;
        console.log('this.hid= ' + this.hid);
      } else {
        this.hid = null;
      }
    });
  }


}
