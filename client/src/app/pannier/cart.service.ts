import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  getCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${environment.api}/cart`);
  }
  updateCart(id: number, cart: Cart) {
    return this.http.patch(`${environment.api}/cart` + id, cart);
  }
}
