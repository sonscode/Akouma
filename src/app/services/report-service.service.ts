import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http: HttpClient) { }


  postMark(data: any) {
    return this.http.post<any>("http://localhost:3001/reportList/", data);
  }

  getMark() {
    return this.http.get<any>("http://localhost:3001/reportList/");
  }

  putReport(data: any, id: number) {
    return this.http.put<any>("http://localhost:3001/reportList/" + id, data);
  }

  deleteReport(id: number) {
    return this.http.delete<any>("http://localhost:3001/reportList/" + id);
  }


}
