import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseFormComponent } from '../../../models/BaseFormComponent';

@Component({
  selector: 'app-test-multiple',
  templateUrl: './test-multiple.component.html',
  styleUrls: ['./test-multiple.component.scss']
})
export class TestMultipleComponent extends BaseFormComponent implements OnInit {

  form = this.fb.group({
    question: [undefined, [Validators.required]],
    answer_1: ['', [Validators.required]]
  });

  answerControls: AbstractControl[] = [this.getControl('answer_1')];

  constructor(public fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
  }

  addOption(): void {
    const name = 'answer_' + this.answerControls.length;
    this.form.addControl(name, new FormControl('', [Validators.required]));
    this.answerControls.push(this.getControl(name));
  }

}
