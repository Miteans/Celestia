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

  get_items_details(categoryName): Observable<any> {
    let url = `${this.baseurl}item/${categoryName}`;
    return this.http.get(url);
  }

  get_categories(): Observable<any>{
    let url = `${this.baseurl}categories`;
    return this.http.get(url);
  }

  add_an_item(item_name,category,price,image): Observable<any>{
    let url = `${this.baseurl}add-item`;
    const formData: FormData = new FormData();
    let data = {name:item_name,category:category,price:price}
    formData.append('data',JSON.stringify(data))
    formData.append('image',image,image.name)
    return this.http.post(url,formData)
  }
}
