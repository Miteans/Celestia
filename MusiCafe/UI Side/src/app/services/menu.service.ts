import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  baseurl = environment.baseUrl
  constructor(public http: HttpClient) { }

  get_coffee_details(): Observable<any> {
    let url = `${this.baseurl}coffee`;
    return this.http.get(url);
  }

  get_cake_details(): Observable<any> {
    let url = `${this.baseurl}cake`;
    return this.http.get(url);
  }

  get_icecream_details(): Observable<any> {
    let url = `${this.baseurl}icecream`;
    return this.http.get(url);
  }

  get_snack_details(): Observable<any> {
    let url = `${this.baseurl}snack`;
    return this.http.get(url);
  }

  get_juice_details(): Observable<any> {
    let url = `${this.baseurl}juice`;
    return this.http.get(url);
  }
}
