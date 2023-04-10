import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { AuthService } from 'src/app/core/services/auth.service';
import { CurriculumService } from 'src/app/core/services/curriculum.service';

@Component({
  selector: 'app-curriculum-view-container',
  templateUrl: './curriculum-view-container.component.html',
  styleUrls: ['./curriculum-view-container.component.css']
})
export class CurriculumViewContainerComponent implements OnInit {
  constructor(private curriculumService: CurriculumService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router
    ){}

  type:string = ''
  action:string = ''
  
  curriculum!: Curriculum2
  subjects:any[] = []
  title = ''
  status = ''

  approve(){
    console.log('approve');
  }
  edit(){
    console.log('edit');
  }
  revise(){
    console.log('revise');
    this.router.navigate(['/curriculums', 'revise', 'create', this.curriculum.id])
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
          })
        )
    })
  }

  
  // curriculum = this.curriculumService.getCurriculum()
  curriculum$ = new Observable<Curriculum2>

}