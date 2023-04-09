import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material';
import { CurriculumContainerComponent } from './components/curriculum-container/curriculum-container.component';
import { CurriculumRoutingModule } from './curriculum-routing.module';
import { CurriculumListComponent, curriculumDialog } from './components/curriculum-list/curriculum-list.component';
import { CurriculumViewComponent } from './components/curriculum-view/curriculum-view.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { YearDropdownComponent } from './components/year-dropdown/year-dropdown.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CurriculumCreateContainerComponent } from './components/curriculum-create-container/curriculum-create-container.component';
import { CurriculumViewContainerComponent } from './components/curriculum-view-container/curriculum-view-container.component';
// import { DialogContentExampleDialog} from './components/curriculum-list/curriculum-list.component'


@NgModule({
  declarations: [
    CurriculumContainerComponent,
    CurriculumListComponent,
    CurriculumViewComponent, 
    curriculumDialog, 
    YearDropdownComponent, 
    CommentsComponent, 
    CurriculumCreateContainerComponent, CurriculumViewContainerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CurriculumRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class CurriculumModule { }
