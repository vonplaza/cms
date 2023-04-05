import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { topNavigation } from './topnav/topnav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { dashboard } from './dashboard/dashboard.component';
import { ChartModule} from 'angular-highcharts';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { CurriculumManagementComponent } from './curriculum-management/curriculum-management.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewCurriculumComponent } from './view-curriculum/view-curriculum.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { SemYearFilterPipe } from './view-curriculum/filter-sem-year-pipe.pipe';
@NgModule({
  declarations: [
    AppComponent,  LoginComponent, ViewCurriculumComponent, SemYearFilterPipe 
    ,topNavigation, dashboard, CurriculumManagementComponent, ViewCurriculumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MatButtonToggleModule,MatCardModule,MatInputModule,MatPaginatorModule,CommonModule,
    BrowserAnimationsModule,MatListModule,ChartModule, MatTableModule,FormsModule,MatCardModule,ReactiveFormsModule,
    MatToolbarModule,MatIconModule,MatButtonModule, MatSidenavModule,MatGridListModule, MatExpansionModule, MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
