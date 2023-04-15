import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { handleError } from '../errorHandling/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private baseUrl = `http://localhost:8000/api/`;

  constructor(private http: HttpClient) { }

  private contentSubject = new BehaviorSubject<any | null>(null);
  contentAction$ = this.contentSubject.asObservable()

  content$ = this.http.get<any>(`${this.baseUrl}contents`).pipe(
    tap(data => {
      this.contentSubject.next(data)
    }),
    catchError(handleError)
  )
  
  updateContent(data:any){
    return this.http.post<any>(`${this.baseUrl}content`, data).pipe(
      tap(data => {        
        this.contentSubject.next(data)
      }),
      catchError(handleError)
    )
  }
}
