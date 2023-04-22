import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { SubjectAddDialogComponent } from '../subject-add-dialog/subject-add-dialog.component';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectService } from 'src/app/core/services/subject.service';
import { EMPTY, Observable, catchError, combineLatest, filter, tap } from 'rxjs';
import {Subject} from 'src/app/core/models/subject';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
//import {jsPDF} from 'jspdf';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent {
  constructor(public dialog: MatDialog, 
              private subjectService: SubjectService, 
              public viewPdfDialog: MatDialog,
              private authService: AuthService
              ) {}
  openDialog(): void {
    this.dialog.open(SubjectAddDialogComponent);
  }

  subjects: Subject[]=[]
  role:string = ''
  isLoading:boolean = true
  error:boolean = false
  electiveSubjects:any[] = []

  descriptionList:any[] = []
  originalDescription: any[] = []

  selectedTrack:number | any

  editElected(number: number){
    this.selectedTrack = number
  }

  cancelEdit(index: number){
    this.descriptionList[index] = [...this.originalDescription[index]]
    console.log(this.originalDescription[index]);
    
    this.selectedTrack = null
  }

  saveElected(index: number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Edit Elective Subjects',
        message: 'Are you sure you want to edit this Elective subject?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectService.editElectiveSubject(this.descriptionList[index], index + 1).subscribe({
          next: data => {
            this.electiveSubjects[index].description = [...this.descriptionList[index]]
            this.originalDescription[index] = this.electiveSubjects[index].description
            this.descriptionList[index] = this.originalDescription[index]
            this.selectedTrack = null
          },
          error: err => {

          }
        })


      } else {
        this.descriptionList[index] = [...this.originalDescription[index]]
      }
    });
  }

  neededData$ = combineLatest([
    this.subjectService.subjects$,
    this.subjectService.electiveSubjects$,
    this.authService.getCurrentUser()
  ]).pipe(
    tap(([subjects, electiveSubjects, user]) => {
      this.role = user.role
      this.subjects = subjects
      this.electiveSubjects = electiveSubjects
      this.electiveSubjects.forEach(list => {        
        this.originalDescription.push([...list.description])
        this.descriptionList.push([...list.description])
      })
      
      this.isLoading = false
    }),
    catchError(err => {
      this.error = true
      this.isLoading = false
      return EMPTY
    })
  )

  currentSortColumn: string='';
  currentSortDirection: string = 'asc';

  sort(column: string) {
    if (this.currentSortColumn === column) {
      // Reverse the direction if the same column is clicked again
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the new column and direction if a different column is clicked
      this.currentSortColumn = column;
      this.currentSortDirection = 'asc';
    }
  }

  removeSubject(id:number){
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remove Subject',
        message: 'Are you sure you want to move this subject to inactive?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectService.removeSubject(id, {status: 'i'}).subscribe({
          next: data => {
            this.subjects = this.subjects.map(subj => subj.id != id ? subj : data)
          },
          error: err => {

          }
        })
      } else {
      }
    });
  }

  restoreSubject(id:number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Restore Subject',
        message: 'Are you sure you want to restore this subject?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectService.removeSubject(id, {status: 'a'}).subscribe({
          next: data => {
            this.subjects = this.subjects.map(subj => subj.id != id ? subj : data)
          },
          error: err => {

          }
        })
      } else {
      }
    });
  }





  // displayedColumns = ['subjectCode', 'description', 'department']

   private _listFilter: string = '';
   get listFilter(): string{ 
       return this._listFilter;
   }
   set listFilter(value: string){
       this._listFilter=value;
       this.filteredList = this.performFilter(value);
   }
   //pang filter
 
   filteredList: Subject[]=[]; //array ng filtered list

    performFilter(filterBy: string): Subject[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.subjects.filter((courses: Subject)=>
      courses.id.toString().toLowerCase().includes(filterBy)||
      courses.subject_code.toLowerCase().includes(filterBy)||
      courses.description.toLowerCase().includes(filterBy)||
      courses.department_id?.toString().toLowerCase().includes(filterBy)||
      courses.status.toLowerCase().includes(filterBy)||
      courses.department?.id.toString().toLowerCase().includes(filterBy)||
      courses.department?.department_code.toLowerCase().includes(filterBy)||
      courses.department?.description.toLowerCase().includes(filterBy)||
      courses.department?.chairs.toLowerCase().includes(filterBy)||
      // courses.department?.members.toLowerCase().includes(filterBy)||
      courses.department?.created_at.toLowerCase().includes(filterBy)||
      courses.department?.updated_at.toLowerCase().includes(filterBy)
      );
  }

  //paginator
  totalItems = this.subjects.length; // Total number of items in your table
  pageSize = 10; // Number of items to display per page
  pageSizeOptions = [10, 20, 30]; // Options for the number of items per page

  currentPageIndex = 0; // Current page index
  displayedItems: any[] = []; // The items to display on the current page
  //paginator

  //pang filter
  ngOnInit(): void {
    this.listFilter = '';
  }
  //pang filter

  //pang check kung may laman yung search input (para di mawalan ng laman yung table)
  ngDoCheck(): void{
    if(!this.listFilter){
      this.totalItems = this.subjects.length;
      this.loadPageWithoutFilter(this.currentPageIndex);
    }
    else{
      this.totalItems = this.filteredList.length;
      this.loadPageWithFilter(this.currentPageIndex);
    }
  }

  //pang check kung may laman yung search input (para di mawalan ng laman yung table)

  //paginator
  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPageWithoutFilter(this.currentPageIndex);
  }
  
  loadPageWithoutFilter(pageIndex: number): void {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedItems = this.subjects.slice(startIndex, endIndex);
  }
  loadPageWithFilter(pageIndex: number): void {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedItems = this.filteredList.slice(startIndex, endIndex);
  }
//paginator

viewPdf(ref: string){
  const dialogRef = this.viewPdfDialog.open(ViewPdfClass, {
    data: {
      ref
    }
  });
}

@ViewChild('dialogEditContent') EditSubjectDialogComponent!: TemplateRef<any>;
// const dialogRef = this.dialog.open(this.EditSubjectDialogComponent, { pang bukas nung dialog
//   data: subje
// });


}

@Component({
  selector: 'view-pdf',
  templateUrl: 'view-pdf.html',
})
export class ViewPdfClass {
  pdfLoc = 'http://127.0.0.1:8000/api/subjectsGetSyllabus/';
  myUrl: SafeResourceUrl;
  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ViewPdfClass>,
    @Inject(MAT_DIALOG_DATA) public data: { ref: string }
  ) {
    this.myUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:8000/api/subjectsGetSyllabus/' + data.ref);
  }
  
  
  
}
