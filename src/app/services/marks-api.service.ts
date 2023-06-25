import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MarksApiService {

  constructor(private http: HttpClient, private router: Router) { }

private homeUrl = "https://express-users-7hku.onrender.com/api/home";
private marksUrl = "https://express-users-7hku.onrender.com/api/marks";

getMarksfromApi(){
  return this.http.get<any>(this.marksUrl)
}

getHomeData(){
  return this.http.get<any>(this.homeUrl)
}


}
