import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: { product: Product, quantity: number }[] = [];
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  addToCart(product: Product, quantity: number): { product: Product, quantity: number }[] {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    return this.items;
  }

  getItems(): { product: Product, quantity: number }[] {
    return this.items;
  }

  clearCart(): { product: Product, quantity: number }[] {
    this.items = [];
    return this.items;
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  createOrder(orderData: any): Observable<any> {
    const order = {
      userId: orderData.userId,
      total: this.getTotalPrice(),
      items: this.items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      })),
      ...orderData
    };
    return this.http.post<any>(this.apiUrl, order)
      .pipe(
        catchError(error => {
          console.error('Error creating order:', error);
          throw error;
        })
      );
  }
}
