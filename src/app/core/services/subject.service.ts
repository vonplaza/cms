import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';
import { BehaviorSubject, catchError, combineLatest, map, tap} from 'rxjs';
import { handleError } from '../errorHandling/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl = `http://127.0.0.1:8000/api`;
  constructor(private http: HttpClient) { }
  subjectAdd$ = new BehaviorSubject<Subject | null>(null);

  subjects$ = this.http.get<Subject[]>(`${this.baseUrl}/subjects`)

  addSubject(subject:any){
    return this.http.post<Subject[]>(`${this.baseUrl}/subjects`, subject)
      .pipe(
        tap((data:any) => {
          this.subjectAdd$.next(data)
        }),
        catchError(handleError)
      )
  }

  editElectiveSubject(data:any[], id:number){
    const body = {
      elective_1: data[0],
      elective_2: data[1],
      elective_3: data[2],
      elective_4: data[3],
      elective_5: data[4],
    }

    return this.http.patch(`${this.baseUrl}/electiveSubjects/${id}`, body)
      .pipe(

        catchError(handleError)
      )
  }

  electiveSubjects$ = this.http.get<any[]>(`${this.baseUrl}/electiveSubjects`).pipe(
    map(electiveSubjs => electiveSubjs.map(electiveSubj => {
      return {
        track: electiveSubj.track, 
        description: [
          electiveSubj.elective_1,
          electiveSubj.elective_2,
          electiveSubj.elective_3,
          electiveSubj.elective_4,
          electiveSubj.elective_5,
        ]
      }
    })),
    catchError(handleError)
  )

  subjectsComplete$ = combineLatest([
    this.subjects$,
    this.subjectAdd$
  ]).pipe(
    map(([subjects, addSubject]) => {
      if(!addSubject)
        return subjects
      return [...subjects, addSubject]
    })
  )
  
  removeSubject(id:number, data:any){
    return this.http.patch<Subject>(`${this.baseUrl}/subjects/${id}`, data)
      .pipe(
        catchError(handleError)
      )
  }
}
