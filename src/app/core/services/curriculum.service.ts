import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../errorHandling/errorHandler';
import { Curriculum2 } from '../models/curriculum';


@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private baseUrl = `http://127.0.0.1:8000/api/`;
  constructor(private http: HttpClient) { }

  curriculums$ = this.http.get<Curriculum2[]>(`${this.baseUrl}curriculums`).pipe(
    catchError(handleError)
  )

  revisions$ = this.http.get<Curriculum2[]>(`${this.baseUrl}curriculums/revisions`).pipe(
    catchError(handleError)
  )

}
