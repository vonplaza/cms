import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';

import {MatGridListModule} from '@angular/material/grid-list';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    DashBoardComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    ChartModule,
    RouterModule.forChild([
      { path: '', component: DashBoardComponent }
    ])
  ]
})
export class DashboardModule { }
