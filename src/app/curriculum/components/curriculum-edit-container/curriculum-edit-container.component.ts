import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Comment } from 'src/app/core/models/comment';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { CurriculumService } from 'src/app/core/services/curriculum.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-curriculum-edit-container',
  templateUrl: './curriculum-edit-container.component.html',
  styleUrls: ['./curriculum-edit-container.component.css']
})
export class CurriculumEditContainerComponent implements OnInit{
  constructor(private curriculumService: CurriculumService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private commentService: CommentService,
              private dialog: MatDialog
  ){}

  submit(data: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Update Curriculum',
        message: 'Are you sure you want to update this curriculum?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('confirm');
        
        const body = {subjects: data.subjects, version: data.version}
        
        this.curriculumService.updateCurriculum(this.curriculum.id, body).subscribe({
          next: (response:any) => {
            this.router.navigate(['/curriculums', response.id])
          },
          error: err => {

          }
        })

      } else {
      }
    });
  }

  comments:Comment[] = []
  type:string = 'asdasd'
  action:string = ''
  descriptiveTitle:string = 'editing pending curriculum'
  author:any = ''
  curriculum!: Curriculum2
  subjects:any[] = []
  title = ''
  status = ''
  curriculum$ = new Observable()
  buttonTxt = 'edit curriculum'

  ngOnInit(): void {
    this.route.data.subscribe((data:any) => {
      this.type = data.type
      this.action = data.action
    })
    this.route.params.subscribe(({id}) => {
      this.curriculum$ = this.curriculumService.getCurriculum(+id).pipe(
        tap((curriculum:any) => {
        this.curriculum = curriculum
        console.log(curriculum);

        console.log(curriculum.user);
        

        this.subjects = JSON.parse(curriculum.metadata)
        this.title = `CICT ${curriculum.department.department_code} Curriculum version ${curriculum.version}`
        this.status = curriculum.status   
        this.author = curriculum.user.profile.name

        this.commentService.getCurriculumComments(this.curriculum.id).pipe(
          tap(comments => this.comments = comments)
        ).subscribe(
          data => console.log(data)
        )
        })
      )
    })
  }
}
