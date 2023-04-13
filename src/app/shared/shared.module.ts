import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { TimeDifferencePipePipe } from '../core/pipe/time-difference-pipe.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component';
import { ReloadPageComponent } from './components/reload-page/reload-page.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    SpinnerComponent,
    TimeDifferencePipePipe,
    ConfirmDialogComponent,
    NotAllowedComponent,
    ReloadPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    SidenavComponent,
    SpinnerComponent,
    TimeDifferencePipePipe,
    NotAllowedComponent,
    ReloadPageComponent
  ]
})
export class SharedModule { }
