import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ReportDataComponent } from '../report-data/report-data.component';
import { ReportServiceService } from '../services/report-service.service';
import { MysqlService } from '../services/mysql-service.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {
  getReportList: any = []

  dataSource!: MatTableDataSource<any>

  constructor(private dialog: MatDialog, private api: MysqlService) { }
  
  ngOnInit() {
    this.getReport();
    // this.getPosition(17)
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



}
