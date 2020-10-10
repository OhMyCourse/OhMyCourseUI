import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

const mat = [
  MatButtonModule,
  MatIconModule,
  MatDividerModule
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
  