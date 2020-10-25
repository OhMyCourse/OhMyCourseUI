import { Component, OnInit } from '@angular/core';
import { BlockComponent } from '../../models/BlockComponent';
import { TestAnswerType } from '../../models/TestAnswerType';

@Component({
  selector: 'app-test-block',
  templateUrl: './test-block.component.html',
  styleUrls: ['./test-block.component.scss'],
})
export class TestBlockComponent extends BlockComponent implements OnInit {
  answer: TestAnswerType = TestAnswerType.Multiple;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
