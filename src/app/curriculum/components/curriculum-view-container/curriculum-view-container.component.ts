import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Comment } from 'src/app/core/models/comment';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { Profile, User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { CurriculumService } from 'src/app/core/services/curriculum.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-curriculum-view-container',
  templateUrl: './curriculum-view-container.component.html',
  styleUrls: ['./curriculum-view-container.component.css']
})
export class CurriculumViewContainerComponent implements OnInit {
  constructor(private curriculumService: CurriculumService,
              private authService: AuthService,
              private commentService: CommentService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog
    ){}
  
  currentUser!:User
  currentUser$ = this.authService.getCurrentUser().pipe(
    tap(user => {
      this.role = user.role
      this.currentUser = user
    })
  )
  
  canEdit():boolean{
    return this.curriculum.user_id == this.currentUser.id
  }


  comments:Comment[] = []
  created_at: string = ''
  author: any = ''
  type:string = ''
  action:string = ''
  role:any = ''
  curriculum!: Curriculum2
  subjects:any[] = []
  title = ''
  status = ''

  approve(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Approve Curriculum',
        message: 'Are you sure you want to approve this curriculum?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.curriculumService.approveCurriculum(this.curriculum.id).subscribe({
          next: response => {
            this.status = 'a'
            this.curriculum.status = 'a'
          },
          error: err => {
            console.log(err);
          }
        })
      } else {
      }
    });
  }
  edit(){
    this.router.navigate(['/curriculums', 'edit', this.curriculum.id])
  }
  revise(){
    console.log('revise');
    this.router.navigate(['/curriculums', 'revise', 'create', this.curriculum.id])
  }



  addComment(data:any){
    const comment = {...data, curriculumId: this.curriculum.id}
    this.commentService.addComment(comment).subscribe({
      next: data => {
        this.comments.unshift(data)
      },
      error: err => {
        console.log(err);
      }
    })
  }
  
  submit(data: any){
    if(this.action === 'curr'){
      this.curriculumService.updateCurriculum(this.curriculum.id, data).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/curriculums', this.curriculum.id])
        }   
      )
    }
    else{
      // this.curriculumService.updateCurriculum(this.curriculum.id, data).subscribe(
      //   data => {
      //     console.log(data)
      //     this.router.navigate(['/curriculums', this.curriculum.id])
      //   }   
      // )
    }
  }

  ngOnInit():void{
    this.route.data.subscribe((data:any) => {
      this.type = data.type
      this.action = data.action
    })

    this.route.params.subscribe(({id}) => {
      // for curriculum
        this.curriculum$ = this.curriculumService.getCurriculum(+id).pipe(
          tap(curriculum => {
            this.curriculum = curriculum
            this.subjects = JSON.parse(curriculum.metadata)
            this.title = `CICT ${curriculum.department.department_code} Curriculum version ${curriculum.version}`
            this.status = curriculum.status  
            this.created_at = curriculum.created_at
            this.author = curriculum.user?.profile?.name

            this.commentService.getCurriculumComments(this.curriculum.id).pipe(
              tap(comments => this.comments = comments)
            ).subscribe(
              data => console.log(data)
            )

          })
        )
    })


  }

  
  // curriculum = this.curriculumService.getCurriculum()
  curriculum$ = new Observable<Curriculum2>

}