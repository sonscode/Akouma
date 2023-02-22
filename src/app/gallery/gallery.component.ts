import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface studentData {
  name: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  getMarkList: any = []
  getMarkList2: any = []
  getMarkList3: any = []
  getMarkList4: any = []
  getMarkList5: any = []
  getMarkList6: any = []

  result: number = 0;

  count1!: number
  count2!: number

  displayedColumns: string[] = [
    'subjectName',
    'name1',
    'name2',
    'name3',
    'name4',
    'name5',
    'name6',
    'name7',
    'name8',
    'name9',
    'name10',
    'name11',
    'name12',
    'name13',
    'name14',
    'name15',
    'name16',
    'name17',
    'name18',
    'name19',
    'actions'
  ];

  dataSource!: MatTableDataSource<any>
  dataSource12!: MatTableDataSource<any>
  dataSource13!: MatTableDataSource<any>
  dataSource14!: MatTableDataSource<any>
  dataSource15!: MatTableDataSource<any>
  dataSource16!: MatTableDataSource<any>

  // dataNameSource!: MatTableDataSource<studentData>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator12!: MatPaginator;
  @ViewChild(MatPaginator) paginator13!: MatPaginator;
  @ViewChild(MatPaginator) paginator14!: MatPaginator;
  @ViewChild(MatPaginator) paginator15!: MatPaginator;
  @ViewChild(MatPaginator) paginator16!: MatPaginator;


  @ViewChild(MatSort) sort!:     MatSort;
  @ViewChild(MatSort) sort12!: MatSort;
  @ViewChild(MatSort) sort13!: MatSort;
  @ViewChild(MatSort) sort14!: MatSort;
  @ViewChild(MatSort) sort15!: MatSort;
  @ViewChild(MatSort) sort16!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    // this.getNames();
    // this.getTotal();
    this.getAllMarks();
    this.getAllMarks12();
    this.getAllMarks13();
    this.getAllMarks14();
    this.getAllMarks15();
    this.getAllMarks16();
  }


  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "100%", height: "100%"
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllMarks();
        this.getAllMarks12();
        this.getAllMarks13();
        this.getAllMarks14();
        this.getAllMarks15();
        this.getAllMarks16();
      }
    })
  }

  editMarks(row: any) {
    this.dialog.open(DialogComponent, {
      width: "100%", height: "100%",
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllMarks();
        this.getAllMarks12();
        this.getAllMarks13();
        this.getAllMarks14();
        this.getAllMarks15();
        this.getAllMarks16();
      }
    })
  }

  // All getters*********************************************************************************************************************
  getAllMarks() {
    this.api.getMark()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.getMarkList = res;
          // console.log(res);
        },
        error: (err) => {
          alert("Error while fetching marks!");
        }
      })
  }

  getAllMarks12() {
    this.api.getMark12()
      .subscribe({
        next: (res) => {
          this.dataSource12 = new MatTableDataSource(res);
          this.dataSource12.paginator = this.paginator12;
          this.dataSource12.sort = this.sort12;
          this.getMarkList2 = res;

          // console.log(res);
        },
        error: (err) => {
          console.log("Error while fetching marks!");
        }
      })
  }

  getAllMarks13() {
    this.api.getMark13()
      .subscribe({
        next: (res) => {
          this.dataSource13 = new MatTableDataSource(res);
          this.dataSource13.paginator = this.paginator13;
          this.dataSource13.sort = this.sort13;
          this.getMarkList3 = res;
          // console.log(res);
        },
        error: (err) => {
          console.log("Error while fetching marks!");
        }
      })
  }

  getAllMarks14() {
    this.api.getMark14()
      .subscribe({
        next: (res) => {
          this.dataSource14 = new MatTableDataSource(res);
          this.dataSource14.paginator = this.paginator14;
          this.dataSource14.sort = this.sort14;
          this.getMarkList4 = res;

          // console.log(res);
        },
        error: (err) => {
          console.log("Error while fetching marks!");
        }
      })
  }

  getAllMarks15() {
    this.api.getMark15()
      .subscribe({
        next: (res) => {
          this.dataSource15 = new MatTableDataSource(res);
          this.dataSource15.paginator = this.paginator15;
          this.dataSource15.sort = this.sort15;
          this.getMarkList5 = res;

          // console.log(res);
        },
        error: (err) => {
          console.log("Error while fetching marks!");
        }
      })
  }

  getAllMarks16() {
    this.api.getMark16()
      .subscribe({
        next: (res) => {
          this.dataSource16 = new MatTableDataSource(res);
          this.dataSource16.paginator = this.paginator16;
          this.dataSource16.sort = this.sort16;
          this.getMarkList6 = res;

          // console.log(res);
        },
        error: (err) => {
          console.log("Error while fetching marks!");
        }
      })
  }


  //Filters*********************************************************************************************************************
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter12(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource12.filter = filterValue.trim().toLowerCase();

    if (this.dataSource12.paginator) {
      this.dataSource12.paginator.firstPage();
    }
  }

  applyFilter13(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource13.filter = filterValue.trim().toLowerCase();

    if (this.dataSource13.paginator) {
      this.dataSource13.paginator.firstPage();
    }
  }

  applyFilter14(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource14.filter = filterValue.trim().toLowerCase();

    if (this.dataSource14.paginator) {
      this.dataSource14.paginator.firstPage();
    }
  }

  applyFilter15(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource15.filter = filterValue.trim().toLowerCase();

    if (this.dataSource15.paginator) {
      this.dataSource15.paginator.firstPage();
    }
  }

  applyFilter16(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource16.filter = filterValue.trim().toLowerCase();

    if (this.dataSource16.paginator) {
      this.dataSource16.paginator.firstPage();
    }
  }

    //All edits and deletes***************************************************************************************************

    deleteMark2(id: number) {
      if (confirm("Confirm delete")) {
        this.api.deleteMark(id).subscribe({
          next: (res) => {
            
            this.getAllMarks();
          },
          error: () => {
            alert("Sorry! Your marks could not be removed")
          }
        })
      }
    }
  
    deleteMark22(id: number) {
      if (confirm("Confirm delete")) {
  
        this.api.deleteMark12(id).subscribe({
          next: (res) => {
            
            this.getAllMarks12();
          },
          error: () => {
            alert("Sorry! Your marks could not be removed")
          }
        })
      }
    }
  
    deleteMark23(id: number) {
      if (confirm("Confirm delete")) {
  
        this.api.deleteMark13(id).subscribe({
          next: (res) => {
            
            this.getAllMarks13();
          },
          error: () => {
            alert("Sorry! Your marks could not be removed")
          }
        })
      }
    }
  
    deleteMark24(id: number) {
      if (confirm("Confirm delete")) {
  
        this.api.deleteMark14(id).subscribe({
          next: (res) => {
            
            this.getAllMarks14();
          },
          error: () => {
            alert("Sorry! Your marks could not be removed")
          }
        })
      }
    }
  
    deleteMark25(id: number) {
      if (confirm("Confirm delete")) {
  
        this.api.deleteMark15(id).subscribe({
          next: (res) => {
            
            this.getAllMarks15();
          },
          error: () => {
            alert("Sorry! Your marks could not be removed")
          }
        })
      }
    }
  
    deleteMark26(id: number) {
      // alert("Confirm delete . . . ")
      if (confirm("Confirm delete")) {
  
        this.api.deleteMark16(id).subscribe({
          next: (res) => {
            
            this.getAllMarks16();
          },
          error: () => {
            alert("Sorry! Your marks could not be removed")
          }
        })
      }
    }
  //All deletes ... many in one click**************************************************
    deleteAll1() {
      if (confirm("You want to delete all marks for 1st sequence?")) {
        for (let i = 0; i < 30; i++) {
          this.api.deleteMark(i).subscribe({
            next: (res) => {
              // console.log("All 1st sequence marks have been removed")
              this.getAllMarks();
            },
            error: () => {
              // alert("One or more marks could not be removed")
            }
          })
        }
      }
    }
  
    deleteAll2() {
      if (confirm("You want to delete all marks for 2nd sequence?")) {
        for (let i = 0; i < 30; i++) {
          this.api.deleteMark12(i).subscribe({
            next: (res) => {
              // console.log("All 1st sequence marks have been removed")
              this.getAllMarks12();
            },
            error: () => {
              // alert("One or more marks could not be removed")
            }
          })
        }
      }
    }
  
    deleteAll3() {
      if (confirm("You want to delete all marks for 3rd sequence?")) {
        for (let i = 0; i < 30; i++) {
          this.api.deleteMark13(i).subscribe({
            next: (res) => {
              // console.log("All 1st sequence marks have been removed")
              this.getAllMarks13();
            },
            error: () => {
              // alert("One or more marks could not be removed")
            }
          })
        }
      }
    }
  
    deleteAll4() {
      if (confirm("You want to delete all marks for 4th sequence?")) {
        for (let i = 0; i < 30; i++) {
          this.api.deleteMark14(i).subscribe({
            next: (res) => {
              // console.log("All 1st sequence marks have been removed")
              this.getAllMarks14();
            },
            error: () => {
              // alert("One or more marks could not be removed")
            }
          })
        }
      }
    }
  
    deleteAll5() {
      if (confirm("You want to delete all marks for 5th sequence?")) {
        for (let i = 0; i < 30; i++) {
          this.api.deleteMark15(i).subscribe({
            next: (res) => {
              // console.log("All 1st sequence marks have been removed")
              this.getAllMarks15();
            },
            error: () => {
              // alert("One or more marks could not be removed")
            }
          })
        }
      }
    }
  
    deleteAll6() {
      if (confirm("You want to delete all marks for 6th sequence?")) {
        for (let i = 0; i < 30; i++) {
          this.api.deleteMark16(i).subscribe({
            next: (res) => {
              // console.log("All 1st sequence marks have been removed")
              this.getAllMarks16();
            },
            error: () => {
              // alert("One or more marks could not be removed")
            }
          })
        }
      }
    }
  
  //Getting all marks... for term ONE... *********************************************************************************

getTermMark(el1: any, studName: any) {
  var mk1 = 0, mk2 = 0
  for (let i = 0; i < this.getMarkList.length; i++) {
    if (el1 == this.getMarkList[i].subjectName) {
      this.count1 = i;
      mk1 = this.getMarkList[this.count1][studName]
    }
  }

  for (let i = 0; i < this.getMarkList2.length; i++) {
    if (el1 == this.getMarkList2[i].subjectName) {
      this.count2 = i;
      mk2 = this.getMarkList2[this.count2][studName]
    }
  }   
  var mean = ((mk1 + mk2) / 2).toFixed(2);
  // console.log(this.count1, this.count2, mk1, mk2, mean)
  return mean;

}

//Getting all marks... for term TWO... *********************************************************************************

getTermMark2(el1: any, studName: any) {
  var mk1 = 0, mk2 = 0
  for (let i = 0; i < this.getMarkList3.length; i++) {
    if (el1 == this.getMarkList3[i].subjectName) {
      this.count1 = i;
      mk1 = this.getMarkList3[this.count1][studName]
    }
  }

  for (let i = 0; i < this.getMarkList4.length; i++) {
    if (el1 == this.getMarkList4[i].subjectName) {
      this.count2 = i;
      mk2 = this.getMarkList4[this.count2][studName]
    }
  }  
  var mean = ((mk1 + mk2) / 2).toFixed(2);
  // console.log(this.count1, this.count2, mk1, mk2, mean)
  return mean;

}

//Getting all marks... for term THREE... *********************************************************************************

getTermMark3(el1: any, studName: any) {
  var mk1 = 0, mk2 = 0
  for (let i = 0; i < this.getMarkList5.length; i++) {
    if (el1 == this.getMarkList5[i].subjectName) {
      this.count1 = i;
      mk1 = this.getMarkList5[this.count1][studName]
    }
  }

  for (let i = 0; i < this.getMarkList6.length; i++) {
    if (el1 == this.getMarkList6[i].subjectName) {
      this.count2 = i;
      mk2 = this.getMarkList6[this.count2][studName]
    }
  }  
  var mean = ((mk1 + mk2) / 2).toFixed(2);
  // console.log(this.count1, this.count2, mk1, mk2, mean)
  return mean;

}


 //Getting all Total marks... for sequence ONE... *********************************************************************************
 getTotal1(studName: any) {
  var element = 0;
  for (let i = 0; i < this.getMarkList.length; i++) {
    element += this.getMarkList[i].coef * this.getMarkList[i][studName]
  }
  return element;
}

//Getting all Total marks... for sequence TWO... ************************************************************************************
getTotal2(studName: any) {
  var element = 0;
  for (let i = 0; i < this.getMarkList2.length; i++) {
    element += this.getMarkList2[i].coef * this.getMarkList2[i][studName]
  }
  return element;
}

//Getting all Total marks... for sequence THREE... ************************************************************************************
getTotal3(studName: any) {
  var element = 0;
  for (let i = 0; i < this.getMarkList3.length; i++) {
    element += this.getMarkList3[i].coef * this.getMarkList3[i][studName]
  }
  return element;
}

//Getting all Total marks... for sequence FOUR... ************************************************************************************
getTotal4(studName: any) {
  var element = 0;
  for (let i = 0; i < this.getMarkList4.length; i++) {
    element += this.getMarkList4[i].coef * this.getMarkList4[i][studName]
  }
  return element;
}

//Getting all Total marks... for sequence FIVE... ************************************************************************************
getTotal5(studName: any) {
  var element = 0;
  for (let i = 0; i < this.getMarkList5.length; i++) {
    element += this.getMarkList5[i].coef * this.getMarkList5[i][studName]
  }
  return element;
}

  //Getting all Total marks... for sequence SIX... ************************************************************************************
  getTotal6(studName: any) {
    var element = 0;
    for (let i = 0; i < this.getMarkList6.length; i++) {
      element += this.getMarkList6[i].coef * this.getMarkList6[i][studName]
    }
    return element;
  }


  percentagePassed1(sequ: any){
    var element = 0
    switch (sequ) {
      case 'seq1':
        for (let i = 1; i <= 30; i++) {
          if(this.getTotal1('name'+i)/43 >= 10) {
            element++
          }
    }
    return ((element/ 19)*100).toFixed(0) + "%";
        break;
  
        case 'seq2':
        for (let i = 1; i <= 30; i++) {
          if(this.getTotal2('name'+i)/43 >= 10) {
            element++
          }
    }
    return ((element/19)*100).toFixed(0) + "%"
        break;
    
        case 'seq3':
        for (let i = 1; i <= 30; i++) {
          if(this.getTotal3('name'+i)/43 >= 10) {
            element++
          }
    }
    return ((element/19)*100).toFixed(0) + "%"
        break;
  
        case 'seq4':
          for (let i = 1; i <= 30; i++) {
            if(this.getTotal4('name'+i)/43 >= 10) {
              element++
            }
      }
      return ((element/19)*100).toFixed(0) + "%"
          break;
  
          case 'seq5':
        for (let i = 1; i <= 30; i++) {
          if(this.getTotal5('name'+i)/43 >= 10) {
            element++
          }
    }
    return ((element/19)*100).toFixed(0) + "%"
        break;
  
        case 'seq6':
        for (let i = 1; i <= 30; i++) {
          if(this.getTotal6('name'+i)/43 >= 10) {
            element++
          }
    }
    return ((element/19)*100).toFixed(0) + "%"
        break;
  
  
  
  
      default:
        return "-";
        break;
    }
  
  }
  
  
  TermPercentagePassed(term: any){
    var element = 0
    switch (term) {
      case 'term1':
        for (let i = 1; i <= 30; i++) {
          if((this.getTotal1('name'+i) + this.getTotal2('name'+i)) /86 >= 10) {
            element++
          }
    }
    return ((element/19)*100).toFixed(0) + "%"
        break;
  
        case 'term2':
          for (let i = 1; i <= 30; i++) {
            if((this.getTotal3('name'+i) + this.getTotal4('name'+i)) /86 >= 10) {
              element++
            }
      }
      return ((element/19)*100).toFixed(0) + "%"
          break;
  
          case 'term3':
            for (let i = 1; i <= 30; i++) {
              if((this.getTotal5('name'+i) + this.getTotal6('name'+i)) /86 >= 10) {
                element++
              }
        }
        return ((element/19)*100).toFixed(0) + "%"
            break;
  
      default:
        return "-";
        break;
    }
  
  }



}
