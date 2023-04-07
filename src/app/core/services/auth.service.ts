import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';
import { AppError } from '../models/app-error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `http://localhost:8000/api/`;
  private currentUserSubject = new BehaviorSubject(null)
  currentUser$ = this.currentUserSubject.asObservable()

  constructor(private http: HttpClient) { }
  
  login(credentials:any){
    return this.http.post(`${this.baseUrl}login`, credentials)
      .pipe(
        tap((response:any) => {
          this.storeToken(response.token)
          this.currentUserSubject.next(response.user)
          console.log(response.user);
          
        }),
        catchError(this.handleError)
      )
  }

  logout(){
    return this.http.post(`${this.baseUrl}logout`, {})
      .pipe(
        tap(response => {
          this.removeToken()
        })
      )
  }

  storeToken(token:string){
    sessionStorage.setItem('token', token)
  }
  removeToken(){
    sessionStorage.removeItem('token')
  }

  getCurrentUser(){
    return this.http.post(`${this.baseUrl}/getUser`, {})
    .pipe(
      tap((user:any) => {
        this.currentUserSubject.next(user)
      }),
      catchError(() => {
        this.removeToken()
        return of(null);
      })
    )
  }




  private handleError(error: HttpErrorResponse) {
    console.log(error);
    
    const appError: AppError = {
      status: error.status,
      message: error.error.message
    }
    // if (error.status === 0) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error.error);
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong.
    //   console.error(
    //     `Backend returned code ${error.status}, body was: `, error.error);
    // }
    // Return an observable with a user-facing error message.
    return throwError(() => appError);
  }
}
