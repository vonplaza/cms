import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent2 } from './components/account-list/account-list.component';
import {AccountContainerComponent} from './components/account-container/account-container.component'
import { AccountRegistrationComponent } from './components/account-registration/account-registration.component';



const routes: Routes = [
  { path: '', component: AccountContainerComponent,
    children: [
      { path: '', component: AccountListComponent2 },
      { path: 'register', component: AccountRegistrationComponent },
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }