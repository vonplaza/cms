import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumContainerComponent } from './components/curriculum-container/curriculum-container.component';
import { CurriculumListComponent } from './components/curriculum-list/curriculum-list.component';
import { CurriculumViewComponent } from './components/curriculum-view/curriculum-view.component';


const routes: Routes = [
  { path: '', component: CurriculumContainerComponent,
    children: [
      { path: '', component: CurriculumListComponent },
      { path: 'create', component: CurriculumViewComponent },
      { path: ':id', component: CurriculumViewComponent },
      { path: 'revise/:id', component: CurriculumViewComponent },
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurriculumRoutingModule { }