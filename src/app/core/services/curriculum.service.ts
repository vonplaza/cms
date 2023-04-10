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

  revisions$ = this.http.get(`${this.baseUrl}curriculums/revisions`).pipe(
    catchError(handleError)
  )

  createCurriculum(cur: any){
    return this.http.post(`${this.baseUrl}curriculums`, cur).pipe(
      catchError(handleError)
    )
  }
  getCurriculum(id: number){
    return this.http.get<Curriculum2>(`${this.baseUrl}curriculums/${id}`).pipe(
      catchError(handleError)
    )
  }
  updateCurriculum(id:number, data:any){
    return this.http.patch<Curriculum2>(`${this.baseUrl}curriculums/${id}`, data).pipe(
      catchError(handleError)
    )
  }

  // revise
  getRevisionCurriculum(id: number){
    return this.http.get(`${this.baseUrl}curriculums/revisions/${id}`).pipe(
      catchError(handleError)
    )
  }

  createRevision(data:any){
    return this.http.post(`${this.baseUrl}curriculums/submitRevision`, data).pipe(
      catchError(handleError)
    )
  }
}