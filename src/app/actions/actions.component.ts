import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ReportDataComponent } from '../report-data/report-data.component';
import { ReportServiceService } from '../services/report-service.service';
import { MysqlService } from '../services/mysql-service.service';
import { EnrollmentComponent } from '../enrollment/enrollment.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {
  getReportList: any = []
  getEnrollmentList: any = []

  dataSource!: MatTableDataSource<any>

  constructor(private dialog: MatDialog, private api: MysqlService) { }
  
  ngOnInit() {
    this.getReport();
    // this.getPosition(17)
    this.getEnrollment();
  }


  getReport() {
    this.api.getMark()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.getReportList = res;
        },
        error: (err) => {
          alert("Error while fetching marks!");
        }
      })
  }

  openDialog() {
    this.dialog.open(ReportDataComponent, {
      width: "91%", height: "95%", maxWidth: "none"
    }).afterClosed().subscribe({ 
      next: (res) => {
        this.getReport();
 
      }
    })
  }

  editReport(row: any) {
    this.dialog.open(ReportDataComponent, {
      width: "91%", height: "95%", maxWidth: "none",
      data: row
    }).afterClosed().subscribe({
      next: (res) => {
        this.getReport()

      }
    })
  }

  deleteReport(id: any) {
    if (confirm("Confirm delete")) {
      this.api.deleteReport(id).subscribe({
        next: (res) => {
          this.getReport();
        },
        error: () => {
          alert("Sorry! Your marks could not be removed")
        }
      })
    }
  }

// ************************************ENROLLMENTS************************************


  getEnrollment() {
    this.api.getEnrollments()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.getEnrollmentList = res;
          // console.log(this.getEnrollmentList);
          // return this.getEnrollmentList;
        },
        error: (err) => {
          alert("Error while fetching enrollments, try again ...");
        }
      })
  }

  openEnrollment(){
    this.dialog.open(EnrollmentComponent, {
      width: "91%", height: "95%", maxWidth: "none"
    }).afterClosed().subscribe({ 
      next: (res) => {
        this.getEnrollment();
      }
    })
  }

editEnrollment(row: any) {
    this.dialog.open(EnrollmentComponent, {
      width: "91%", height: "95%", maxWidth: "none",
      data: row
    }).afterClosed().subscribe({
      next: (res) => {
        this.getEnrollment();
      }
    })
  }


/*editEnrollment() {
  this.api.getEnrollments().subscribe({
    next: (res) => {
      if (res.length > 0) {
        const enrollmentList = res[0]; // Assuming the first element is the enrollment list
        this.dialog.open(EnrollmentComponent, {
          width: "91%", height: "95%", maxWidth: "none",
          data: enrollmentList
        }).afterClosed().subscribe({
          next: (result) => {
            if (result) {
              this.getEnrollment();
            }
          }
        });
      } else {
        alert("No enrollment list found");
      }
    },
    error: (err) => {
      alert("Error while fetching enrollments!");
    }
  });
}
*/



}
