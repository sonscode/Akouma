import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-subject-code-dialog',
  templateUrl: './subject-code-dialog.component.html',
  styleUrls: ['./subject-code-dialog.component.css']
})
export class SubjectCodeDialogComponent {
subjectCode: any;
  constructor(
    public dialogRef: MatDialogRef<SubjectCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userEmail: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
