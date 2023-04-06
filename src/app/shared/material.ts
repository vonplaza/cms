import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatInputModule,
    MatProgressBarModule,
    MatPaginatorModule
  ]
})

export class MaterialModule { }