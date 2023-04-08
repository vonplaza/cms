import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileContainerShellComponent } from './components/profile-container-shell/profile-container-shell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material';


@NgModule({
  declarations: [
    ProfileContainerShellComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
