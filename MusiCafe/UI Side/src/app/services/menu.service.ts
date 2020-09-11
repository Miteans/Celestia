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

  formHtppOptions(params): any {
    const httpOptions = {
      headers: {
        'Access-Control-Allow-Methods': 'POST'
      },
      params: params,
             };
    return httpOptions;
  }

  add_an_item(item_name,category,price,image): Observable<any>{
    let url = `${this.baseurl}add-item`;
    const formData: FormData = new FormData();
    formData.append('name',item_name)
    formData.append('category',category)
    formData.append('price',price)
    formData.append('image',image,image.name)
    return this.http.put(url,formData,this.formHtppOptions({}))
  }
}
