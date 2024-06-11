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
    if (!token) {
      return false;
    }
    return !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode.default(token); // Using jwtDecode.default for decoding
      const isExpired = (decoded.exp * 1000) < Date.now();
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
        const decoded: any = jwtDecode.default(token); // Using jwtDecode.default for decoding
        return decoded.Role && decoded.Role.includes('ADMIN');
      } catch (error) {
        console.error('Failed to decode token for admin check:', error);
        return false;
      }
    }
    return false;
  }

  logout(): void {
    const token = this.getToken();
    if (token) {
      this.http.post(`${this.baseUrl}/logout`, {}, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).subscribe({
        next: () => {
          console.log('Logged out successfully.');
          localStorage.removeItem('jwtToken');
          this.router.navigate(['/products']);
        },
        error: error => {
          console.error('Logout failed:', error);
          localStorage.removeItem('jwtToken');
        }
      });
    } else {
      console.error('No token found on logout.');
    }
  }

  login(username: string, password: string): Observable<{ jwt: string }> {
    localStorage.removeItem('jwtToken');
    return this.http.post<{ jwt: string }>(`${this.baseUrl}/login`, { username, password });
  }

  register(user: { firstName: string; lastName: string; username: string; password: string; role: string }): Observable<{ jwt: string }> {
    return this.http.post<{ jwt: string }>(`${this.baseUrl}/register`, user);
  }

  handleAuthentication(jwt: string): void {
    console.log('Authentication successful:', jwt);
    localStorage.setItem('jwtToken', jwt);
    this.router.navigate(['/']);
  }
}
