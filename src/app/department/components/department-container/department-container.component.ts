import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { DepartmentService } from 'src/app/core/services/department.service';

@Component({
  selector: 'app-department-container',
  templateUrl: './department-container.component.html',
  styleUrls: ['./department-container.component.css']
})
export class DepartmentContainerComponent {
  constructor(private departmentService: DepartmentService){}
  
  neededData$ = combineLatest([
    this.departmentService.departments$
  ])
}
