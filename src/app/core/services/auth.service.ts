import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';
import { AppError } from '../models/app-error';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `http://localhost:8000/api/`;
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  currentUser$ = this.currentUserSubject.asObservable()
  currentUser!:User
  constructor(private http: HttpClient) { }
  
  login(credentials:any){
    return this.http.post(`${this.baseUrl}login`, credentials)
      .pipe(
        tap((response:any) => {
          this.storeToken(response.token)
          this.currentUserSubject.next(response.user)
          this.currentUser = response.user
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
    if(this.currentUser)
      return of(this.currentUser)
    
    return this.http.post(`${this.baseUrl}getUser`, {})
    .pipe(
      tap((user:any) => {
        this.currentUserSubject.next(user)
        this.currentUser = user
      }),
      catchError(() => {
        // this.removeToken()
        return of(null);
      })
    )
  }

  updateProfile(profile:any){
    const updatedUser = {...this.currentUser, profile: profile}
    this.currentUserSubject.next(updatedUser)
    this.currentUser = updatedUser
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
