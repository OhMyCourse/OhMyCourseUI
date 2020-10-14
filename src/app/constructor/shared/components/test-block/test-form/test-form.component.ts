import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseFormComponent } from '../../../models/BaseFormComponent';
import { TestAnswerType } from '../../../models/TestAnswerType';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent extends BaseFormComponent implements OnInit {
  @Input() type: TestAnswerType;

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
