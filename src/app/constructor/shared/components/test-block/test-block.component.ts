import { Component, OnInit } from '@angular/core';
import { TestAnswerType } from '../../models/TestAnswerType';

@Component({
  selector: 'app-test-block',
  templateUrl: './test-block.component.html',
  styleUrls: ['./test-block.component.scss']
})
export class TestBlockComponent implements OnInit {

  answer: TestAnswerType = TestAnswerType.Multiple;

  constructor() { }

  ngOnInit(): void {
  }
}
