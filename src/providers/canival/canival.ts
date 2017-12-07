import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


/*
Generated class for the CanivalProvider provider.
See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class CanivalProvider {
  public canivalUrl = 'http://35.194.125.211/canival';
  constructor(public http: Http) {
    console.log('Hello CanivalProvider Provider');
  }

  getCanivalList(): Observable<any> {
    return this.http.get(this.canivalUrl);
  }

  getCanivalInfo(key): Observable<any>{
    const CanivalInfo = `${this.canivalUrl}/view/${key}`;
    return this.http.get(CanivalInfo);
  }

}
