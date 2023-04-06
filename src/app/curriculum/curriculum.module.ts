import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material';
import { CurriculumContainerComponent } from './components/curriculum-container/curriculum-container.component';
import { CurriculumRoutingModule } from './curriculum-routing.module';
import { CurriculumListComponent } from './components/curriculum-list/curriculum-list.component';
import { CurriculumViewComponent } from './components/curriculum-view/curriculum-view.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CurriculumContainerComponent,
    CurriculumListComponent,
    CurriculumViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CurriculumRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class CurriculumModule { }
