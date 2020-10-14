import { Input, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-answer-multiple-form',
  templateUrl: './answer-multiple-form.component.html',
  styleUrls: ['./answer-multiple-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnswerMultipleFormComponent implements OnInit {
  @Input() answerControl: FormControl;

  constructor() {
  }

  ngOnInit(): void {
  }

}
