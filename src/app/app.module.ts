import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { topNavigation } from './topnav/topnav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { dashboard } from './dashboard/dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { CurriculumManagementComponent } from './curriculum-management/curriculum-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCurriculumComponent } from './view-curriculum/view-curriculum.component';
import { CommonModule } from '@angular/common';
import { SemYearFilterPipe } from './view-curriculum/filter-sem-year-pipe.pipe';
import { MaterialModule } from './shared/material';

// angular material
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatToolbarModule} from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatTableModule } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MaterialModule } from './shared/material';


@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, 
    ViewCurriculumComponent, 
    SemYearFilterPipe,
    topNavigation, 
    dashboard, 
    CurriculumManagementComponent, 
    ViewCurriculumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
