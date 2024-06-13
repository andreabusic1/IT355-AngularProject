// AuthService

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) {}

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode.default(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      return isExpired;
    } catch (error) {
      console.error('Token decoding failed:', error);
      this.logout();
      return true;
    }
  }

  isUserAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode.default(token);
        return decoded.Role && decoded.Role.includes('ADMIN');
      } catch (error) {
        console.error('Failed to decode token for admin check:', error);
        return false;
      }
    }
    return false;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  logout(): void {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(`${this.baseUrl}/logout`, {}, { headers }).subscribe(
      response => {
        console.log(response);
        localStorage.removeItem('jwtToken');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Logout failed:', error);
      }
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode.default(token);
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  }

  register(user: { firstName: string; lastName: string; username: string; password: string; role: string }): Observable<{ jwt: string }> {
    return this.http.post<{ jwt: string }>(`${this.baseUrl}/register`, user);
  }

  handleAuthentication(jwt: string): void {
    console.log('Authentication successful:', jwt);
    this.saveToken(jwt); // Čuvanje tokena
    this.router.navigate(['/']); // Preusmeravanje na početnu stranicu
  }
}
