import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentManagementComponent } from './components/content-management/content-management.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material';
import { SharedModule } from '../shared/shared.module';
import { ContentRoutingModule } from './content-routing.module';



@NgModule({
  declarations: [
    ContentManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ContentRoutingModule
  ]
})
export class ContentModule { }
