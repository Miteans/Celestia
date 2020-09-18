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

  add_an_item(item_name,categoryId,price,image,categoryName): Observable<any>{
    let url = `${this.baseurl}add-item`;
    const formData: FormData = new FormData();
    formData.append('name',JSON.stringify(item_name));
    formData.append('category_id',JSON.stringify(categoryId));
    formData.append('category_name',JSON.stringify(categoryName))
    formData.append('price',JSON.stringify(price));
    formData.append('image',image,image.name)
    return this.http.post(url,formData)
  }
}
