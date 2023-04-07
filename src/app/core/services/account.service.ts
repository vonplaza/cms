import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = `http://127.0.0.1:8000/api`;

  constructor(private http: HttpClient) { }

  users$ = this.http.get<User[]>(`${this.baseUrl}/users`);

  
}
