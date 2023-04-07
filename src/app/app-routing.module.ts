import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'curriculums', loadChildren: () => import('./curriculum/curriculum.module').then(m => m.CurriculumModule)},
  { path: 'accounts', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
