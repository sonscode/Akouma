import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Teacher } from '../teacher';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  static loggedIn: any;
  static isGoogleLoggedIn: any;

  constructor(private http: HttpClient, private router: Router, private authService: SocialAuthService) { }

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

isGoogleLoggedIn() {
  return this.authService.authState
    .pipe(
      map((user) => {
        if (user) {
          // Check if the provider is Google
          return user.provider === GoogleLoginProvider.PROVIDER_ID;
        }
        return false;
      })
    );
}

  private urlconnection = "https://express-users-7hku.onrender.com/connection"
  connection(teacher: Teacher) {
    return this.http.post<Teacher>(this.urlconnection, teacher)
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('token')
  }
  

}
