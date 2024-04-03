import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API's base URL
  private tokenKey = 'authToken'; // Key for storing the token in localStorage

  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    const url = `${this.apiUrl}/auth/signup`;
    return this.http.post(url, userData);
  }

  signupTrainer(trainerData: any): Observable<any> {
    const url = `${this.apiUrl}/auth/signup/trainer`;
    return this.http.post(url, trainerData);
  }

  signin(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/auth/signin`;
    return this.http.post(url, credentials);
  }

  logout(): void {
    // Remove the token from localStorage
    localStorage.removeItem(this.tokenKey);
    // You can add additional logic here, such as clearing user data or navigating to the login page
  }

  getToken(): string | null {
    // Retrieve the token from localStorage
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    // Store the token in localStorage
    localStorage.setItem(this.tokenKey, token);
  }
}