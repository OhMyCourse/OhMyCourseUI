import { Input, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TestOption } from 'src/app/shared/models/Test';
import { TestAnswerType } from '../../../models/TestAnswerType';

@Component({
  selector: 'app-choice-form',
  templateUrl: './choice-form.component.html',
  styleUrls: ['./choice-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceFormComponent implements OnInit {
  @Input() type: TestAnswerType;
  @Input() option: TestOption;

  constructor() {}

  ngOnInit(): void {
    if (this.type === TestAnswerType.Short) {
      this.option.isRight = true;
    }
  }
}
