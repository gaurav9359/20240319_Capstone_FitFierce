import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


interface UserProfilee {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  subscribed_plans: {
    trainer_name: string;
    image: string;
    speciality: string;
    price: number;
    validity_days: number;
  }[];
}


@Injectable({
  providedIn: 'root'
})

export class ProfileServiceService {
  private apiUrl = 'http://localhost:3000/user/getuser';
  private bearerToken = localStorage.getItem("authToken"); // Replace with your actual token

  constructor(private http: HttpClient) {}

  getUserProfilee(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.bearerToken}` });
    return this.http.get<any>(this.apiUrl, { headers })
      .pipe(
        map(response => response), // Optionally modify the response data if needed
        catchError(this.handleError<any>('getUserProfilee'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log the error to the console
      // Return an empty result or a user-facing error message
      return of(result as T);
    };
  }
}
