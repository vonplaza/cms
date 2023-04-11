import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Comment } from 'src/app/core/models/comment';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { CurriculumService } from 'src/app/core/services/curriculum.service';

@Component({
  selector: 'app-curriculum-edit-revision-container',
  templateUrl: './curriculum-edit-revision-container.component.html',
  styleUrls: ['./curriculum-edit-revision-container.component.css']
})
export class CurriculumEditRevisionContainerComponent implements OnInit{
  constructor(private curriculumService: CurriculumService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private commentService: CommentService
          ){}

  submit(data: any){
    console.log(data);
  }

  comments:Comment[] = []
  type:string = 'asdasd'
  action:string = ''
  author:string = ''
  descriptiveTitle:string = 'editing revision'
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
      this.curriculum$ = this.curriculumService.getRevisionCurriculum(+id).pipe(
        tap((curriculum:any) => {
        this.curriculum = curriculum

        this.subjects = JSON.parse(curriculum.metadata)
        this.title = `CICT ${curriculum.curriculum.department.department_code} Curriculum version ${curriculum.curriculum.version}`
        this.status = curriculum.status 
        console.log(curriculum.user.profile.name);
        
        this.author = curriculum.user.profile.name
        this.commentService.getRevisionComments(this.curriculum.id).pipe(
          tap(comments => this.comments = comments)
        ).subscribe()
        })
      )
    })
  }
}
