import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/order-item.model';
import { UserAddress } from '../models/user-address.model';

@Injectable({
  providedIn: 'root'
})
export class IqosService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }
  
  createUserAddress(userAddress: UserAddress): Observable<UserAddress> {
    return this.http.post<UserAddress>(`${this.apiUrl}/userAddresses`, userAddress);
  }
  // User methods
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/products`);
  }  
 
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }


  // Order methods
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/orders/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/${id}`);
  }

  // OrderItem methods
  getOrderItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/orderItems`);
  }

  getOrderItemById(id: number): Observable<OrderItem> {
    return this.http.get<OrderItem>(`${this.apiUrl}/orderItems/${id}`);
  }

  createOrderItem(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.apiUrl}/orderItems`, orderItem);
  }

  updateOrderItem(id: number, orderItem: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${this.apiUrl}/orderItems/${id}`, orderItem);
  }

  deleteOrderItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orderItems/${id}`);
  }

  getUserAddresses(): Observable<UserAddress[]> {
    return this.http.get<UserAddress[]>(`${this.apiUrl}/userAddresses`);
  }

  getUserAddressById(id: number): Observable<UserAddress> {
    return this.http.get<UserAddress>(`${this.apiUrl}/userAddresses/${id}`);
  }

  

  updateUserAddress(id: number, userAddress: UserAddress): Observable<UserAddress> {
    return this.http.put<UserAddress>(`${this.apiUrl}/userAddresses/${id}`, userAddress);
  }

  deleteUserAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/userAddresses/${id}`);
  }

 
}
