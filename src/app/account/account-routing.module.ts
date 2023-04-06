import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './components/account-list/account-list.component';
import {AccountContainerComponent} from './components/account-container/account-container.component'



const routes: Routes = [
  { path: '', component: AccountContainerComponent,
    children: [
      { path: 'list', component: AccountListComponent },
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }