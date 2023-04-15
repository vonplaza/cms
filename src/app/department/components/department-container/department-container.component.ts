import { Component } from '@angular/core';
import { EMPTY, catchError, combineLatest, tap } from 'rxjs';
import { handleError } from 'src/app/core/errorHandling/errorHandler';
import { Department } from 'src/app/core/models/department';
import { DepartmentService } from 'src/app/core/services/department.service';

@Component({
  selector: 'app-department-container',
  templateUrl: './department-container.component.html',
  styleUrls: ['./department-container.component.css']
})
export class DepartmentContainerComponent {
  constructor(private departmentService: DepartmentService){}
  
  departments!: Department[]
  errorInit:boolean = false
  isLoading:boolean = true

  neededData$ = combineLatest([
    this.departmentService.departments$
  ]).pipe(
    tap(([departments]) => {
      this.departments = departments
      this.isLoading = false
    }),
    catchError(err => {
      this.isLoading = false
      this.errorInit = true
      return EMPTY
    })
  )
}
