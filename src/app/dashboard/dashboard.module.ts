import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material';
import { dashboard } from './dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    dashboard
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ChartModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
