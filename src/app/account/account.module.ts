import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component'
import { AccountContainerComponent } from './components/account-container/account-container.component';
import { AccountsRoutingModule } from './account-routing.module';
import { MaterialModule } from '../shared/material';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AccountRegistrationComponent } from './components/account-registration/account-registration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AccountListComponent2 } from './components/account-list/account-list.component';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountListComponent2,
    AccountContainerComponent,
    AccountRegistrationComponent,
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule

    // CommonModule,
    // AccountsRoutingModule,
    // MaterialModule,SharedModule,
    // FormsModule,
    // MatFormFieldModule,
    // MatPaginatorModule
  ]
})
export class AccountModule { }
