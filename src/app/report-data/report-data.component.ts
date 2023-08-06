import { ParsedEvent } from '@angular/compiler';
import { Component, OnInit, ViewChild, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ReportServiceService } from '../services/report-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MysqlService } from '../services/mysql-service.service';
import { EnrollmentComponent } from '../enrollment/enrollment.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';


interface Sequence {
  value: string;
  viewValue: string;
}

interface Term {
  value: number;
  viewValue: string;
}

interface Class {
  value: string;
  viewValue: string
}

interface Situation {
  value: string;
  viewValue: string;
}

interface Coefficient {
  value: number;
}

interface Master {
  value: string;
  viewValue: string;
}

interface Comment {
  value: string;
  viewValue: string;
}




@Component({
  selector: 'app-report-data',
  templateUrl: './report-data.component.html',
  styleUrls: ['./report-data.component.css']
})

export class ReportDataComponent implements OnInit{
  markForm!: FormGroup;
  reportList: any = []

  actionBtn: string = "Save";
  dataSource: any;
  getEnrollmentList: any = [];
  loadingTestData: boolean = true; // Initialize as true since data is still loading initially
  loadingEnrollmentData: boolean = true; // Initialize as true since data is still loading initially



  constructor(private formbuilder: FormBuilder, private api: MysqlService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<ReportDataComponent>, private dialog: MatDialog) {
    // api.matchResChanged.subscribe(status=>this.verifyMatch());
  }

  ngOnInit(): void {
    this.getReport();
    // this.getEnrollment();
    this.checkClone();
    // this.verifyClass();

    this.markForm = this.formbuilder.group({
      term: ['', Validators.required],
      name: ['', Validators.required],
      class: ['', Validators.required],
      DOB: ['', Validators.required],
      POB: ['Yaounde', Validators.required],
      enrollment: [''],
      // enrollment: [this.getEnrollmentFromClass(), Validators.nullValidator],
      master: ['', Validators.required],
      situation: ['', Validators.required],


      test1: ['', Validators.nullValidator],
      test2: ['', Validators.nullValidator],

      eng1: ['', Validators.nullValidator],
      fre1: ['', Validators.nullValidator],
      math1: ['', Validators.nullValidator],
      hist1: ['', Validators.nullValidator],
      lit1: ['', Validators.nullValidator],
      geo1: ['', Validators.nullValidator],
      econs1: ['', Validators.nullValidator],
      comm1: ['', Validators.nullValidator],
      acc1: ['', Validators.nullValidator],
      citi1: ['', Validators.nullValidator],
      rel1: ['', Validators.nullValidator],
      food1: ['', Validators.nullValidator],
      chem1: ['', Validators.nullValidator],
      bio1: ['', Validators.nullValidator],
      phy1: ['', Validators.nullValidator],
      comp1: ['', Validators.nullValidator],
      sport1: ['', Validators.nullValidator],
      logic1: ['', Validators.nullValidator],
      hb1: ['', Validators.nullValidator],

      eng2: ['', Validators.nullValidator],
      fre2: ['', Validators.nullValidator],
      math2: ['', Validators.nullValidator],
      hist2: ['', Validators.nullValidator],
      lit2: ['', Validators.nullValidator],
      geo2: ['', Validators.nullValidator],
      econs2: ['', Validators.nullValidator],
      comm2: ['', Validators.nullValidator],
      acc2: ['', Validators.nullValidator],
      citi2: ['', Validators.nullValidator],
      rel2: ['', Validators.nullValidator],
      food2: ['', Validators.nullValidator],
      chem2: ['', Validators.nullValidator],
      bio2: ['', Validators.nullValidator],
      phy2: ['', Validators.nullValidator],
      comp2: ['', Validators.nullValidator],
      sport2: ['', Validators.nullValidator],
      logic2: ['', Validators.nullValidator],
      hb2: ['', Validators.nullValidator],
      average: [0, Validators.nullValidator],

      ta: [0, Validators.nullValidator],
      na: [0, Validators.nullValidator],
      punishment: ['/', Validators.nullValidator],
      DC: ['/', Validators.nullValidator],
      DMC: ['/', Validators.nullValidator],
      AMC: ['', Validators.nullValidator],
      paid: [0, Validators.nullValidator],
      owing: [0, Validators.nullValidator],
      summonDate: ['dd-mm-yyyy', Validators.nullValidator],
      summonTime: ['8:00 AM', Validators.nullValidator],
      note: ['Third Term resumes on dd-mm-yyyy', Validators.nullValidator]

    })


  // Fetch enrollment data and update the form control value

  this.api.getEnrollments().subscribe({
    next: (enrollments) => {
      this.getEnrollmentList = enrollments;
      const enrollmentControl = this.markForm.get('enrollment');
      if (enrollmentControl) {
        enrollmentControl.setValue(this.getEnrollmentFromClass());
      }
      this.loadingEnrollmentData = false;
    },
    error: (err) => {
      console.log("Error while fetching enrollments, try again ...", err);
      this.loadingEnrollmentData = false;
    }
  }); 



    if (this.editData) {
      this.actionBtn = "Update";
      this.markForm.controls['term'].setValue(this.editData.term);
      this.markForm.controls['name'].setValue(this.editData.name);
      this.markForm.controls['class'].setValue(this.editData.class);
      this.markForm.controls['DOB'].setValue(this.editData.DOB);
      this.markForm.controls['POB'].setValue(this.editData.POB);
      this.markForm.controls['enrollment'].setValue(this.editData.enrollment);
      this.markForm.controls['master'].setValue(this.editData.master);
      this.markForm.controls['situation'].setValue(this.editData.situation);

      this.markForm.controls['test1'].setValue(this.editData.test1);
      this.markForm.controls['test2'].setValue(this.editData.test2);

      this.markForm.controls['eng1'].setValue(this.editData.eng1);
      this.markForm.controls['fre1'].setValue(this.editData.fre1);
      this.markForm.controls['math1'].setValue(this.editData.math1);
      this.markForm.controls['hist1'].setValue(this.editData.hist1);
      this.markForm.controls['lit1'].setValue(this.editData.lit1);
      this.markForm.controls['geo1'].setValue(this.editData.geo1);
      this.markForm.controls['econs1'].setValue(this.editData.econs1);
      this.markForm.controls['comm1'].setValue(this.editData.comm1);
      this.markForm.controls['acc1'].setValue(this.editData.acc1);
      this.markForm.controls['citi1'].setValue(this.editData.citi1);
      this.markForm.controls['logic1'].setValue(this.editData.logic1);
      this.markForm.controls['rel1'].setValue(this.editData.rel1);
      this.markForm.controls['food1'].setValue(this.editData.food1);
      this.markForm.controls['chem1'].setValue(this.editData.chem1);
      this.markForm.controls['bio1'].setValue(this.editData.bio1);
      this.markForm.controls['phy1'].setValue(this.editData.phy1);
      this.markForm.controls['comp1'].setValue(this.editData.comp1);
      this.markForm.controls['sport1'].setValue(this.editData.sport1);
      this.markForm.controls['hb1'].setValue(this.editData.hb1);

      this.markForm.controls['eng2'].setValue(this.editData.eng2);
      this.markForm.controls['fre2'].setValue(this.editData.fre2);
      this.markForm.controls['math2'].setValue(this.editData.math2);
      this.markForm.controls['hist2'].setValue(this.editData.hist2);
      this.markForm.controls['lit2'].setValue(this.editData.lit2);
      this.markForm.controls['geo2'].setValue(this.editData.geo2);
      this.markForm.controls['econs2'].setValue(this.editData.econs2);
      this.markForm.controls['comm2'].setValue(this.editData.comm2);
      this.markForm.controls['acc2'].setValue(this.editData.acc2);
      this.markForm.controls['citi2'].setValue(this.editData.citi2);
      this.markForm.controls['logic2'].setValue(this.editData.logic2);
      this.markForm.controls['rel2'].setValue(this.editData.rel2);
      this.markForm.controls['food2'].setValue(this.editData.food2);
      this.markForm.controls['chem2'].setValue(this.editData.chem2);
      this.markForm.controls['bio2'].setValue(this.editData.bio2);
      this.markForm.controls['phy2'].setValue(this.editData.phy2);
      this.markForm.controls['comp2'].setValue(this.editData.comp2);
      this.markForm.controls['sport2'].setValue(this.editData.sport2);
      this.markForm.controls['hb2'].setValue(this.editData.hb2);

      this.markForm.controls['average'].setValue(this.editData.average);


      this.markForm.controls['ta'].setValue(this.editData.ta);
      this.markForm.controls['na'].setValue(this.editData.na);
      this.markForm.controls['punishment'].setValue(this.editData.punishment);
      this.markForm.controls['DC'].setValue(this.editData.DC);
      this.markForm.controls['AMC'].setValue(this.editData.AMC);
      this.markForm.controls['DMC'].setValue(this.editData.DMC);
      this.markForm.controls['paid'].setValue(this.editData.paid);
      this.markForm.controls['owing'].setValue(this.editData.owing);
      this.markForm.controls['summonDate'].setValue(this.editData.summonDate);
      this.markForm.controls['summonTime'].setValue(this.editData.summonTime);
      this.markForm.controls['note'].setValue(this.editData.note);


    }




  }

  realFunction(){
   this.api.getEnrollments().subscribe({
    next: (enrollments) => {
      this.getEnrollmentList = enrollments;
      const enrollmentControl = this.markForm.get('enrollment');
      
      if (enrollmentControl) {
        enrollmentControl.setValue(this.getEnrollmentFromClass());
        return this.markForm.get('enrollment');
        
      }
      this.loadingEnrollmentData = false;
      return this.markForm.get('enrollment');
    },
    error: (err) => {
      console.log("Error while fetching enrollments, try again ...");
      this.loadingEnrollmentData = false;
    }
  });
  }

  sequences: Sequence[] = [
    { value: 'seq1', viewValue: '1st ev./20' },
    { value: 'seq2', viewValue: '2nd ev./20' },
    { value: 'seq3', viewValue: '3rd ev./20' },
    { value: 'seq4', viewValue: '4th ev./20' },
    { value: 'seq5', viewValue: '5th ev./20' },
    { value: 'seq6', viewValue: '6th ev./20' }
  ];

  coefficients: Coefficient[] = [
    { value: 1 },
    { value: 3 },
    { value: 5 }
  ]
  terms: Term[] = [
    { value: 1, viewValue: "Term 1" },
    { value: 2, viewValue: "Term 2" },
    { value: 3, viewValue: "Term 3" }
  ]
  classes: Class[] = [
    { value: 'form1', viewValue: 'Form One' },
    { value: 'form2', viewValue: 'Form Two' },
    { value: 'form3', viewValue: 'Form Three' },
    { value: 'form4B', viewValue: 'Form Four Science' },
    { value: 'form4A', viewValue: 'Form Four Art' },
    // { value: 'form4', viewValue: 'Form Five Science' },
    // { value: 'form4', viewValue: 'Form Five Art' },
    // { value: 'form5', viewValue: 'Lower Sixth Science' },
    // { value: 'ls', viewValue: 'Lower Sixth Art' },
    // { value: 'us', viewValue: 'Upper Sixth Science' },
    // { value: 'us', viewValue: 'Upper Sixth Art' }
  ]

  situations: Situation[] = [
    { value: 'repeating', viewValue: 'Repeating' },
    { value: 'not-repeating', viewValue: 'Not repeating' }
  ]

  masters: Master[] = [
    { value: 'sonna', viewValue: 'Mr. Sonna Temgoua' },
    { value: 'munge', viewValue: 'Mrs. Munge Isabell' }
  ]

  comments : Comment[] = [
    {value: 'pass', viewValue: 'PASSED'},
    {value: 'fail', viewValue: 'FAILED'}
  ]

  getReport() {
    this.api.getMark()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.reportList = res;
          this.loadingTestData = false; // Data is fetched, loading is complete
          this.loadingEnrollmentData = false; // Data is fetched, loading is complete
        },
        error: (err) => {
          console.log("Error while fetching marks!");
          // this.getReport();
        }
      })
  }

  getTest1() {
    if (this.reportList) {
    if (this.markForm.value.term == 1) {
      this.markForm.value.test1 = "1st ev. on 20";
    }
    else if (this.markForm.value.term == 2) {
      this.markForm.value.test1 = "3rd ev. on 20";
    }
    else if (this.markForm.value.term == 3) {
      this.markForm.value.test1 = "5th ev. on 20";
    }
    else {
      this.markForm.value.test1 = "Test-1 on 20";
    }
    return this.markForm.value.test1;
  }
  else{
    return 'test values are loading...'
  }


  }

  getTest2() {
    if (this.reportList) {
    if (this.markForm.value.term === 1) {
      this.markForm.value.test2 = "2th ev. on 20";
    }
    else if (this.markForm.value.term === 2) {
      this.markForm.value.test2 = "4th ev. on 20";
    }
    else if (this.markForm.value.term === 3) {
      this.markForm.value.test2 = "6th ev. on 20";
    }
    else {
      this.markForm.value.test2 = "Test-2 on 20";
    }
    return this.markForm.value.test2;
  }
    else{
      return 'test values are loading...'
    }
  }


  addSomeReports() {

    if (!this.editData) {
      this.addReport();
    } else {
      this.editReport();
    }

  }

  addReport() {
    if (this.markForm.valid) {
      this.api.postMark(this.markForm.value)
        .subscribe({
          next: (res) => {
            this.reportList = res;
            alert("Info added successfully");
            this.markForm.reset();
            this.dialogRef.close('Save');
          },
          error: () => {
            alert("Error: Marks could not be added");
            console.log((this.markForm.value))
            // this.getReport()
            // console.log(this.reportList)
          }
        });
    }
  }

  cloneReport() {
    if (this.editData) {
      if (this.markForm.valid) {
        this.api.postMark(this.markForm.value)
          .subscribe({
            next: (res) => {
              this.reportList = res;
              alert("Marks cloned successfully!");
              this.markForm.reset();
              this.dialogRef.close('Save');
            },
            error: () => {
              alert("Error: Marks could not be added");
            }
          });
      }

    } else {
      alert("You can't duplicate empty entries! Save the current one first")
    }
  }

  checkClone() {
    const clone = document.getElementById('cl')
    if (this.editData) {
      clone?.style.setProperty("visibility", "visible")
    } else {
      clone?.style.setProperty("visibility", "hidden")
    }
  }

  editReport() {
    this.api.putReport(this.markForm.value, this.editData?._id)
      .subscribe({
        next: (res) => {
          alert("Marks updated successfully!");
          this.markForm.reset();
          this.dialogRef.close('Update');
          this.getReport();
        },
        error: () => {
          alert("Error while updating the records with id " + this.editData?._id);
          // this.getReport();
        }
      })
  }




  // **************************************************************************************************************

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
          console.log("Error while fetching enrollments, try again ...");
          // this.getEnrollment()
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

  getEnrollmentFromClass(){
    if (this.getEnrollmentList) {
    switch(this.markForm.value.class){
      case "Form One":
        this.markForm.value.enrollment = this.getEnrollmentList[0]['form1']
        break;
      case "Form Two":
        this.markForm.value.enrollment = this.getEnrollmentList[0]['form2']
        break;
      case "Form Three":
        this.markForm.value.enrollment = this.getEnrollmentList[0]['form3']
        break;
      case "Form Four Art":
        this.markForm.value.enrollment = this.getEnrollmentList[0]['form4A']
        break;
      case "Form Four Science":
        this.markForm.value.enrollment = this.getEnrollmentList[0]['form4B']
        break;
      case "Form Five Art":
        this.markForm.value.enrollment = this.getEnrollmentList[0]['form5A']
        break;
      case "Form Five Science":
        this.markForm.value.enrollment = this.getEnrollmentList[0]['form5B']
        break;
      case "Lower Sixth Art":
        this.markForm.value.enrollment = this.getEnrollmentList[0]['LSA']
        break;
      case "Lower Sixth Science":
        this.markForm.value.enrollment = this.getEnrollmentList[0]['LSS']
        break;
      case "Upper Sixth Art":
        this.markForm.value.enrollment = this.getEnrollmentList[0]['USA']
        break;
      case "Upper Sixth Science":
        this.markForm.value.enrollment = this.getEnrollmentList[0]['USS']
        break;
      default:
        this.markForm.value.enrollment = 0
      break;
    }
    return this.markForm.value.enrollment;
  }
  else{
    return 'Enrollment values are being fetched...';
  }

  }

  //ALERT: GIANT FUNCTION
  // This is to restrict some mks for some classes
  verifyClass() {
    const classValue = this.markForm.get('class')?.value;

    if (!classValue) {
      return; // Exit early if classValue is not selected yet
    }

    const enabledFieldsByClass: { [key: string]: string[] } = {
      "Form One": ['eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'citi1', 'rel1', 'chem1', 'bio1', 'phy1', 'comp1', 'sport1',
                   'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'citi2', 'rel2', 'chem2', 'bio2', 'phy2', 'comp2', 'sport2'],
      "Form Two": ['eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'citi1', 'rel1', 'chem1', 'bio1', 'phy1', 'comp1', 'sport1', 
                   'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'citi2', 'rel2', 'chem2', 'bio2', 'phy2', 'comp2', 'sport2'],
      "Form Three": ['eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'econs1', 'comm1','citi1', 'rel1', 'food1', 'chem1', 'bio1', 'phy1', 'comp1', 'sport1',
                     'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'econs2', 'comm2','citi2', 'rel2', 'food2', 'chem2', 'bio2', 'phy2', 'comp2', 'sport2'
    ],
      "Form Four Science": ['eng1', 'fre1', 'math1', 'geo1', 'econs1', 'comm1', 'citi1', 'rel1', 'food1', 'chem1', 'bio1', 'phy1', 'comp1', 'sport1', 'hb1',
                            'eng2', 'fre2', 'math2', 'geo2', 'econs2', 'comm2', 'citi2', 'rel2', 'food2', 'chem2', 'bio2', 'phy2', 'comp2', 'sport2', 'hb2'],
      "Form Four Art": ['eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'econs1', 'comm1', 'citi1', 'rel1', 'food1', 'bio1', 'comp1', 'sport1',
                        'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'econs2', 'comm2', 'citi2', 'rel2', 'food2', 'bio2', 'comp2', 'sport2',]
    };

    const subjectFields: string[] = [
      'eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'econs1', 'comm1', 'acc1', 'citi1', 'rel1', 'food1', 'chem1', 'bio1', 'phy1', 'comp1', 'sport1', 'logic1', 'hb1',
      'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'econs2', 'comm2', 'acc2', 'citi2', 'rel2', 'food2', 'chem2', 'bio2', 'phy2', 'comp2', 'sport2', 'logic2', 'hb2'
      // Add other subject fields here
    ];
  
     // Enable/disable subject fields based on the selected class
  const enabledFields = enabledFieldsByClass[classValue];
  subjectFields.forEach(field => {
    if (enabledFields.includes(field)) {
      this.markForm.controls[field].enable();
    } else {
      this.markForm.controls[field].disable();
    } 
  });
  
    // Calculate and update the average based on the enabled fields for the current class
    this.markForm.value.average = this.setAverage(classValue);  
  }

 /* getCoef(subject: any, classe: any): any {
    var coefficient;
    if (classe == "Form One") {
      switch (subject) {
        case "fre":
          coefficient = 5
          break;
        case "maths":
          coefficient = 5
          break;
        case "eng":
          coefficient = 5
          break;
        case "citi":
          coefficient = 2
          break;
        case "rel":
          coefficient = 2
          break;
        case "comp":
          coefficient = 2
          break;
        case "sport":
          coefficient = 1
          break;
        case "econs":
          coefficient = 0
          break;
        case "acc":
          coefficient = 0
          break;
        case "comm":
          coefficient = 0
          break;
        case "logic":
          coefficient = 0
          break;
        case "food":
          coefficient = 0
          break;
        case "hb":
          coefficient = 0
          break;
        default:
          coefficient = 3
          break;
      }
    }
    else if (classe == "Form Two") {
      switch (subject) {
        case "fre":
          coefficient = 5
          break;
        case "maths":
          coefficient = 5
          break;
        case "eng":
          coefficient = 5
          break;
        case "citi":
          coefficient = 2
          break;
        case "rel":
          coefficient = 2
          break;
        case "comp":
          coefficient = 2
          break;
        case "sport":
          coefficient = 1
          break;
        case "econs":
          coefficient = 0
          break;
        case "acc":
          coefficient = 0
          break;
        case "comm":
          coefficient = 0
          break;
        case "logic":
          coefficient = 0
          break;
        case "food":
          coefficient = 0
          break;
        case "hb":
          coefficient = 0
          break;
        default:
          coefficient = 3
          break;
      }
    }
    else if (classe == "Form Three") {
      switch (subject) {
        case "fre":
          coefficient = 5
          break;
        case "maths":
          coefficient = 5
          break;
        case "eng":
          coefficient = 5
          break;
        case "rel":
          coefficient = 2
          break;
        case "comp":
          coefficient = 2
          break;
        case "sport":
          coefficient = 1
          break;
        case "acc":
          coefficient = 0
          break;
        case "comm":
          coefficient = 2
          break;
        case "logic":
          coefficient = 0
          break;
        case "hb":
          coefficient = 0
          break;
        default:
          coefficient = 3
          break;
      }
    }

    else if (classe == "Form Four Science") {
      switch (subject) {
        case "fre":
          coefficient = 5
          break;
        case "maths":
          coefficient = 5
          break;
        case "eng":
          coefficient = 5
          break;
        case "rel":
          coefficient = 2
          break;
        case "comp":
          coefficient = 2
          break;
        case "sport":
          coefficient = 1
          break;
        case "acc":
          coefficient = 0
          break;
        case "comm":
          coefficient = 2
          break;
        case "logic":
          coefficient = 0
          break;
        case "hist":
          coefficient = 0
          break;
        case "lit":
          coefficient = 0
          break;
        default:
          coefficient = 3
          break;
      }
    }

    else if (classe == "Form Four Art") {
      switch (subject) {
        case "fre":
          coefficient = 5
          break;
        case "maths":
          coefficient = 5
          break;
        case "eng":
          coefficient = 5
          break;
        case "rel":
          coefficient = 2
          break;
        case "comp":
          coefficient = 2
          break;
        case "sport":
          coefficient = 1
          break;
        case "acc":
          coefficient = 0
          break;
        case "comm":
          coefficient = 2
          break;
        case "logic":
          coefficient = 0
          break;
        case "hb":
          coefficient = 0
          break;
        case "phy":
          coefficient = 0
          break;
        case "chem":
          coefficient = 0
          break;
        default:
          coefficient = 3
          break;
      }
    }
    else {
      switch (subject) {
        case "fre":
          coefficient = 5
          break;
        case "maths":
          coefficient = 5
          break;
        case "eng":
          coefficient = 5
          break;
        case "citi":
          coefficient = 2
          break;
        case "rel":
          coefficient = 2
          break;
        case "comp":
          coefficient = 2
          break;
        case "sport":
          coefficient = 1
          break;
        case "econs":
          coefficient = 0
          break;
        case "acc":
          coefficient = 0
          break;
        case "comm":
          coefficient = 0
          break;
        case "logic":
          coefficient = 0
          break;
        case "food":
          coefficient = 0
          break;
        case "hb":
          coefficient = 0
          break;
        default:
          coefficient = 3
          break;
      }
    }

    return coefficient;
  } */

  getCoef(subject: string, classe: string): number {
    const coefficientsByClass: { [key: string]: { [key: string]: number } } = {
      "Form One": {
        fre: 5, maths: 5, eng: 5, citi: 2, rel: 2, comp: 2, sport: 1, econs: 0, acc: 0, comm: 0, logic: 0, food: 0, hb: 0
      },
      "Form Two": {
        fre: 5, maths: 5, eng: 5, citi: 2, rel: 2, comp: 2, sport: 1, econs: 0, acc: 0, comm: 0, logic: 0, food: 0, hb: 0
      },
      "Form Three": {
        fre: 5, maths: 5, eng: 5, rel: 2, comp: 2, sport: 1, acc: 0, comm: 2, logic: 0, hb: 0
      },
      "Form Four Science": {
        fre: 5, maths: 5, eng: 5, rel: 2, comp: 2, sport: 1, acc: 0, comm: 2, logic: 0, hist: 0, lit: 0
      },
      "Form Four Art": {
        fre: 5, maths: 5, eng: 5, rel: 2, comp: 2, sport: 1, acc: 0, comm: 2, logic: 0, hb: 0, phy: 0, chem: 0
      },
      // ... add other classes and subjects here
    };
  
    const classCoefficients = coefficientsByClass[classe] || {};
    const coefficient = classCoefficients[subject] || 3;
  
    return coefficient;
  }
  

  setAverage(classValue: string): number {
    const enabledFields = [
      'eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'citi1', 'rel1', 'chem1', 'bio1', 'phy1', 'comp1', 'sport1',
      'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'citi2', 'rel2', 'chem2', 'bio2', 'phy2', 'comp2', 'sport2',
      'econs1', 'comm1', 'acc1', 'logic1', 'food1', 'hb1',
      'econs2', 'comm2', 'acc2', 'logic2', 'food2', 'hb2'
    ];
  
    let total = 0;
    let sumCoef = 0;
  
    enabledFields.forEach(field => {
      const value = this.markForm.value[field];
      if ( value !== undefined && this.getCoef(field, classValue)) {
        total += (value) * this.getCoef(field, classValue);
        sumCoef += this.getCoef(field, classValue);
        console.log('coef: ', this.getCoef(field, classValue));

      }
    });
  
    if (sumCoef === 0) {
      return 0;
    }
    console.log('TOTAL: ', total)
    console.log('Sum COEF: ', sumCoef)
    return +(total / sumCoef).toFixed(2);
  }
  



}

