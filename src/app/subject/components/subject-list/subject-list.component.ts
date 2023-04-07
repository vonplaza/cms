import { Component } from '@angular/core';
import { SubjectAddDialogComponent } from '../subject-add-dialog/subject-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SubjectService } from 'src/app/core/services/subject.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent {
  constructor(public dialog: MatDialog, private subjectService: SubjectService) {}
  openDialog(): void {
    this.dialog.open(SubjectAddDialogComponent);
  }



  subjects$ = this.subjectService.subjects$
    .pipe(
      tap(data => console.log(data))
    )



  displayedColumns = ['subjectCode', 'description', 'department']
}
