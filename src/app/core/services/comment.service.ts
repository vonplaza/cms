import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, tap } from 'rxjs';
import { handleError } from '../errorHandling/errorHandler';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = `http://localhost:8000/api/`;

  constructor(private http: HttpClient) { }

  commentSuccess = new Subject();

  comments$ = this.http.get<Comment[]>(`${this.baseUrl}comments`).pipe(
    catchError(handleError)
  )
  
  getCurriculumComments(id: number){
    return this.http.get<Comment[]>(`${this.baseUrl}comments`).pipe(
      map(comments => comments.filter(comment => comment.curriculum_id == id)),
      catchError(handleError)
    )
  }
  getRevisionComments(id: number){
    return this.http.get<Comment[]>(`${this.baseUrl}comments`).pipe(
      map(comments => comments.filter(comment => comment.curriculum_revision_id == id)),
      catchError(handleError)
    )
  }
  addComment(data:any){
    return this.http.post<Comment>(`${this.baseUrl}comments`, data).pipe(
      tap(data => this.commentSuccess.next('success'))
    )
  }
}
