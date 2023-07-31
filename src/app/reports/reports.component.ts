import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ReportDataComponent } from '../report-data/report-data.component';
import { ReportServiceService } from '../services/report-service.service';
import { ActionsComponent } from '../actions/actions.component';
import { MysqlService } from '../services/mysql-service.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})


export class ReportsComponent {
  getReportList: any = []
  coef: any;
  teacher: any;
  el: any;
  el2: any;
  markArray = []
  showAddButton: boolean = true; 

  displayedColumns: string[] = [
    'name',
    'class',
    'DOB',
    'POB',
    'enrollment',
    'master',
    'situation',
    'term',
    'test1',
    'test2',

    'eng1',
    'fre1',
    'math1',
    'hist1',
    'lit1',
    'geo1',
    'econs1',
    'comm1',
    'acc1',
    'citi1',
    'rel1',
    'food1',
    'chem1',
    'bio1',
    'phy1',
    'comp1',
    'sport1',
    'logic1',
    'hb1',

    'eng2',
    'fre2',
    'math2',
    'hist2',
    'lit2',
    'geo2',
    'econs2',
    'comm2',
    'acc2',
    'citi2',
    'rel2',
    'food2',
    'chem2',
    'bio2',
    'phy2',
    'comp2',
    'sport2',
    'logic2',
    'hb2'
  ];

  dataSource!: MatTableDataSource<any>

  constructor(private dialog: MatDialog, private api: MysqlService) { }


  ngOnInit() {
    this.getReport();
    // this.getPosition(17)
// this.setColor()

}

  getReport() {
    this.api.getMark()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.getReportList = res;
          this.showAddButton = res.length === 0;

        },
        error: (err) => {
          alert("Error while fetching marks!");
          console.log(err)
        }
      })
  }

  openDialog() {
    this.dialog.open(ReportDataComponent, {
      width: "100%", height: "100%"
    }).afterClosed().subscribe({
      next: (res) => {
        this.getReport();
      }
    })
  }

  editReport(row: any) {
    this.dialog.open(ReportDataComponent, {
      width: "100%", height: "100%",
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
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


  getCoefficient(subject: any, classe: any) {
    if (classe == "Form One") {
      switch (subject) {
        case "fre":
          this.coef = 5
          break;
        case "maths":
          this.coef = 5
          break;
        case "eng":
          this.coef = 5
          break;
        case "citi":
          this.coef = 2
          break;
        case "rel":
          this.coef = 2
          break;
        case "comp":
          this.coef = 2
          break;
        case "sport":
          this.coef = 1
          break;
        case "econs":
          this.coef = 0
          break;
        case "acc":
          this.coef = 0
          break;
        case "comm":
          this.coef = 0
          break;
        case "logic":
          this.coef = 0
          break;
        case "food":
          this.coef = 0
          break;
        case "hb":
          this.coef = 0
          break;
        default:
          this.coef = 3
          break;
      }
    }
    else if (classe == "Form Two") {
      switch (subject) {
        case "fre":
          this.coef = 5
          break;
        case "maths":
          this.coef = 5
          break;
        case "eng":
          this.coef = 5
          break;
        case "citi":
          this.coef = 2
          break;
        case "rel":
          this.coef = 2
          break;
        case "comp":
          this.coef = 2
          break;
        case "sport":
          this.coef = 1
          break;
        case "econs":
          this.coef = 0
          break;
        case "acc":
          this.coef = 0
          break;
        case "comm":
          this.coef = 0
          break;
        case "logic":
          this.coef = 0
          break;
        case "food":
          this.coef = 0
          break;
        case "hb":
          this.coef = 0
          break;
        default:
          this.coef = 3
          break;
      }
    }
    else if (classe == "Form Three") {
      switch (subject) {
        case "fre":
          this.coef = 5
          break;
        case "maths":
          this.coef = 5
          break;
        case "eng":
          this.coef = 5
          break;
        case "rel":
          this.coef = 2
          break;
        case "comp":
          this.coef = 2
          break;
        case "sport":
          this.coef = 1
          break;
        case "acc":
          this.coef = 0
          break;
        case "comm":
          this.coef = 2
          break;
        case "logic":
          this.coef = 0
          break;
        case "hb":
          this.coef = 0
          break;
        default:
          this.coef = 3
          break;
      }
    }

    else if (classe == "Form Four Science") {
      switch (subject) {
        case "fre":
          this.coef = 5
          break;
        case "maths":
          this.coef = 5
          break;
        case "eng":
          this.coef = 5
          break;
        case "rel":
          this.coef = 2
          break;
        case "comp":
          this.coef = 2
          break;
        case "sport":
          this.coef = 1
          break;
        case "acc":
          this.coef = 0
          break;
        case "comm":
          this.coef = 2
          break;
        case "logic":
          this.coef = 0
          break;
        case "hist":
          this.coef = 0
          break;
        case "lit":
          this.coef = 0
          break;
        default:
          this.coef = 3
          break;
      }
    }

    else if (classe == "Form Four Art") {
      switch (subject) {
        case "fre":
          this.coef = 5
          break;
        case "maths":
          this.coef = 5
          break;
        case "eng":
          this.coef = 5
          break;
        case "rel":
          this.coef = 2
          break;
        case "comp":
          this.coef = 2
          break;
        case "sport":
          this.coef = 1
          break;
        case "acc":
          this.coef = 0
          break;
        case "comm":
          this.coef = 2
          break;
        case "logic":
          this.coef = 0
          break;
        case "hb":
          this.coef = 0
          break;
        case "phy":
          this.coef = 0
          break;
        case "chem":
          this.coef = 0
          break;
        default:
          this.coef = 3
          break;
      }
    }
    else {
      switch (subject) {
        case "fre":
          this.coef = 5
          break;
        case "maths":
          this.coef = 5
          break;
        case "eng":
          this.coef = 5
          break;
        case "citi":
          this.coef = 2
          break;
        case "rel":
          this.coef = 2
          break;
        case "comp":
          this.coef = 2
          break;
        case "sport":
          this.coef = 1
          break;
        case "econs":
          this.coef = 0
          break;
        case "acc":
          this.coef = "/"
          break;
        case "comm":
          this.coef = "/"
          break;
        case "logic":
          this.coef = "/"
          break;
        case "food":
          this.coef = "/"
          break;
        case "hb":
          this.coef = "/"
          break;
        default:
          this.coef = 3
          break;
      }
    }

    return this.coef;
  }


  getTeacher(subject: any, classe: any) {
    if (classe == "Form One") {
      switch (subject) {
        case "fre":
          this.teacher = "Etta Marion"
          break;
        case "maths":
          this.teacher = "Sonna Temgoua"
          break;
        case "eng":
          this.teacher = "Munge Isabell"
          break;
        case "citi":
          this.teacher = "Nkwain Irene"
          break;
        case "rel":
          this.teacher = "Nkwain Irene"
          break;
        case "comp":
          this.teacher = "Akumany David"
          break;
        case "sport":
          this.teacher = "Ngwese Kevin"
          break;
        case "hist":
          this.teacher = "Fon Calence"
          break;
        case "lit":
          this.teacher = "Angwe Melvis"
          break;
        case "geo":
          this.teacher = "Werengong Emmanuel"
          break;
        case "chem":
          this.teacher = "Guenaing Fodjo"
          break;
        case "bio":
          this.teacher = "Mbanwei Isabella"
          break;
        case "phy":
          this.teacher = "Akafack Zidane"
          break;
        default:
          this.teacher = "/"
          break;
      }
    }
    else if (classe == "Form Two") {
      switch (subject) {
        case "fre":
          this.teacher = "Etta Marion"
          break;
        case "maths":
          this.teacher = "Sonna Temgoua"
          break;
        case "eng":
          this.teacher = "Munge Isabell"
          break;
        case "citi":
          this.teacher = "Nkwain Irene"
          break;
        case "rel":
          this.teacher = "Nkwain Irene"
          break;
        case "comp":
          this.teacher = "Akumany David"
          break;
        case "sport":
          this.teacher = "Ngwese Kevin"
          break;
        case "hist":
          this.teacher = "Fon Calence"
          break;
        case "lit":
          this.teacher = "Angwe Melvis"
          break;
        case "geo":
          this.teacher = "Werengong Emmanuel"
          break;
        case "chem":
          this.teacher = "Guenaing Fodjo"
          break;
        case "bio":
          this.teacher = "Mbanwei Isabella"
          break;
        case "phy":
          this.teacher = "Akafack Zidane"
          break;
        default:
          this.teacher = "/"
          break;
      }
    }
    else if (classe == "Form Three") {
      switch (subject) {
        case "fre":
          this.teacher = "Etta Marion"
          break;
        case "maths":
          this.teacher = "Sonna Temgoua"
          break;
        case "eng":
          this.teacher = "Munge Isabell"
          break;
        case "citi":
          this.teacher = "Nkwain Irene"
          break;
        case "rel":
          this.teacher = "Nkwain Irene"
          break;
        case "comp":
          this.teacher = "Akumany David"
          break;
        case "sport":
          this.teacher = "Ngwese Kevin"
          break;
        case "hist":
          this.teacher = "Fon Calence"
          break;
        case "lit":
          this.teacher = "Angwe Melvis"
          break;
        case "geo":
          this.teacher = "Werengong Emmanuel"
          break;
        case "chem":
          this.teacher = "Guenaing Fodjo"
          break;
        case "bio":
          this.teacher = "Mbanwei Isabella"
          break;
        case "phy":
          this.teacher = "Akafack Zidane"
          break;
        case "econs":
          this.teacher = "Ndep Violet"
          break;
        case "food":
          this.teacher = "Mbanwei Isabella"
          break;
        case "comm":
          this.teacher = "Ndep Violet"
          break;
        default:
          this.teacher = "/"
          break;
      }
    }

    else if (classe == "Form Four Science") {
      switch (subject) {
        case "fre":
          this.teacher = "Etta Marion"
          break;
        case "maths":
          this.teacher = "Akafack Zidane"
          break;
        case "eng":
          this.teacher = "Munge Isabell"
          break;
        case "citi":
          this.teacher = "Nkwain Irene"
          break;
        case "rel":
          this.teacher = "Nkwain Irene"
          break;
        case "comp":
          this.teacher = "Akumany David"
          break;
        case "sport":
          this.teacher = "Ngwese Kevin"
          break;
        case "geo":
          this.teacher = "Werengong Emmanuel"
          break;
        case "chem":
          this.teacher = "Guenaing Fodjo"
          break;
        case "bio":
          this.teacher = "Mbanwei Isabella"
          break;
        case "phy":
          this.teacher = "Akafack Zidane"
          break;
        case "econs":
          this.teacher = "Ndep Violet"
          break;
        case "food":
          this.teacher = "Mbanwei Isabella"
          break;
        case "comm":
          this.teacher = "Ndep Violet"
          break;
        case "hb":
          this.teacher = "Guenaing Fodjo"
          break;
        default:
          this.teacher = "/"
          break;
      }
    }

    else if (classe == "Form Four Art") {
      switch (subject) {
        case "fre":
          this.teacher = "Etta Marion"
          break;
        case "maths":
          this.teacher = "Sonna Temgoua"
          break;
        case "eng":
          this.teacher = "Munge Isabell"
          break;
        case "citi":
          this.teacher = "Fon Calence"
          break;
        case "rel":
          this.teacher = "Nkwain Irene"
          break;
        case "comp":
          this.teacher = "Akumany David"
          break;
        case "sport":
          this.teacher = "Ngwese Kevin"
          break;
        case "hist":
          this.teacher = "Fon Calence/Nkwain Irene"
          break;
        case "lit":
          this.teacher = "Angwe Melvis"
          break;
        case "geo":
          this.teacher = "Werengong Emmanuel"
          break;
        case "bio":
          this.teacher = "Mbanwei Isabella"
          break;
        case "econs":
          this.teacher = "Ndep Violet"
          break;
        case "food":
          this.teacher = "Mbanwei Isabella"
          break;
        case "comm":
          this.teacher = "Ndep Violet"
          break;
        default:
          this.teacher = "/"
          break;
      }
    }
    else {
      switch (subject) {
        case "fre":
          this.teacher = "Etta Marion"
          break;
        case "maths":
          this.teacher = "Sonna Temgoua"
          break;
        case "eng":
          this.teacher = "Munge Isabell"
          break;
        case "citi":
          this.teacher = "Nkwain Irene"
          break;
        case "rel":
          this.teacher = "Nkwain Irene"
          break;
        case "comp":
          this.teacher = "Akumany David"
          break;
        case "sport":
          this.teacher = "Ngwese Kevin"
          break;
        case "hist":
          this.teacher = "Fon Calence"
          break;
        case "lit":
          this.teacher = "Angwe Melvis"
          break;
        case "geo":
          this.teacher = "Werengong Emmanuel"
          break;
        case "chem":
          this.teacher = "Guenaing Fodjo"
          break;
        case "bio":
          this.teacher = "Mbanwei Isabella"
          break;
        case "phy":
          this.teacher = "Akafack Zidane"
          break;
        case "econs":
          this.teacher = "Ndep Violet"
          break;
        case "food":
          this.teacher = "Mbanwei Isabella"
          break;
        case "comm":
          this.teacher = "Ndep Violet"
          break;
        default:
          this.teacher = "/"
          break;
      }
    }

    return this.teacher;
  }



  termAverage(subject: any, classe: any, mk1: any, mk2: any): any {
    if (this.getCoefficient(subject, classe) == 0) {
      return '/';
    }
    else {
      return (mk1 + mk2) / 2
    }
  }

  termTotal(subject: any, classe: any, mk1: any, mk2: any): any {
    if (this.getCoefficient(subject, classe) == 0) {
      return null;
    }
    else {
      return (((mk1 + mk2) / 2) * this.getCoefficient(subject, classe)).toFixed(2)
    }
  }

  remarks(mk1: any, mk2: any) {

    var tmk:any = (mk1 + mk2) / 2
    // console.log(tmk)
    if (mk1 == null ){
      return '/';
    }

    else if (tmk >= 0 && tmk < 10) {
      return "NA";
    }

    else if (tmk >= 10 && tmk < 14) {
      return "AP";
    }

    else if (tmk >= 14 && tmk < 18) {
      return "A";
    }

    else if (tmk >= 18 && tmk <= 20) {
      return "E";
    }
    else{
      return '/';
    }
  }

  position(mark1: any, mark2: any, sub1: any, sub2: any): any {
    var B: any = []
    var Arr: any = [0]
    var mark = (mark1 + mark2)/2
    for (let i = 0; i < this.getReportList.length; i++) {
    // console.log("Average: ", this.getReportList[i]['average'])
      if (this.remarks(mark1, mark2) == '/'){
      return '/';
      
    }
  }
  
    for (let i = 0; i < this.getReportList.length; i++) {
      Arr.push((this.getReportList[i][sub1] + this.getReportList[i][sub2]) / 2)
      B.push(i + 1)
    }
    Arr.sort(function (a: any, b: any) {
      return b - a
    })
    Arr.pop()
    for (let i = 0; i < this.getReportList.length; i++) {
      if (mark == Arr[i]) {
        return B[Arr.indexOf(mark)]
      }
    }
    // console.log(Arr)
    // console.log(B)
    // return "/"
  }

  classPosition(studAverage: any): any {
    var B: any = []
    var Arr: any = []
    for (let i = 0; i < this.getReportList.length; i++) {
      Arr.push((this.getReportList[i][studAverage]))
      B.push(i + 1)
    }
    Arr.sort(function (a: any, b: any) {
      return b - a
    })
    // Arr.pop()
    for (let i = 0; i < this.getReportList.length; i++) {
      if (studAverage == Arr[i]) {
        return B[Arr.indexOf(studAverage)]
      }
    }
    // console.log(Arr)
    // console.log(B)
    // return "/"
  }


  fancySup(position: any) {
    switch (position) {
      case 1:
        return "st"
        break;
      case 2:
        return "nd"
        break;
      case 3:
        return "rd"
        break;
      case "/":
        return ""
        break;
      case "":
        return ""
        break;
      default:
        return "th"
        break;
    }
  }


  getPosition(mark: any) {
    var Arr
    Arr = [19, 11, 12, 3, 14, 5, 16, 7, 8, 9, 10, 11, 12, 13, 4, 15, 16, 17, 13.5, 9, 10]
    var maxi: any;
    // var max_i: any
    var B = []
    for (let i = 0; i < Arr.length; i++) {
      maxi = this.getMax(Arr)
      Arr.sort(function (a, b) {
        return b - a
      })
      B.push(i + 1)
    }
    // console.log("The array is " + Arr)
    // console.log("The positions are " + B)
    // console.log("The current maximum is " + maxi + " at index " + Arr.indexOf(maxi))
    for (let i = 0; i < this.getReportList.length; i++) {
      // console.log("If you have " + Arr[i] + ", you are number " + B[i])
      console.log("Array fiil preview : " + this.getReportList[i]['eng1'])
    }


  }

  getMax(Arr: any) {
    var maxi = Arr[0];
    for (let i = 0; i < Arr.length; i++) {
      if (maxi < Arr[i]) {
        maxi = Arr[i]
      }
    }
    return maxi
  }

totalCoefficient(coef1: any, coef2: any,coef3: any,coef4: any,coef5: any,coef6: any,coef7: any,coef8: any, coef9: any, coef10: any,coef11: any,coef12: any,coef13: any,coef14: any,coef15: any,coef16: any,coef17: any,coef18: any,coef19: any){

    var rcoef:number = (coef1+coef2+coef3+coef4+coef5+coef6+coef7+coef8+coef9+coef10+coef11+coef12+coef13+coef14+coef15+coef16+coef17+coef18+coef19) 
    // var ans = parseInt(rcoef);
    return (rcoef)
}

totalMark(av1: any, av2: any,av3: any,av4: any,av5: any,av6: any,av7: any,av8: any, av9: any, av10: any,av11: any,av12: any,av13: any,av14: any,av15: any,av16: any,av17: any,av18: any,av19: any){
  var rav: number = 0
  rav += (eval(av1)+eval(av2)+eval(av3)+eval(av4)+eval(av5)+eval(av6)+eval(av7)+eval(av8)+eval(av9)+eval(av10)+eval(av11)+eval(av12)+eval(av13)+eval(av14)+eval(av15)+eval(av16)+eval(av17)+eval(av18)+eval(av19)); 
  // var ans = parseInt(rav);
  return rav;
}

getAverage(total: any, coefficient: any){
  return total/coefficient;
}

getClassAverage(average: any){
  var B: any = []
  var Arr: any = []
 
  for (let i = 0; i < this.getReportList.length; i++) {
    Arr.push(this.getReportList[i]['average'])
    B.push(i + 1)
  }
  Arr.sort(function (a: any, b: any) {
    return b - a
  })
  // Arr.pop()
  var sumAv = 0
  var classAv = 0
  for (let i = 0; i < this.getReportList.length; i++) {
    sumAv = sumAv + eval(Arr[i])
    // console.log(Arr[i]+" ")
  }
classAv = sumAv/this.getReportList.length
  // console.log("B: "+B + "\nArr: " + Arr+"\n"+ sumAv)
  return classAv
}

getClassPosition(average: any){
  var B: any = []
  var Arr: any = []

  for (let i = 0; i < this.getReportList.length; i++) {
    // Arr.push((this.getReportList[i][average]))
    Arr.push(this.getReportList[i]['average'])
    B.push(i + 1)
  }
  Arr.sort(function (a: any, b: any) {
    return b - a
  })
  // Arr.pop()
  for (let i = 0; i < this.getReportList.length; i++) {
    // sumAv = sumAv + eval(Arr[i])
    if (average == Arr[i]) {
      return B[Arr.indexOf(average)]
    }
  }
  // classAv = sumAv/this.getReportList.length
  // console.log("B: "+B + "\nArr: " + Arr+"\n"+ sumAv)
  return 0
}

// seal(){
//   const seal = document.getElementById('seal');
//   if(seal?.style.display == "flex"){
//   seal?.style.setProperty('display', 'none')
//   }
//   else{
//     seal?.style.setProperty('display', 'flex')
//   }
// }

popUp(){
  this.dialog.open(ActionsComponent, {
    width: "60%", height: "90%"
  }).afterClosed().subscribe(val => {
    if (val === 'save') {
      this.getReport();
    }
  })
}

setColor(mk1 : any, mk2 : any){

  const averageStyle =document.getElementById('av')
  if((mk1+mk2)/2 >= 10){
    averageStyle?.style.setProperty("color", "green")
    alert("green")
  
  }
  else if((mk1+mk2)/2 < 10){
    averageStyle?.style.setProperty("color", "red")
    alert("red")
  }

}

refreshColor(engMark1: any, engMark2: any){
  this.setColor(engMark1, engMark2)
}

setAMC(average: any){
  if(average >= 10)
    return "PASSED";
  else
    return "FAILED";
}



}


