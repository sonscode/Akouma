import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Teacher } from '../teacher';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  static loggedIn: any;

  constructor(private http: HttpClient, private router: Router) { }

  private urlregister = "https://express-users-7hku.onrender.com/api/register"; //connecting to the backend for registration
  register(teacher: Teacher): Observable<any> {
    return this.http.post<any>(this.urlregister, teacher)
  }

  private urllogin = "https://express-users-7hku.onrender.com/api/login"; //connecting to the backend for login
  login(teacher: Teacher): Observable<any> {
    return this.http.post<any>(this.urllogin, teacher)
  }

loggedIn(){
  return !!localStorage.getItem('token')
}

  private urlconnection = "https://express-users-7hku.onrender.com/connection"
  connection(teacher: Teacher) {
    return this.http.post<Teacher>(this.urlconnection, teacher)
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/home'])
  }

  getToken() {
    return localStorage.getItem('token')
  }
  

}
