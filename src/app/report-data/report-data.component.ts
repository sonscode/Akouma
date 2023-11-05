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
import { AuthApiService } from '../services/auth-api.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';


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



  constructor(private formbuilder: FormBuilder, private api: MysqlService, private authapi: AuthApiService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<ReportDataComponent>, private dialog: MatDialog, private authService: SocialAuthService) {
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
      average: [Validators.nullValidator],

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
      note: ['', Validators.nullValidator]

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
// IMPLEMENTING LOGOUT FXN
  logout(){
    if (confirm("Logout?")) {
    this.authapi.logout();
    this.authService.signOut();

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
      console.log("Error while fetching enrollments, trying again ...");
      this.loadingEnrollmentData = false;
    }
  });
  }

  sequences: Sequence[] = [
    { value: 'seq1', viewValue: '1st ev.' },
    { value: 'seq2', viewValue: '2nd ev.' },
    { value: 'seq3', viewValue: '3rd ev.' },
    { value: 'seq4', viewValue: '4th ev.' },
    { value: 'seq5', viewValue: '5th ev.' },
    { value: 'seq6', viewValue: '6th ev.' }
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
    { value: 'form5B', viewValue: 'Form Five Science' },
    { value: 'form5A', viewValue: 'Form Five Art' },
    { value: 'LSA', viewValue: 'Lower Sixth Science' },
    { value: 'LSS', viewValue: 'Lower Sixth Art' },
    { value: 'USA', viewValue: 'Upper Sixth Science' },
    { value: 'USS', viewValue: 'Upper Sixth Art' }
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
      this.markForm.value.test1 = "1st ev.";
    }
    else if (this.markForm.value.term == 2) {
      this.markForm.value.test1 = "3rd ev.";
    }
    else if (this.markForm.value.term == 3) {
      this.markForm.value.test1 = "5th ev.";
    }
    else {
      this.markForm.value.test1 = "Test-1";
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
      this.markForm.value.test2 = "2nd ev.";
    }
    else if (this.markForm.value.term === 2) {
      this.markForm.value.test2 = "4th ev.";
    }
    else if (this.markForm.value.term === 3) {
      this.markForm.value.test2 = "6th ev.";
    }
    else {
      this.markForm.value.test2 = "Test-2";
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
            console.log((this.markForm.value))

          },
          error: () => {
            alert("Error: Marks could not be added");
            this.getReport()
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
          // console.log((this.markForm.value))

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
        // this.getEnrollment();
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
                        'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'econs2', 'comm2', 'citi2', 'rel2', 'food2', 'bio2', 'comp2', 'sport2',],
      "Form Five Science": ['eng1', 'fre1', 'math1', 'geo1', 'econs1', 'comm1', 'citi1', 'rel1', 'food1', 'chem1', 'bio1', 'phy1', 'comp1', 'sport1', 'hb1',
                        'eng2', 'fre2', 'math2', 'geo2', 'econs2', 'comm2', 'citi2', 'rel2', 'food2', 'chem2', 'bio2', 'phy2', 'comp2', 'sport2', 'hb2'],
      "Form Five Art": ['eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'econs1', 'comm1', 'citi1', 'rel1', 'food1', 'bio1', 'comp1', 'sport1',
                        'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'econs2', 'comm2', 'citi2', 'rel2', 'food2', 'bio2', 'comp2', 'sport2',],
      "Lower Sixth Art": ['eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'econs1', 'comm1', 'citi1', 'rel1', 'food1', 'bio1', 'comp1', 'sport1',
                        'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'econs2', 'comm2', 'citi2', 'rel2', 'food2', 'bio2', 'comp2', 'sport2',],
      "Lower Sixth Science": ['eng1', 'fre1', 'math1', 'geo1', 'econs1', 'comm1', 'citi1', 'rel1', 'food1', 'chem1', 'bio1', 'phy1', 'comp1', 'sport1', 'hb1',
                        'eng2', 'fre2', 'math2', 'geo2', 'econs2', 'comm2', 'citi2', 'rel2', 'food2', 'chem2', 'bio2', 'phy2', 'comp2', 'sport2', 'hb2'],
      "Upper Sixth Art": ['eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'econs1', 'comm1', 'citi1', 'rel1', 'food1', 'bio1', 'comp1', 'sport1',
                        'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'econs2', 'comm2', 'citi2', 'rel2', 'food2', 'bio2', 'comp2', 'sport2',],
      "Upper Sixth Science": ['eng1', 'fre1', 'math1', 'geo1', 'econs1', 'comm1', 'citi1', 'rel1', 'food1', 'chem1', 'bio1', 'phy1', 'comp1', 'sport1', 'hb1',
                        'eng2', 'fre2', 'math2', 'geo2', 'econs2', 'comm2', 'citi2', 'rel2', 'food2', 'chem2', 'bio2', 'phy2', 'comp2', 'sport2', 'hb2'],
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
      this.markForm.controls[field].setValue(null);
      // this.markForm.value[field] = null;
      // console.log(field, this.markForm.value[field])
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

  getCoef(subjectValue: any, classe: string): number {

    const subjectFields = [
      'eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'econs1', 'comm1', 'citi1', 'rel1', 'food1', 'chem1', 'bio1', 'phy1', 'comp1', 'sport1',
      'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'econs2', 'comm2','citi2', ' rel2', 'food2', 'chem2', 'bio2', 'phy2', 'comp2', 'sport2',
        'acc1', 'logic1', 'hb1',
        'acc2', 'logic2', 'hb2'
    ];
    const coefficientsByClass: { [key: string]: { [key: string]: number } } = {
      "Form One": {
        fre1: 5, math1: 5, eng1: 5, citi1: 2, rel1: 2, comp1: 2, sport1: 1, econs1: 0, acc1: 0, comm1: 0, logic1: 0, food1: 0, hb1: 0, chem1: 3, phy1: 3, bio1: 3, hist1: 3, lit1: 3, geo1: 3,
        fre2: 5, math2: 5, eng2: 5, citi2: 2, rel2: 2, comp2: 2, sport2: 1, econs2: 0, acc2: 0, comm2: 0, logic2: 0, food2: 0, hb2: 0, chem2: 3, phy2: 3, bio2: 3, hist2: 3, lit2: 3, geo2: 3
      },
      "Form Two": {
        fre1: 5, math1: 5, eng1: 5, citi1: 2, rel1: 2, comp1: 2, sport1: 1, econs1: 0, acc1: 0, comm1: 0, logic1: 0, food1: 0, hb1: 0, chem1: 3, phy1: 3, bio1: 3, hist1: 3, lit1: 3, geo1: 3,
        fre2: 5, math2: 5, eng2: 5, citi2: 2, rel2: 2, comp2: 2, sport2: 1, econs2: 0, acc2: 0, comm2: 0, logic2: 0, food2: 0, hb2: 0, chem2: 3, phy2: 3, bio2: 3, hist2: 3, lit2: 3, geo2: 3
      },
      "Form Three": {
        fre1: 5, math1: 5, eng1: 5, rel1: 2, comp1: 2, sport1: 1, acc1: 0, comm1: 2, logic1: 0, hb1: 0, chem1: 3, phy1: 3, econs1: 3, bio1: 3, hist1: 3, lit1: 3, geo1: 3, citi1: 3, food1: 3,
        fre2: 5, math2: 5, eng2: 5, rel2: 2, comp2: 2, sport2: 1, acc2: 0, comm2: 2, logic2: 0, hb2: 0, chem2: 3, phy2: 3, econs2: 3, bio2: 3, hist2: 3, lit2: 3, geo2: 3, citi2: 3, food2: 3
      },
      "Form Four Science": {
        fre1: 5, math1: 5, eng1: 5, rel1: 2, comp1: 2, sport1: 1, acc1: 0, comm1: 2, logic1: 0, hist1: 0, lit1: 0, chem1: 3, phy1: 3, econs1: 3, bio1: 3, geo1: 3, hb1: 3, food1: 3, citi1: 3,
        fre2: 5, math2: 5, eng2: 5, rel2: 2, comp2: 2, sport2: 1, acc2: 0, comm2: 2, logic2: 0, hist2: 0, lit2: 0, chem2: 3, phy2: 3, econs2: 3, bio2: 3, geo2: 3, hb2: 3, food2: 3, citi2: 3
      },
      "Form Four Art": {
        fre1: 5, math1: 5, eng1: 5, rel1: 2, comp1: 2, sport1: 1, acc1: 0, comm1: 2, logic1: 0, hb1: 0, phy1: 0, chem1: 0, econs1: 3, bio1: 3, hist1: 3, lit1: 3, geo1: 3, food1: 3, citi1: 3,
        fre2: 5, math2: 5, eng2: 5, rel2: 2, comp2: 2, sport2: 1, acc2: 0, comm2: 2, logic2: 0, hb2: 0, phy2: 0, chem2: 0, econs2: 3, bio2: 3, hist2: 3, lit2: 3, geo2: 3, food2: 3, citi2: 3
      },
      "Form Five Science": {
        fre1: 5, math1: 5, eng1: 5, rel1: 2, comp1: 2, sport1: 1, acc1: 0, comm1: 2, logic1: 0, hist1: 0, lit1: 0, chem1: 3, phy1: 3, econs1: 3, bio1: 3, geo1: 3, hb1: 3, food1: 3, citi1: 3,
        fre2: 5, math2: 5, eng2: 5, rel2: 2, comp2: 2, sport2: 1, acc2: 0, comm2: 2, logic2: 0, hist2: 0, lit2: 0, chem2: 3, phy2: 3, econs2: 3, bio2: 3, geo2: 3, hb2: 3, food2: 3, citi2: 3
      },
      "Form Five Art": {
        fre1: 5, math1: 5, eng1: 5, rel1: 2, comp1: 2, sport1: 1, acc1: 0, comm1: 2, logic1: 0, hb1: 0, phy1: 0, chem1: 0, econs1: 3, bio1: 3, hist1: 3, lit1: 3, geo1: 3, food1: 3, citi1: 3,
        fre2: 5, math2: 5, eng2: 5, rel2: 2, comp2: 2, sport2: 1, acc2: 0, comm2: 2, logic2: 0, hb2: 0, phy2: 0, chem2: 0, econs2: 3, bio2: 3, hist2: 3, lit2: 3, geo2: 3, food2: 3, citi2: 3
      },
      "Lower Sixth Art": {
        fre1: 5, math1: 5, eng1: 5, rel1: 2, comp1: 2, sport1: 1, acc1: 0, comm1: 2, logic1: 0, hb1: 0, phy1: 0, chem1: 0, econs1: 3, bio1: 3, hist1: 3, lit1: 3, geo1: 3, food1: 3, citi1: 3,
        fre2: 5, math2: 5, eng2: 5, rel2: 2, comp2: 2, sport2: 1, acc2: 0, comm2: 2, logic2: 0, hb2: 0, phy2: 0, chem2: 0, econs2: 3, bio2: 3, hist2: 3, lit2: 3, geo2: 3, food2: 3, citi2: 3
      },
      "Lower Sixth Science": {
        fre1: 5, math1: 5, eng1: 5, rel1: 2, comp1: 2, sport1: 1, acc1: 0, comm1: 2, logic1: 0, hb1: 0, phy1: 0, chem1: 0, econs1: 3, bio1: 3, hist1: 3, lit1: 3, geo1: 3, food1: 3, citi1: 3,
        fre2: 5, math2: 5, eng2: 5, rel2: 2, comp2: 2, sport2: 1, acc2: 0, comm2: 2, logic2: 0, hb2: 0, phy2: 0, chem2: 0, econs2: 3, bio2: 3, hist2: 3, lit2: 3, geo2: 3, food2: 3, citi2: 3
      },
      "Upper Sixth Art": {
        fre1: 5, math1: 5, eng1: 5, rel1: 2, comp1: 2, sport1: 1, acc1: 0, comm1: 2, logic1: 0, hb1: 0, phy1: 0, chem1: 0, econs1: 3, bio1: 3, hist1: 3, lit1: 3, geo1: 3, food1: 3, citi1: 3,
        fre2: 5, math2: 5, eng2: 5, rel2: 2, comp2: 2, sport2: 1, acc2: 0, comm2: 2, logic2: 0, hb2: 0, phy2: 0, chem2: 0, econs2: 3, bio2: 3, hist2: 3, lit2: 3, geo2: 3, food2: 3, citi2: 3
      },
      "Upper Sixth Science": {
        fre1: 5, math1: 5, eng1: 5, rel1: 2, comp1: 2, sport1: 1, acc1: 0, comm1: 2, logic1: 0, hb1: 0, phy1: 0, chem1: 0, econs1: 3, bio1: 3, hist1: 3, lit1: 3, geo1: 3, food1: 3, citi1: 3,
        fre2: 5, math2: 5, eng2: 5, rel2: 2, comp2: 2, sport2: 1, acc2: 0, comm2: 2, logic2: 0, hb2: 0, phy2: 0, chem2: 0, econs2: 3, bio2: 3, hist2: 3, lit2: 3, geo2: 3, food2: 3, citi2: 3
      },

      // ... add other classes and subjects here
    };
  
    // console.log(coefficientsByClass[classe][subject])
    // console.log(subject, 'Coefficient',coefficient)
    let coefficient = 0;
    let classCoefficients: any;

    subjectFields.forEach(subject => {
       classCoefficients = coefficientsByClass[classe] || {};
       coefficient = classCoefficients[subject] || 3;

        if (subjectValue == subject) {
          coefficient = classCoefficients[subjectValue];
          // console.log(classe, subject, classCoefficients[subjectValue])
        }

      });

      // console.log (classCoefficients[subjectValue]);
      return classCoefficients[subjectValue];
      
    // return classCoefficients[subjectValue];
  }
  

  setAverage(classValue: string): any {

    const subjectFields = [
      'eng', 'fre', 'math', 'hist', 'lit', 'geo', 'citi', 'rel', 'chem', 'bio', 'phy', 'comp', 'sport',
      'econs', 'comm', 'acc', 'logic', 'food', 'hb'
    ]

    const enabledFields = [
      'eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'econs1', 'comm1', 'citi1', 'rel1', 'chem1', 'bio1', 'phy1', 'comp1', 'sport1',
      'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'econs2', 'comm2','citi2', 'rel2', 'chem2', 'bio2', 'phy2', 'comp2', 'sport2',
       'acc1', 'logic1', 'food1', 'hb1',
       'acc2', 'logic2', 'food2', 'hb2'
    ];
  
    let total = 0;
    let sumCoef = 0;
    let av = 0;
  
    enabledFields.forEach(subfield => {
      let value = this.markForm.value[subfield];
      const fieldKeys = Object.keys(this.markForm.value);

        if (fieldKeys.includes(subfield)) {
          // console.log(`${subfield} is present in fieldKeys`);
          if ( value !== undefined && this.getCoef(subfield, classValue)) {
            total += (value) * this.getCoef(subfield, classValue);
            sumCoef += this.getCoef(subfield, classValue);
            // console.log(subfield, sumCoef)
            // console.log(subfield, total, this.getCoef(subfield, classValue))
          } else if (value == null) {
            value = 0;
            total += (value) * this.getCoef(subfield, classValue);
            sumCoef += this.getCoef(subfield, classValue);
            // console.log(subfield, sumCoef)
          }
        }

      // console.log('value', value)
      // console.log('math', this.getCoef("math1", classValue))
    });
  
    if (sumCoef === 0) {
      return 0;
    }
    av = ((total/2) / (sumCoef/2))
    // console.log(classValue, this.getCoef(classValue))
    return av;
  }
  



}

