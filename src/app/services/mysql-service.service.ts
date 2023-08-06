import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../report';
import { Enrollment } from '../Enrollment';

@Injectable({
  providedIn: 'root',
})
export class MysqlService {
  // private apiUrl = 'https://mysql-express.onrender.com/api/reports';
  private apiUrl = 'http://localhost:3000/api/reports';
  private enrollUrl = 'http://localhost:3000/api/enrollments';
  // private enrollUrl = 'https://mysql-express.onrender.com/api/enrollments';


  constructor(private http: HttpClient) {}

  // Method to get all reports
  getMark(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl);
  }

  // Method to get a single report by ID
  getReportById(id: any): Observable<Report> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Report>(url);
  }

  // Method to create a new report
  postMark(report: any) {
    return this.http.post<any>(this.apiUrl, report);
  }

  // Method to update an existing report
  putReport(report: Report, id: any): Observable<Report> {
    const url = `${this.apiUrl}/${id}`;
    // Remove the '_id' field from the report object before sending it to the backend
    // delete report._id;
    return this.http.put<Report>(url, report);
  }

  // Method to delete a report by ID
  deleteReport(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }


// **********************************************ENROLLMENTS METHODS********************************************


  //Method to add enrollments...
  postEnrollments(enrollment: any): Observable<Enrollment> {
    return this.http.post<any>(this.enrollUrl, enrollment);
  }

    // Method to get all enrollments
    getEnrollments(): Observable<Enrollment[]> {
      return this.http.get<Enrollment[]>(this.enrollUrl);
    }

      // Method to update an existing enrollments
  putEnrollments(enrollment: Enrollment): Observable<Enrollment> {
    const url = `${this.enrollUrl}`;
    // Remove the '_id' field from the report object before sending it to the backend
    // delete report._id;
    return this.http.put<Enrollment>(url, enrollment);
  }

}
