import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material';
import { SubjectAddDialogComponent } from './components/subject-add-dialog/subject-add-dialog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubjectListComponent,
    SubjectAddDialogComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule
  ]
})
export class SubjectModule { }
