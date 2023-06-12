import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PRODUCT_API} from '../../../config/api';
import {Product} from '../../../models/product';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  constructor(private http: HttpClient) { }

  upload(product: Product): Observable<HttpEvent<any>> {

    const req = new HttpRequest('POST', PRODUCT_API + '/add', product, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(PRODUCT_API + '/all/paged');
  }
}
