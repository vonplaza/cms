import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../errorHandling/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = `http://127.0.0.1:8000/api/`;

  constructor(private http: HttpClient) { }

  departments$ = this.http.get(`${this.baseUrl}departments`).pipe(
    catchError(handleError)
  )
}
