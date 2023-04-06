import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountContainerComponent } from './components/account-container/account-container.component';
import { AccountsRoutingModule } from './account-routing.module';
import { MaterialModule } from '../shared/material';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AccountListComponent,
    AccountContainerComponent
  ],
  imports: [
    CommonModule,AccountsRoutingModule,MaterialModule,SharedModule
  ]
})
export class AccountModule { }
