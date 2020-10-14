import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';

const mat = [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatCheckboxModule
];

@NgModule({
    imports: [
      ...mat
    ],
    exports: [
      ...mat
    ]
  })
  export class MaterialModule { }
