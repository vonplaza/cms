import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { CurriculumService } from 'src/app/core/services/curriculum.service';
import { Comment } from 'src/app/core/models/comment';


@Component({
  selector: 'app-curriculum-view-revision-container',
  templateUrl: './curriculum-view-revision-container.component.html',
  styleUrls: ['./curriculum-view-revision-container.component.css']
})
export class CurriculumViewRevisionContainerComponent implements OnInit{
  constructor(private curriculumService: CurriculumService,
              private commentService: CommentService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router
  ){}
  type:string = ''
  action:string = ''
  comments:Comment[] = []
  
  curriculum!: Curriculum2
  subjects:any[] = []
  title = ''
  status = ''
  curriculum$ = new Observable()

  addComment(data:any){
    const comment = {...data, curriculumRevisionId: this.curriculum.id}
    this.commentService.addComment(comment).subscribe({
      next: data => {
        this.comments.unshift(data)
      },
      error: err => {
        console.log(err);
      }
    })
  }

  approve(){
    console.log('approve');
  }
  edit(){
    // this.router.navigate()
    console.log('edit');
  }
 

  ngOnInit(): void {
    this.route.data.subscribe((data:any) => {
      this.type = data.type
      this.action = data.action
    })

    this.route.params.subscribe(({id}) => {
      this.curriculum$ = this.curriculumService.getRevisionCurriculum(+id).pipe(
        tap((curriculum:any) => {
          this.curriculum = curriculum
          console.log(curriculum);
          
          this.subjects = JSON.parse(curriculum.metadata)
          this.title = `CICT ${curriculum.curriculum.department.department_code} Curriculum version ${curriculum.curriculum.version}`
          this.status = curriculum.status    
          
          this.commentService.getRevisionComments(this.curriculum.id).pipe(
            tap(comments => this.comments = comments)
          ).subscribe(
            data => console.log(data)
          )
        })
      )
    })
  }


}