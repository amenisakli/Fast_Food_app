import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from './food';
import { environment } from 'src/environments/environment';
import { Cart } from '../pannier/cart';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getFood(): Observable<Food[]> {
    return this.http.get<Food[]>(environment.api + '/food');
  }
  detailFood(id: number): Observable<Food> {
    return this.http.get<Food>(environment.api + '/food' + id);
  }
  addToCart(foodId: number): Observable<any> {
    return this.http.post(environment.api + '/cart', { foodId });
  }
}
