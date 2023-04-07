import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';
import { catchError, throwError } from 'rxjs';
import { AppError } from '../models/app-error';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl = `http://127.0.0.1:8000/api`;
  constructor(private http: HttpClient) { }
  subjects$ = this.http.get<Subject[]>(`${this.baseUrl}/subjects`)

  addSubject(subject:any){
    return this.http.post<Subject[]>(`${this.baseUrl}/subjects`, subject)
      .pipe(
        catchError(this.handleError)
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
