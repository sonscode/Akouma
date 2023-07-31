import { ParsedEvent } from '@angular/compiler';
import { Component, OnInit, ViewChild, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportServiceService } from '../services/report-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MysqlService } from '../services/mysql-service.service';

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

export class ReportDataComponent {
  markForm !: FormGroup;
  reportList: any = []

  actionBtn: string = "Save";


  constructor(private formbuilder: FormBuilder, private api: MysqlService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<ReportDataComponent>) {
    // api.matchResChanged.subscribe(status=>this.verifyMatch());
  }

  ngOnInit(): void {

    this.checkClone()

    this.markForm = this.formbuilder.group({
      term: ['', Validators.required],
      name: ['', Validators.required],
      class: ['', Validators.required],
      DOB: ['', Validators.nullValidator],
      POB: ['Yaounde', Validators.required],
      enrollment: ['', Validators.required],
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
    { value: 'form4', viewValue: 'Form Four Science' },
    { value: 'form4', viewValue: 'Form Four Art' },
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
    {value: 'Ppass', viewValue: 'PASSED'},
    {value: 'fail', viewValue: 'FAILED'}
  ]


  getTest1() {
    if (this.markForm.value.term === 1) {
      this.markForm.value.test1 = "1st ev./20";
    }
    else if (this.markForm.value.term === 2) {
      this.markForm.value.test1 = "3rd ev./20";
    }
    else if (this.markForm.value.term === 3) {
      this.markForm.value.test1 = "5th ev./20";
    }
    else {
      this.markForm.value.test1 = "Test1 /20";
    }
    return this.markForm.value.test1;
  }

  getTest2() {
    if (this.markForm.value.term === 1) {
      this.markForm.value.test2 = "2nd ev./20";
    }
    else if (this.markForm.value.term === 2) {
      this.markForm.value.test2 = "4th ev./20";
    }
    else if (this.markForm.value.term === 3) {
      this.markForm.value.test2 = "6th ev./20";
    }
    else {
      this.markForm.value.test2 = "Test2 /20";
    }
    return this.markForm.value.test2;
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
            console.log(JSON.stringify(this.markForm.value))
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
    this.api.putReport(this.markForm.value, this.editData._id)
      .subscribe({
        next: (res) => {
          alert("Marks updated successfully!");
          this.markForm.reset();
          this.dialogRef.close('Update');
          // this.getReport()
        },
        error: () => {
          alert("Error while updating the records with id " + this.editData._id);
        }
      })


  }
  //ALERT: GIANT FUNCTION
  // This is to restrict some mks for some classes
  verifyClass() {

    this.markForm.value.econs1 = 0
    this.markForm.value.econs2 = 0
    this.markForm.value.comm1 = 0
    this.markForm.value.comm2 = 0
    this.markForm.value.food1 = 0
    this.markForm.value.food2 = 0


    if (this.markForm.value.class == "Form One") {
      this.markForm.controls['eng1'].enable()
      this.markForm.controls['fre1'].enable()
      this.markForm.controls['math1'].enable()
      this.markForm.controls['hist1'].enable()
      this.markForm.controls['lit1'].enable()
      this.markForm.controls['geo1'].enable()
      this.markForm.controls['citi1'].enable()
      this.markForm.controls['rel1'].enable()
      this.markForm.controls['chem1'].enable()
      this.markForm.controls['bio1'].enable()
      this.markForm.controls['phy1'].enable()
      this.markForm.controls['comp1'].enable()
      this.markForm.controls['sport1'].enable()

      this.markForm.controls['eng2'].enable()
      this.markForm.controls['fre2'].enable()
      this.markForm.controls['math2'].enable()
      this.markForm.controls['hist2'].enable()
      this.markForm.controls['lit2'].enable()
      this.markForm.controls['geo2'].enable()
      this.markForm.controls['citi2'].enable()
      this.markForm.controls['rel2'].enable()
      this.markForm.controls['chem2'].enable()
      this.markForm.controls['bio2'].enable()
      this.markForm.controls['phy2'].enable()
      this.markForm.controls['comp2'].enable()
      this.markForm.controls['sport2'].enable()


      // Disabled tags

      // this.markForm.value['econs1'] = 0
      // this.markForm.value['comm1'] = 0
      // this.markForm.value['acc1'] = 0
      // this.markForm.value['logic1'] = 0
      // this.markForm.value['food1'] = 0
      // this.markForm.value['hb1'] = 0

      // this.markForm.value['econs2'] = 0
      // this.markForm.value['comm2'] = 0
      // this.markForm.value['acc2'] = 0
      // this.markForm.value['logic2'] = 0
      // this.markForm.value['food2'] = 0
      // this.markForm.value['hb2'] = 0

      this.markForm.controls['econs1'].disable()
      this.markForm.controls['comm1'].disable()
      this.markForm.controls['acc1'].disable()
      this.markForm.controls['logic1'].disable()
      this.markForm.controls['food1'].disable()
      this.markForm.controls['hb1'].disable()

      this.markForm.controls['econs2'].disable()
      this.markForm.controls['comm2'].disable()
      this.markForm.controls['acc2'].disable()
      this.markForm.controls['logic2'].disable()
      this.markForm.controls['food2'].disable()
      this.markForm.controls['hb2'].disable()


    }

    else if (this.markForm.value.class == "Form Two") {
      this.markForm.controls['eng1'].enable()
      this.markForm.controls['fre1'].enable()
      this.markForm.controls['math1'].enable()
      this.markForm.controls['hist1'].enable()
      this.markForm.controls['lit1'].enable()
      this.markForm.controls['geo1'].enable()
      this.markForm.controls['citi1'].enable()
      this.markForm.controls['rel1'].enable()
      this.markForm.controls['chem1'].enable()
      this.markForm.controls['bio1'].enable()
      this.markForm.controls['phy1'].enable()
      this.markForm.controls['comp1'].enable()
      this.markForm.controls['sport1'].enable()

      this.markForm.controls['eng2'].enable()
      this.markForm.controls['fre2'].enable()
      this.markForm.controls['math2'].enable()
      this.markForm.controls['hist2'].enable()
      this.markForm.controls['lit2'].enable()
      this.markForm.controls['geo2'].enable()
      this.markForm.controls['citi2'].enable()
      this.markForm.controls['rel2'].enable()
      this.markForm.controls['chem2'].enable()
      this.markForm.controls['bio2'].enable()
      this.markForm.controls['phy2'].enable()
      this.markForm.controls['comp2'].enable()
      this.markForm.controls['sport2'].enable()


      // Disabled tags

      // this.markForm.value['econs1'] = 0
      // this.markForm.value['comm1'] = 0
      // this.markForm.value['acc1'] = 0
      // this.markForm.value['logic1'] = 0
      // this.markForm.value['food1'] = 0
      // this.markForm.value['hb1'] = 0

      // this.markForm.value['econs2'] = 0
      // this.markForm.value['comm2'] = 0
      // this.markForm.value['acc2'] = 0
      // this.markForm.value['logic2'] = 0
      // this.markForm.value['food2'] = 0
      // this.markForm.value['hb2'] = 0

      this.markForm.controls['econs1'].disable()
      this.markForm.controls['comm1'].disable()
      this.markForm.controls['acc1'].disable()
      this.markForm.controls['logic1'].disable()
      this.markForm.controls['food1'].disable()
      this.markForm.controls['hb1'].disable()

      this.markForm.controls['econs2'].disable()
      this.markForm.controls['comm2'].disable()
      this.markForm.controls['acc2'].disable()
      this.markForm.controls['logic2'].disable()
      this.markForm.controls['food2'].disable()
      this.markForm.controls['hb2'].disable()


    }

    else if (this.markForm.value.class == "Form Three") {
      this.markForm.controls['math1'].enable()
      this.markForm.controls['eng1'].enable()
      this.markForm.controls['fre1'].enable()
      this.markForm.controls['hist1'].enable()
      this.markForm.controls['lit1'].enable()
      this.markForm.controls['geo1'].enable()
      this.markForm.controls['econs1'].enable()
      this.markForm.controls['comm1'].enable()
      this.markForm.controls['citi1'].enable()
      this.markForm.controls['rel1'].enable()
      this.markForm.controls['food1'].enable()
      this.markForm.controls['chem1'].enable()
      this.markForm.controls['bio1'].enable()
      this.markForm.controls['phy1'].enable()
      this.markForm.controls['comp1'].enable()
      this.markForm.controls['sport1'].enable()


      // Disabled
      this.markForm.controls['acc1'].disable()
      this.markForm.controls['logic1'].disable()
      this.markForm.controls['hb1'].disable()

      this.markForm.value['acc1'] = 0
      this.markForm.value['logic1'] = 0
      this.markForm.value['hb1'] = 0


      this.markForm.controls['math2'].enable()
      this.markForm.controls['eng2'].enable()
      this.markForm.controls['fre2'].enable()
      this.markForm.controls['hist2'].enable()
      this.markForm.controls['lit2'].enable()
      this.markForm.controls['geo2'].enable()
      this.markForm.controls['econs2'].enable()
      this.markForm.controls['comm2'].enable()
      this.markForm.controls['citi2'].enable()
      this.markForm.controls['rel2'].enable()
      this.markForm.controls['food2'].enable()
      this.markForm.controls['chem2'].enable()
      this.markForm.controls['bio2'].enable()
      this.markForm.controls['phy2'].enable()
      this.markForm.controls['comp2'].enable()
      this.markForm.controls['sport2'].enable()


      // Disabled
      // this.markForm.value['acc2'] = 0
      // this.markForm.value['logic2'] = 0
      // this.markForm.value['hb2'] = 0

      this.markForm.controls['acc2'].disable()
      this.markForm.controls['logic2'].disable()
      this.markForm.controls['hb2'].disable()


    }

    else if (this.markForm.value.class == "Form Four Science") {

      this.markForm.controls['math1'].enable()
      this.markForm.controls['eng1'].enable()
      this.markForm.controls['fre1'].enable()
      this.markForm.controls['geo1'].enable()
      this.markForm.controls['econs1'].enable()
      this.markForm.controls['comm1'].enable()
      this.markForm.controls['citi1'].enable()
      this.markForm.controls['rel1'].enable()
      this.markForm.controls['food1'].enable()
      this.markForm.controls['chem1'].enable()
      this.markForm.controls['bio1'].enable()
      this.markForm.controls['phy1'].enable()
      this.markForm.controls['comp1'].enable()
      this.markForm.controls['sport1'].enable()
      this.markForm.controls['hb1'].enable()


      // Disabled
      // this.markForm.value['acc1'] = 0
      // this.markForm.value['logic1'] = 0
      // this.markForm.value['hist1'] = 0
      // this.markForm.value['lit1'] = 0

      this.markForm.controls['acc1'].disable()
      this.markForm.controls['logic1'].disable()
      this.markForm.controls['hist1'].disable()
      this.markForm.controls['lit1'].disable()


      this.markForm.controls['math2'].enable()
      this.markForm.controls['eng2'].enable()
      this.markForm.controls['fre2'].enable()
      this.markForm.controls['geo2'].enable()
      this.markForm.controls['econs2'].enable()
      this.markForm.controls['comm2'].enable()
      this.markForm.controls['citi2'].enable()
      this.markForm.controls['rel2'].enable()
      this.markForm.controls['food2'].enable()
      this.markForm.controls['chem2'].enable()
      this.markForm.controls['bio2'].enable()
      this.markForm.controls['phy2'].enable()
      this.markForm.controls['comp2'].enable()
      this.markForm.controls['sport2'].enable()
      this.markForm.controls['hb2'].enable()


      // Disabled
      // this.markForm.value['acc2'] = 0
      // this.markForm.value['logic2'] = 0
      // this.markForm.value['hist2'] = 0
      // this.markForm.value['lit2'] = 0

      this.markForm.controls['acc2'].disable()
      this.markForm.controls['logic2'].disable()
      this.markForm.controls['hist2'].disable()
      this.markForm.controls['lit2'].disable()

    }


    else if (this.markForm.value.class == "Form Four Art") {

      this.markForm.controls['math1'].enable()
      this.markForm.controls['eng1'].enable()
      this.markForm.controls['fre1'].enable()
      this.markForm.controls['geo1'].enable()
      this.markForm.controls['econs1'].enable()
      this.markForm.controls['comm1'].enable()
      this.markForm.controls['citi1'].enable()
      this.markForm.controls['rel1'].enable()
      this.markForm.controls['food1'].enable()
      this.markForm.controls['bio1'].enable()
      this.markForm.controls['comp1'].enable()
      this.markForm.controls['sport1'].enable()
      this.markForm.controls['hist1'].enable()
      this.markForm.controls['lit1'].enable()



      // Disabled
      // this.markForm.value.acc1 = 0
      // this.markForm.value.logic1 = 0
      // this.markForm.value.chem1 = 0
      // this.markForm.value.phy1 = 0
      // this.markForm.value.hb1 = 0

      this.markForm.controls['acc1'].disable()
      this.markForm.controls['logic1'].disable()
      this.markForm.controls['chem1'].disable()
      this.markForm.controls['phy1'].disable()
      this.markForm.controls['hb1'].disable()

      this.markForm.controls['math2'].enable()
      this.markForm.controls['eng2'].enable()
      this.markForm.controls['fre2'].enable()
      this.markForm.controls['geo2'].enable()
      this.markForm.controls['econs2'].enable()
      this.markForm.controls['comm2'].enable()
      this.markForm.controls['citi2'].enable()
      this.markForm.controls['rel2'].enable()
      this.markForm.controls['food2'].enable()
      this.markForm.controls['bio2'].enable()

      this.markForm.controls['comp2'].enable()
      this.markForm.controls['sport2'].enable()
      this.markForm.controls['hist2'].enable()
      this.markForm.controls['lit2'].enable()

      // Disabled
      // this.markForm.value['acc2'] = 0
      // this.markForm.value['logic2'] = 0
      // this.markForm.value['chem2'] = 0
      // this.markForm.value['phy2'] = 0
      // this.markForm.value['hb2'] = 0

      this.markForm.controls['acc2'].disable()
      this.markForm.controls['logic2'].disable()
      this.markForm.controls['hb2'].disable()
      this.markForm.controls['chem2'].disable()
      this.markForm.controls['phy2'].disable()

    }


    else {
      this.markForm.controls['eng1'].enable()
      this.markForm.controls['fre1'].enable()
      this.markForm.controls['math1'].enable()
      this.markForm.controls['hist1'].enable()
      this.markForm.controls['lit1'].enable()
      this.markForm.controls['geo1'].enable()
      this.markForm.controls['citi1'].enable()
      this.markForm.controls['rel1'].enable()
      this.markForm.controls['chem1'].enable()
      this.markForm.controls['bio1'].enable()
      this.markForm.controls['phy1'].enable()
      this.markForm.controls['comp1'].enable()
      this.markForm.controls['sport1'].enable()
      this.markForm.controls['eng2'].enable()
      this.markForm.controls['fre2'].enable()
      this.markForm.controls['math2'].enable()
      this.markForm.controls['hist2'].enable()
      this.markForm.controls['lit2'].enable()
      this.markForm.controls['geo2'].enable()
      this.markForm.controls['citi2'].enable()
      this.markForm.controls['rel2'].enable()
      this.markForm.controls['chem2'].enable()
      this.markForm.controls['bio2'].enable()
      this.markForm.controls['phy2'].enable()
      this.markForm.controls['comp2'].enable()
      this.markForm.controls['sport2'].enable()
      this.markForm.controls['econs1'].enable()
      this.markForm.controls['comm1'].enable()
      this.markForm.controls['acc1'].enable()
      this.markForm.controls['logic1'].enable()
      this.markForm.controls['food1'].enable()
      this.markForm.controls['hb1'].enable()
      this.markForm.controls['econs2'].enable()
      this.markForm.controls['comm2'].enable()
      this.markForm.controls['acc2'].enable()
      this.markForm.controls['logic2'].enable()
      this.markForm.controls['food2'].enable()
      this.markForm.controls['hb2'].enable()
    }

  }

  getCoef(subject: any, classe: any): any {
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
  }


  setAverage(): number {
    try {

      var total1: any, total2, total3, total4, total5;
      var sumCoef = eval((this.getCoef("eng", this.markForm.value.class)) + (this.getCoef("fre", this.markForm.value.class)) + (this.getCoef("maths", this.markForm.value.class)) + (this.getCoef("phy", this.markForm.value.class)) + (this.getCoef("chem", this.markForm.value.class)) + (this.getCoef("bio", this.markForm.value.class)) + (this.getCoef("citi", this.markForm.value.class)) + (this.getCoef("comm", this.markForm.value.class)) + (this.getCoef("comp", this.markForm.value.class)) + (this.getCoef("logic", this.markForm.value.class)) + (this.getCoef("sport", this.markForm.value.class)) + (this.getCoef("acc", this.markForm.value.class)) + (this.getCoef("geo", this.markForm.value.class)) + (this.getCoef("rel", this.markForm.value.class)) + (this.getCoef("hb", this.markForm.value.class)) + (this.getCoef("econs", this.markForm.value.class)) + (this.getCoef("food", this.markForm.value.class)) + (this.getCoef("lit", this.markForm.value.class)) + (this.getCoef("hist", this.markForm.value.class)))

      var eng = ((this.markForm.value.eng1 + this.markForm.value.eng2) / 2) * (this.getCoef("eng", this.markForm.value.class))
      var fre = ((this.markForm.value.fre1 + this.markForm.value.fre2) / 2) * (this.getCoef("fre", this.markForm.value.class))
      var math = ((this.markForm.value.math1 + this.markForm.value.math2) / 2) * (this.getCoef("maths", this.markForm.value.class))
      var hist = ((this.markForm.value.hist1 + this.markForm.value.hist2) / 2) * (this.getCoef("hist", this.markForm.value.class))
      var lit = ((this.markForm.value.lit1 + this.markForm.value.lit2) / 2) * (this.getCoef("lit", this.markForm.value.class))
      var geo = ((this.markForm.value.geo1 + this.markForm.value.geo2) / 2) * (this.getCoef("geo", this.markForm.value.class))
      var econs = ((this.markForm.value.econs1 + this.markForm.value.econs2) / 2) * (this.getCoef("econs", this.markForm.value.class))
      var bio = ((this.markForm.value.bio1 + this.markForm.value.bio2) / 2) * (this.getCoef("bio", this.markForm.value.class))
      var comm = ((this.markForm.value.comm1 + this.markForm.value.comm2) / 2) * (this.getCoef("comm", this.markForm.value.class))
      var comp = ((this.markForm.value.comp1 + this.markForm.value.comp2) / 2) * (this.getCoef("comp", this.markForm.value.class))
      var phy = ((this.markForm.value.phy1 + this.markForm.value.phy2) / 2) * (this.getCoef("phy", this.markForm.value.class))
      var food = ((this.markForm.value.food1 + this.markForm.value.food2) / 2) * (this.getCoef("food", this.markForm.value.class))
      var chem = ((this.markForm.value.chem1 + this.markForm.value.chem2) / 2) * (this.getCoef("chem", this.markForm.value.class))
      var sport = ((this.markForm.value.sport1 + this.markForm.value.sport2) / 2) * (this.getCoef("sport", this.markForm.value.class))
      var hb = ((this.markForm.value.hb1 + this.markForm.value.hb2) / 2) * (this.getCoef("hb", this.markForm.value.class))
      var acc = ((this.markForm.value.acc1 + this.markForm.value.acc2) / 2) * (this.getCoef("acc", this.markForm.value.class))
      var rel = ((this.markForm.value.rel1 + this.markForm.value.rel2) / 2) * (this.getCoef("rel", this.markForm.value.class))
      var logic = ((this.markForm.value.logic1 + this.markForm.value.logic2) / 2) * (this.getCoef("logic", this.markForm.value.class))
      var citi = ((this.markForm.value.citi1 + this.markForm.value.citi2) / 2) * (this.getCoef("citi", this.markForm.value.class))

      if (this.markForm.value.class == "Form One") {
        total1 = (eng + fre + math + hist + lit + geo + bio + comp + phy + chem + sport + rel + citi)
        //  total1 = eng + math + fre + hist + lit + geo + bio+ comp + phy
        //  return ( (this.getCoef("eng", this.markForm.value.class))+(this.getCoef("fre", this.markForm.value.class))+(this.getCoef("maths", this.markForm.value.class)) + (this.getCoef("phy", this.markForm.value.class)) + (this.getCoef("chem", this.markForm.value.class)) + (this.getCoef("bio", this.markForm.value.class)) + (this.getCoef("citi", this.markForm.value.class)) + (this.getCoef("comm", this.markForm.value.class)) + (this.getCoef("comp", this.markForm.value.class)) + (this.getCoef("logic", this.markForm.value.class)) + (this.getCoef("sport", this.markForm.value.class)) + (this.getCoef("acc", this.markForm.value.class)) + (this.getCoef("geo", this.markForm.value.class)) + (this.getCoef("rel", this.markForm.value.class)) + (this.getCoef("hb", this.markForm.value.class)) + (this.getCoef("econs", this.markForm.value.class)) + (this.getCoef("food", this.markForm.value.class)) + (this.getCoef("lit", this.markForm.value.class)) + (this.getCoef("hist", this.markForm.value.class)) )
        this.markForm.value.average = (total1 / sumCoef).toFixed(2)
        return eval(this.markForm.value.average)

      } else if (this.markForm.value.class == "Form Two") {
        total2 = (eng + fre + math + hist + lit + geo + bio + comp + phy + chem + sport + rel + citi)
        this.markForm.value.average = (total2 / sumCoef).toFixed(2)
        return eval(this.markForm.value.average)


      }
      else if (this.markForm.value.class == "Form Three") {
        total3 = (eng + fre + math + hist + lit + geo + econs + bio + comm + comp + phy + food + chem + sport + rel + citi)
        this.markForm.value.average = (total3 / sumCoef).toFixed(2)
        return eval(this.markForm.value.average)


      }
      else if (this.markForm.value.class == "Form Four Science") {
        total4 = (eng + fre + math + geo + econs + bio + comm + comp + phy + food + chem + sport + rel + hb + citi)
        this.markForm.value.average = (total4 / sumCoef).toFixed(2)
        return eval(this.markForm.value.average)
      }

      else if (this.markForm.value.class == "Form Four Art") {
        total5 = (eng + fre + math + hist + lit + geo + econs + bio + comm + comp + food + sport + rel + citi)
        this.markForm.value.average = (total5 / sumCoef).toFixed(2)
        return eval(this.markForm.value.average)

      }

      // total = (eng + fre + math + hist + lit + geo + econs + bio + comm + comp + phy + food + chem + sport + hb + acc + rel + logic + citi)
      // var average = total/( (this.getCoef("eng", this.markForm.value.class))+(this.getCoef("fre", this.markForm.value.class))+(this.getCoef("maths", this.markForm.value.class)) + (this.getCoef("phy", this.markForm.value.class)) + (this.getCoef("chem", this.markForm.value.class)) + (this.getCoef("bio", this.markForm.value.class)) + (this.getCoef("citi", this.markForm.value.class)) + (this.getCoef("comm", this.markForm.value.class)) + (this.getCoef("comp", this.markForm.value.class)) + (this.getCoef("logic", this.markForm.value.class)) + (this.getCoef("sport", this.markForm.value.class)) + (this.getCoef("acc", this.markForm.value.class)) + (this.getCoef("geo", this.markForm.value.class)) + (this.getCoef("rel", this.markForm.value.class)) + (this.getCoef("hb", this.markForm.value.class)) + (this.getCoef("econs", this.markForm.value.class)) + (this.getCoef("food", this.markForm.value.class)) + (this.getCoef("lit", this.markForm.value.class)) (this.getCoef("hist", this.markForm.value.class)) )

      // return total;

    } catch (error) {
      console.log("Error occured" + error)
    }
    return 0

  }





}
