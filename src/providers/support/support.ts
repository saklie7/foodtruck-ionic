// import { HttpClient } from '@angular/common/http
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the SupportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SupportProvider {

  private supportUrl:string = 'http://35.194.125.211/supports';

  constructor(public http: Http) {
    console.log('Hello SupportProvider Provider');
  }

  getSupportList(): Observable<any> {
    return this.http.get(this.supportUrl);
  }

}
