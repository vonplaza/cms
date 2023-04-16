import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboard } from './dashboard.component';


const routes: Routes = [
  { path: '', component: dashboard,
 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }