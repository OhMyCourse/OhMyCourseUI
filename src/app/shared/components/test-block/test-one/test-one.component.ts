import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseFormComponent } from '../../../models/BaseFormComponent';

@Component({
  selector: 'app-test-one',
  templateUrl: './test-one.component.html',
  styleUrls: ['./test-one.component.scss']
})
export class TestOneComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
