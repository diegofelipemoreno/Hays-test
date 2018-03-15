import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Hotel} from '../models/Hotel';
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class HotelService {
  static BASE_URL: string = 'http://localhost:3000';
  hotels : Hotel[];
  hotel: Hotel;

  constructor(public http: Http) {
  }

  query(URL: string, params?: object): Observable<any> {
    let queryURL: string,
        queryData: String = '';

    URL = URL || '/';   
    params = params || {};
    queryURL = `${HotelService.BASE_URL}${URL}`;

    if (undefined !== Object.values(params)[0]) {
      Object.keys(params).map((objectKey, index) => {

        queryData += `${objectKey}=${params[objectKey]}&`;
      });
    }
    console.log(`${queryURL}?${queryData}`);
    return this.http.request(`${queryURL}?${queryData}`);
  }

  getHotels(params: object): Observable<any> {
    let queryOutput: Observable<any>;

    if (Object.keys(params).length) {
      queryOutput = this.query('/hotels', params);
    } else {
      queryOutput = this.query('/');
    }

    return queryOutput;
  }
}

export const HOTEL_PROVIDERS: any[] = [
    {
        provide: HotelService,
        useClass: HotelService
    }
];
