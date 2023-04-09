import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumContainerComponent } from './components/curriculum-container/curriculum-container.component';
import { CurriculumListComponent } from './components/curriculum-list/curriculum-list.component';
import { CurriculumViewComponent } from './components/curriculum-view/curriculum-view.component';
import { CurriculumCreateContainerComponent } from './components/curriculum-create-container/curriculum-create-container.component';
import { CurriculumViewContainerComponent } from './components/curriculum-view-container/curriculum-view-container.component';


const routes: Routes = [
  { path: '', component: CurriculumContainerComponent,
    children: [
      { path: '', component: CurriculumListComponent },
      { path: 'create', component: CurriculumViewComponent },


      { path: 'create2', component: CurriculumCreateContainerComponent },

      { path: ':id', component: CurriculumViewContainerComponent, data: {type: 'view', action: 'curr'} },
      { path: 'edit/:id', component: CurriculumViewContainerComponent, data: {type: 'edit', action: 'curr'} },

      { path: 'revisions/:id', component: CurriculumViewContainerComponent, data: {type: 'view', action: 'revise'} },
      { path: 'revisions/edit/:id', component: CurriculumViewContainerComponent, data: {type: 'edit', action: 'revise'} },



      // { path: ':id', component: CurriculumViewComponent },
      { path: 'revise/:id', component: CurriculumViewComponent },
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurriculumRoutingModule { }