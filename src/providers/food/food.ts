import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the FoodProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodProvider {

  private subject = new Subject<any>();

  public foodUrl = 'http://35.194.125.211/foods';
  // public TEST_API = this.API + '/foods';

  constructor(public http: Http) {
    console.log('Hello FoodProvider Provider');
  }
  getObservable(): Observable<any> {
    console.log('getObservable() working');
    return this.subject.asObservable();
  }

  getAllfoods(tid: string) {
    const url = this.foodUrl + `/${tid}`;
    return this.http.get(url);
  }

  postTruck(food) {
    const url = this.foodUrl + `/post`;
    let formdata: FormData = new FormData();

    formdata.append('name', food.name);
    formdata.append('price', food.price);
    formdata.append('description', food.description);
    formdata.append('file', food.file);
    formdata.append('tid', food.tid);

    return this.http.post(url, formdata)
      .subscribe(res => {
        this.subject.next({ check: 'true' });
      }
    );
  }


}
