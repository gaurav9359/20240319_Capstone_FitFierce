import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:3000'; 
  private tokenKey = 'authToken'; // Key for storing the token in localStorage
  public role=''

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
    localStorage.removeItem('role');

  }

  getToken(): string | null {
    // Retrieve the token from localStorage
    return localStorage.getItem(this.tokenKey);
  }

  setRole(role:string):void{
    localStorage.setItem('role', role);
  }

  getRole(){
    this.role = localStorage.getItem('role')||'';
    return this.role;
  }

  setToken(token: string): void {
    // Store the token in localStorage
    localStorage.setItem(this.tokenKey, token);
  }
}
