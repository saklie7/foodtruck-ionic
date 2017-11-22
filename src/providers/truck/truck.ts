import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Truck } from '../../_models/truck.model';

/*
Generated class for the TruckProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class TruckProvider {

  private subject = new Subject<any>();
  private truckUrl: string = "http://localhost:8080/trucks";

  constructor(public http: Http) {
    console.log('Hello TruckProvider Provider');
  }

  truckgetAll(): Observable<any> {
    const url = `${this.truckUrl}`;
    return this.http.get(url)
  }

}
