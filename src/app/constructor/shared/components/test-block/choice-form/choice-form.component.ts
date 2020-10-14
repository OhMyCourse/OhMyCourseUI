import { Input, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TestAnswerType } from '../../../models/TestAnswerType';

@Component({
  selector: 'app-choice-form',
  templateUrl: './choice-form.component.html',
  styleUrls: ['./choice-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChoiceFormComponent implements OnInit {
  @Input() answerControl: FormControl;
  @Input() type: TestAnswerType;
  
  constructor() {
  }

  ngOnInit(): void {
  }

}
