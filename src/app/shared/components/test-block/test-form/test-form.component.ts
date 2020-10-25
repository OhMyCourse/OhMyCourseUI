import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Test, TestOption, TestType } from 'src/app/shared/models/Test';
import { BaseFormComponent } from '../../../models/BaseFormComponent';
import { TestAnswerType } from '../../../models/TestAnswerType';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss'],
})
export class TestFormComponent implements OnInit {
  @Input() type: TestAnswerType;
  @Input() test: Test;

  constructor() {}

  ngOnInit(): void {
    if (this.test.testOptions.length === 0) {
      this.addOption();

      if (this.type !== TestAnswerType.Short) {
        this.addOption();
      }
    } else if (this.type === TestAnswerType.Short) {
      this.test.testOptions = [];
      this.addOption();
    }
  }

  addOption(): void {
    this.test.testOptions.push(new TestOption(false, ''));
  }
}
