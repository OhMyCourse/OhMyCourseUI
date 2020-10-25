import { Component, Input, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Test, TestOption } from 'src/app/shared/models/Test';
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
    this.test.testOptions.push(
      new TestOption(false, '', this.test.testOptions.length)
    );
  }

  onRadioChange(index: number) {
    this.test.testOptions.forEach((option) => (option.isRight = false));
    this.test.testOptions[index].isRight = true;
  }
}
