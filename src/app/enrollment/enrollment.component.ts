import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MysqlService } from '../services/mysql-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent {
  markForm !: FormGroup;
  actionBtn: string = "Save";
  dataSource: any;
  enrollmentList: any = []
  enrollmentListExists: boolean = false;
  loadingEnrollmentData = false;


  constructor(private formbuilder: FormBuilder, private api: MysqlService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<EnrollmentComponent>) {
    // api.matchResChanged.subscribe(status=>this.verifyMatch());
  }

  ngOnInit(): void{
    this.getEnrollment();
// Assuming you fetch enrollment data and assign it to some variable like enrollments

  this.markForm = this.formbuilder.group({
    form1: ['', Validators.required],
    form2: ['', Validators.required],
    form3: ['', Validators.required],
    form4A: ['', Validators.required],
    form4B: ['', Validators.required],
    form5A: ['', Validators.required],
    form5B: ['', Validators.required],
    LSA: ['', Validators.required],
    LSS: ['', Validators.required],
    USA: ['', Validators.required],
    USS: ['', Validators.required],
  })


  if (this.editData) {
    this.actionBtn = "Update";
    this.markForm.controls['form1'].setValue(this.editData.form1);
    this.markForm.controls['form2'].setValue(this.editData.form2);
    this.markForm.controls['form3'].setValue(this.editData.form3);
    this.markForm.controls['form4A'].setValue(this.editData.form4A);
    this.markForm.controls['form4B'].setValue(this.editData.form4B);
    this.markForm.controls['form5A'].setValue(this.editData.form5A);
    this.markForm.controls['form5B'].setValue(this.editData.form5B);
    this.markForm.controls['LSA'].setValue(this.editData.LSA);
    this.markForm.controls['LSS'].setValue(this.editData.LSS);
    this.markForm.controls['USA'].setValue(this.editData.USA);
    this.markForm.controls['USS'].setValue(this.editData.USS);
  }


}





getEnrollment() {
  this.api.getEnrollments()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.enrollmentList = res;
        this.enrollmentListExists = this.enrollmentList.length > 0;
        console.log("Enrollment length ", this.enrollmentList.length)
      },
      error: (err) => {
        console.log("Error while fetching enrollments!");
        this.getEnrollment();
      }
    })
}

addSomeEnrollments() {
  
  if (!this.editData) {
    this.addEnrollment();
  } else {
    this.editEnrollment();
  }
}

addEnrollment() {
  if (this.markForm.valid) {
    this.api.postEnrollments(this.markForm.value)
      .subscribe({
        next: (res) => {
          this.enrollmentList = res;
          alert("Class enrollments added successfully...");
          this.markForm.reset();
          this.dialogRef.close('Save');
        },
        error: () => {
          alert("Error: Enrollments could not be added");
          console.log((this.markForm.value))
          // console.log(this.enrollmentList)
        }
      });
  }
}

editEnrollment() {
  this.loadingEnrollmentData = true; // Set loading flag
  this.api.putEnrollments(this.markForm.value)
    .subscribe({
      next: (res) => {
        alert("Class enrollments updated successfully...");
        this.markForm.reset();
        this.dialogRef.close('Update');
        // this.getReport()
      },
      error: () => {
        alert("Error while updating the enrollments with id " + this.editData._id);
        this.getEnrollment();
      },
      complete: () => {
        this.loadingEnrollmentData = false; // Reset loading flag
      }
    })
}


}
