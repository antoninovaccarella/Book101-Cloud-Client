import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import {PRODUCT_API, REVIEW_API} from 'src/app/config/api';
import {Review} from '../../../models/review';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) {
  }

  public getReviewsPagedByProduct(idProduct: number): Observable<Review[]> {
    return this.httpClient.get<Review[]>(
        REVIEW_API + idProduct + '/paged', httpOptions);
  }

  public addReview(review: Review, idProduct: number): Observable<Review> {
    return this.httpClient.post<Review>(REVIEW_API + 'add/' + idProduct, '?note=' + review , httpOptions);
  }

}
