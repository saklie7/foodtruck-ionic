// import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/subject';

/*
  Generated class for the MemberProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MemberProvider {
  memberUrl: string = "http://35.194.125.211/members";

  private subject = new Subject<any>();

  constructor(public http: Http) {
    console.log('Hello MemberProvider Provider');
  }

  getObservable(): Observable<any> {
    console.log('MemberProvider # getObservable() called!!')
    return this.subject.asObservable();
  }

  //회원가입
  join(email: string, password: string, nickname: string, registype: string) {
    let url = `${this.memberUrl}/regist`;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let member = { "mEmail": email, "mPassword": password, "mNickname": nickname, "mRegistype": registype };

    return this.http.post(url, JSON.stringify(member), { headers: headers });
      // .subscribe(res => {
      //   console.log(res.text())
      //   res.text();
      // });
  }

  //프로필 수정
  modify(model: any): Observable<any> {
    let url = `${this.memberUrl}/update/${model.memail}`;
    // console.log("modify url = "+url);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    // console.log('member = ' + JSON.stringify(model));
    return this.http.post(url, JSON.stringify(model), { headers: headers })
      .map(res =>{
        //변경된 내용을 스토리지에 넣음
        window.localStorage.setItem('member', res.text());
        this.subject.next({modify: 'true'});
        return res.text();
      });
  }

  // private handleError(res: Response) {
  //   console.log("Erroe = " + res);
  //   return Observable.throw(res.json().error || 'Server Down');
  // }
}
