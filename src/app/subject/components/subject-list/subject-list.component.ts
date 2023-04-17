import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { SubjectAddDialogComponent } from '../subject-add-dialog/subject-add-dialog.component';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectService } from 'src/app/core/services/subject.service';
import { Observable, filter, tap } from 'rxjs';
import {Subject} from 'src/app/core/models/subject';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
//import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent {
  constructor(public dialog: MatDialog, private subjectService: SubjectService, public viewPdfDialog: MatDialog) {}
  openDialog(): void {
    this.dialog.open(SubjectAddDialogComponent);
  }

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

  subjectsComplete$ = this.subjectService.subjectsComplete$
    .pipe(
      tap(data => {
        this.subjects = data
        console.log(data);
        
      })
    ).subscribe()



  // displayedColumns = ['subjectCode', 'description', 'department']

  subjects: Subject[]=[]
  // [
  //   {
  //     id:1,
  //     subject_code:'IT 301',
  //     description:'Progamming 1',
  //     department_id:1,
  //     status:'Pending',
  //     department:{
  //       id:1,
  //       department_code:'1',
  //       description:'Bachelor Of Science in Information Technology',
  //       chairs:'Sheldon V. Arenas',
  //       members:'Aaron Paulo Dela Rosa',
  //       created_at:'10-10-01',
  //       updated_at:'10-10-01',
  //     }
  //   },
  //   {
  //     id:2,
  //     subject_code:'IT 302',
  //     description:'Programming 2',
  //     department_id:2,
  //     status:'Pending',
  //     department:{
  //     id:2,
  //     department_code:'2',
  //     description:'Bachelor Of Science in Computer Science',
  //     chairs:'Marie S. Cruz',
  //     members:'John Paulo Santos',
  //     created_at:'11-10-01',
  //     updated_at:'11-10-01',
  //     }
  //     },
  //     {
  //     id:3,
  //     subject_code:'IT 303',
  //     description:'Database Management System',
  //     department_id:1,
  //     status:'On-going',
  //     department:{
  //     id:1,
  //     department_code:'1',
  //     description:'Bachelor Of Science in Information Technology',
  //     chairs:'Sheldon V. Arenas',
  //     members:'Aaron Paul Dela Rosa, Kristine Mae Aguilar',
  //     created_at:'10-10-01',
  //     updated_at:'10-10-01',
  //     }
  //     },
  //     {
  //     id:4,
  //     subject_code:'IT 304',
  //     description:'Web Development',
  //     department_id:2,
  //     status:'Completed',
  //     department:{
  //     id:2,
  //     department_code:'2',
  //     description:'Bachelor Of Science in Computer Science',
  //     chairs:'Marie S. Cruz',
  //     members:'John Paulo Santos, Ana Marie Gutierrez',
  //     created_at:'11-10-01',
  //     updated_at:'11-10-01',
  //     }
  //     },
  //     {
  //     id:5,
  //     subject_code:'IT 305',
  //     description:'Data Structures and Algorithms',
  //     department_id:3,
  //     status:'Postponed',
  //     department:{
  //     id:3,
  //     department_code:'3',
  //     description:'Bachelor Of Science in Information Systems',
  //     chairs:'Leo D. Reyes',
  //     members:'Karen Joy Tan, Mark Angelo Reyes',
  //     created_at:'12-10-01',
  //     updated_at:'12-10-01',
  //     }
  //     },
  //     {
  //     id:6,
  //     subject_code:'IT 306',
  //     description:'Operating Systems',
  //     department_id:3,
  //     status:'Cancelled',
  //     department:{
  //     id:3,
  //     department_code:'3',
  //     description:'Bachelor Of Science in Information Systems',
  //     chairs:'Leo D. Reyes',
  //     members:'Karen Joy Tan, Mark Angelo Reyes, Michael Alvarez',
  //     created_at:'12-10-01',
  //     updated_at:'12-10-01',
  //     }
  //     },
  //     {
  //     id:7,
  //     subject_code:'IT 307',
  //     description:'Human-Computer Interaction',
  //     department_id:1,
  //     status:'On-going',
  //     department:{
  //     id:1,
  //     department_code:'1',
  //     description:'Bachelor Of Science in Information Technology',
  //     chairs:'Sheldon V. Arenas',
  //     members:'Aaron Paul Dela Rosa, Kristine Mae Aguilar, Laila Santos',
  //     created_at:'10-10-01',
  //     updated_at:'10-10-01',
  //     }
  //     },
  //     {
  //     id:8,
  //     subject_code:'IT 308',
  //     description:'Mobile Computing',
  //     department_id:2,
  //     status:'Pending',
  //     department:{
  //     id:2,
  //     department_code:'2',
  //     description:'Bachelor Of Science in Computer Science',
  //     chairs:'Marie S. Cruz',
  //     members:'John Paulo Santos, Ana Marie Gutierrez, Mary Grace Reyes',
  //     created_at:'11-10-01',
  //     updated_at:'11-10-01',
  //     }
  //     },
  //     {
  //       id:9,
  //       subject_code:'IT 309',
  //       description:'Artificial Intelligence',
  //       department_id:3,
  //       status:'On-going',
  //       department:{
  //       id:3,
  //       department_code:'3',
  //       description:'Bachelor Of Science in Information Systems',
  //       chairs:'Leo D. Reyes',
  //       members:'Karen Joy Tan, Mark Angelo Reyes, Michael Alvarez, Jayson Rivera',
  //       created_at:'12-10-01',
  //       updated_at:'12-10-01',
  //       }
  //       },
  //       {
  //       id:10,
  //       subject_code:'IT 310',
  //       description:'Computer Networks',
  //       department_id:1,
  //       status:'Completed',
  //       department:{
  //       id:1,
  //       department_code:'1',
  //       description:'Bachelor Of Science in Information Technology',
  //       chairs:'Sheldon V. Arenas',
  //       members:'Aaron Paul Dela Rosa, Kristine Mae Aguilar, Laila Santos, Jorlyn Tan',
  //       created_at:'10-10-01',
  //       updated_at:'10-10-01',
  //       }
  //       },
  //       {
  //       id:11,
  //       subject_code:'IT 311',
  //       description:'Software Engineering',
  //       department_id:2,
  //       status:'On-going',
  //       department:{
  //       id:2,
  //       department_code:'2',
  //       description:'Bachelor Of Science in Computer Science',
  //       chairs:'Marie S. Cruz',
  //       members:'John Paulo Santos, Ana Marie Gutierrez, Mary Grace Reyes, Carla Ocampo',
  //       created_at:'11-10-01',
  //       updated_at:'11-10-01',
  //       }
  //       },
  //       {
  //       id:12,
  //       subject_code:'IT 312',
  //       description:'Computer Architecture',
  //       department_id:3,
  //       status:'Pending',
  //       department:{
  //       id:3,
  //       department_code:'3',
  //       description:'Bachelor Of Science in Information Systems',
  //       chairs:'Leo D. Reyes',
  //       members:'Karen Joy Tan, Mark Angelo Reyes, Michael Alvarez, Jayson Rivera, Catherine Cruz',
  //       created_at:'12-10-01',
  //       updated_at:'12-10-01',
  //       }
  //       },
  //       {
  //       id:13,
  //       subject_code:'IT 313',
  //       description:'Data Mining',
  //       department_id:1,
  //       status:'Postponed',
  //       department:{
  //       id:1,
  //       department_code:'1',
  //       description:'Bachelor Of Science in Information Technology',
  //       chairs:'Sheldon V. Arenas',
  //       members:'Aaron Paul Dela Rosa, Kristine Mae Aguilar, Laila Santos, Jorlyn Tan, Paolo Reyes',
  //       created_at:'10-10-01',
  //       updated_at:'10-10-01',
  //       }
  //       },
  //       {
  //       id:14,
  //       subject_code:'IT 314',
  //       description:'Computer Graphics',
  //       department_id:2,
  //       status:'Cancelled',
  //       department:{
  //       id:2,
  //       department_code:'2',
  //       description:'Bachelor Of Science in Computer Science',
  //       chairs:'Marie S. Cruz',
  //       members:'John Paulo Santos, Ana Marie Gutierrez, Mary Grace Reyes, Carla Ocampo, Janelle Mendoza',
  //       created_at:'11-10-01',
  //       updated_at:'11-10-01',
  //       }
  //       },
  //       {
  //       id:15,
  //       subject_code:'IT 315',
  //       description:'Information Security',
  //       department_id:3,
  //       status:'On-going',
  //       department:{
  //       id:3,
  //       department_code:'3',
  //       description:'Bachelor Of Science in Information Systems',
  //       chairs:'Leo D. Reyes',
  //       members:'Karen Joy Tan, Mark Angelo Reyes, Michael Alvarez, Jayson Rivera,Catherine Cruz, Allen Pascua',
  //       created_at:'12-10-01',
  //       updated_at:'12-10-01',
  //       }
  //       },
  //       {
  //         id:17,
  //         subject_code:'IT 317',
  //         description:'Web Development',
  //         department_id:2,
  //         status:'On-going',
  //         department:{
  //         id:2,
  //         department_code:'2',
  //         description:'Bachelor Of Science in Computer Science',
  //         chairs:'Marie S. Cruz',
  //         members:'John Paulo Santos, Ana Marie Gutierrez, Mary Grace Reyes, Carla Ocampo, Janelle Mendoza, Maria Garcia',
  //         created_at:'11-10-01',
  //         updated_at:'11-10-01',
  //         }
  //         },
  //         {
  //         id:18,
  //         subject_code:'IT 318',
  //         description:'Mobile Application Development',
  //         department_id:3,
  //         status:'On-going',
  //         department:{
  //         id:3,
  //         department_code:'3',
  //         description:'Bachelor Of Science in Information Systems',
  //         chairs:'Leo D. Reyes',
  //         members:'Karen Joy Tan, Mark Angelo Reyes, Michael Alvarez, Jayson Rivera, Catherine Cruz, Allen Pascua, Kim Garcia',
  //         created_at:'12-10-01',
  //         updated_at:'12-10-01',
  //         }
  //         },
  //         {
  //         id:19,
  //         subject_code:'IT 319',
  //         description:'Object Oriented Programming',
  //         department_id:1,
  //         status:'On-going',
  //         department:{
  //         id:1,
  //         department_code:'1',
  //         description:'Bachelor Of Science in Information Technology',
  //         chairs:'Sheldon V. Arenas',
  //         members:'Aaron Paul Dela Rosa, Kristine Mae Aguilar, Laila Santos, Jorlyn Tan, Paolo Reyes, Karen Torres, Carlo Solis',
  //         created_at:'10-10-01',
  //         updated_at:'10-10-01',
  //         }
  //         },
  //         {
  //         id:20,
  //         subject_code:'IT 320',
  //         description:'Cloud Computing',
  //         department_id:2,
  //         status:'Pending',
  //         department:{
  //         id:2,
  //         department_code:'2',
  //         description:'Bachelor Of Science in Computer Science',
  //         chairs:'Marie S. Cruz',
  //         members:'John Paulo Santos, Ana Marie Gutierrez, Mary Grace Reyes, Carla Ocampo, Janelle Mendoza, Maria Garcia, Joseph De Leon',
  //         created_at:'11-10-01',
  //         updated_at:'11-10-01',
  //         }
  //         }
  // ]

   //pang filter
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
//   data: subjects
// });


}

@Component({
  selector: 'view-pdf',
  templateUrl: 'view-pdf.html',
})
export class ViewPdfClass {
  pdfLoc = 'http://127.0.0.1:8000/api/subjectsGetSyllabus/';
  constructor(
    public dialogRef: MatDialogRef<ViewPdfClass>,
    @Inject(MAT_DIALOG_DATA) public data: { ref: string }
  ) {
    this.pdfLoc += data.ref;
    console.log(this.pdfLoc);
  };
  
  
}
