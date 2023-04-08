import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `http://127.0.0.1:8000/api`;

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  users$ = this.http.get<User[]>(`${this.baseUrl}/users`);

  updateCurrentUser(profile: any){
    const currentUser = this.authService.currentUser
    
    if(!currentUser.profile){
      const credentials = {...profile, userId: currentUser.id}
      return this.http.post(`${this.baseUrl}/profiles`, credentials)
    }
    const credentials = {...profile, userId: currentUser.profile.id}
    return this.http.patch(`${this.baseUrl}/profiles/${currentUser.profile.id}`, credentials)
  }

  changePass(passwords: any){
    return this.http.post(`${this.baseUrl}/users/changePass`, passwords)
  }

  onUpload(fd: FormData) {
    this.http.post(`${this.baseUrl}/profiles/upload`, fd).subscribe(response => {
      console.log(response);
    });
    console.log(fd)
  }
}
