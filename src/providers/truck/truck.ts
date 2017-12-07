import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TruckProvider {
  public truckUrl = 'http://35.194.125.211/trucks';

  private subject = new Subject<any>();

  constructor(public http: Http) {
    console.log('Hello TruckProvider Provider');
  }

  getObservable(): Observable<any> {
    // console.log('getObservable() working');
    return this.subject.asObservable();
  }

  getTrucks(): Observable<any> {
    return this.http.get(this.truckUrl);
  }

  postTruck(truck) {
    // postTruck(truck): Observable<any> { //인홍이가 한 건데 에러가 뜬다....ㅠ
    const url = this.truckUrl + `/post`;
    let formdata: FormData = new FormData();
    let address: string;
    // let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + truck.lat + "," + truck.lng + "&key=AIzaSyAmd6XJpMMk5qA869GC9XXrNmo8Fb1cRYg")
      .subscribe(response => {
        // console.log(response.json());
        // console.log(response.json().results[0].formatted_address);
        address = response.json().results[0].formatted_address;

        // console.log(address);
        formdata.append('name', truck.name);
        formdata.append('open', truck.open);
        formdata.append('close', truck.close);
        formdata.append('lat', truck.lat);
        formdata.append('lng', truck.lng);
        formdata.append('comment', truck.content);
        formdata.append('file', truck.file);
        formdata.append('address', address);
        formdata.append('email', truck.member);

        return this.http.post(url, formdata)
          .subscribe(res => {
            this.subject.next({ check: 'true' });
          }
          );
      });
  }

  //트럭 주소만 구하고 싶을 때
  getTruckAddress(lat, lng): Observable<any> {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyAmd6XJpMMk5qA869GC9XXrNmo8Fb1cRYg")
      .map(res => {
        let address = JSON.parse(res.text()).results[0].formatted_address;
        return address;
      });
  }

  //트럭수정 - 이미지 수정 안 할때.
  modifyTruck(truck: any): Observable<any> {
    const url = `${this.truckUrl}/post2`;
    let formdata: FormData = new FormData();

    formdata.append('tid', truck.tid);
    formdata.append('name', truck.tname);
    formdata.append('open', truck.topen);
    formdata.append('close', truck.tclose);
    formdata.append('lat', truck.tlat);
    formdata.append('lng', truck.tlng);
    formdata.append('comment', truck.tcomment);
    formdata.append('file', truck.timage); //자료형: 문자열
    formdata.append('address', truck.taddress);
    formdata.append('email', truck.tmember);

    return this.http.post(url, formdata)
      .map(res => {
        this.subject.next({ modify: res.text() });
      });
  }

  //트럭수정 - 이미지 수정 할때.
  modifyTruckIncludeImgFile(truck: any): Observable<any> {
    const url = `${this.truckUrl}/post3`;
    let formdata: FormData = new FormData();

    formdata.append('tid', truck.tid);
    formdata.append('name', truck.tname);
    formdata.append('open', truck.topen);
    formdata.append('close', truck.tclose);
    formdata.append('lat', truck.tlat);
    formdata.append('lng', truck.tlng);
    formdata.append('comment', truck.tcomment);
    formdata.append('file', truck.timage); //자료형: File
    formdata.append('address', truck.taddress);
    formdata.append('email', truck.tmember);

    console.log(formdata.get('file'));

    return this.http.post(url, formdata)
      .map(res => {
        this.subject.next({ modify: res.text() });
      });
  }



}
