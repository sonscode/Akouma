import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../report';

@Injectable({
  providedIn: 'root',
})
export class MysqlService {
  private apiUrl = 'http://localhost:3000/api/reports';

  constructor(private http: HttpClient) {}

  // Method to get all reports
  getMark(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl);
  }

  // Method to get a single report by ID
  getReportById(id: number): Observable<Report> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Report>(url);
  }

  // Method to create a new report
  postMark(report: any) {
    return this.http.post<any>(this.apiUrl, report);
  }

  // Method to update an existing report
  putReport(report: Report, id: number): Observable<Report> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Report>(url, report);
  }

  // Method to delete a report by ID
  deleteReport(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
