import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AppError } from 'src/app/core/models/app-error';
import { SubjectService } from 'src/app/core/services/subject.service';

@Component({
  selector: 'app-subject-add-dialog',
  templateUrl: './subject-add-dialog.component.html',
  styleUrls: ['./subject-add-dialog.component.css']
})
export class SubjectAddDialogComponent {
  constructor(public dialogRef: MatDialogRef<SubjectAddDialogComponent>, 
              private subjectService: SubjectService
    ) {}

  selectedFile:any 
  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
  }
  error$ = new Subject<string>();
  createSubject(form:any){
    const fd = new FormData()
    
    fd.append('subjectCode', form.value.subjectCode)
    fd.append('description', form.value.description)
    fd.append('departmentId', form.value.departmentId)
    fd.append('syllabus', this.selectedFile)

    this.subjectService.addSubject(fd)
      .subscribe({
        next: data => {
          this.error$.next('')
        },
        error: (err:AppError) => {
          this.error$.next(err.message)
        }
      })
  }
}
