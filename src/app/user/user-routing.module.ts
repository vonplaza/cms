import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileContainerShellComponent } from './components/profile-container-shell/profile-container-shell.component';

const routes: Routes = [
  { path: '', component: ProfileContainerShellComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
