import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { AuthService } from 'src/app/core/services/auth.service';
import { CurriculumService } from 'src/app/core/services/curriculum.service';

@Component({
  selector: 'app-curriculum-edit-container',
  templateUrl: './curriculum-edit-container.component.html',
  styleUrls: ['./curriculum-edit-container.component.css']
})
export class CurriculumEditContainerComponent implements OnInit{
  constructor(private curriculumService: CurriculumService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
){}

  submit(data: any){
    console.log(data);
  }

  type:string = 'asdasd'
  action:string = ''

  curriculum!: Curriculum2
  subjects:any[] = []
  title = ''
  status = ''
  curriculum$ = new Observable()
  buttonTxt = 'edit curriculum'

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      this.curriculum$ = this.curriculumService.getCurriculum(+id).pipe(
        tap((curriculum:any) => {
        this.curriculum = curriculum
        console.log(curriculum);

        this.subjects = JSON.parse(curriculum.metadata)
        this.title = `CICT ${curriculum.department.department_code} Curriculum version ${curriculum.version}`
        this.status = curriculum.status                    
        })
      )
    })
  }
}
