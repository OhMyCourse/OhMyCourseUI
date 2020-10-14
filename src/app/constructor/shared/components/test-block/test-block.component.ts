import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-block',
  templateUrl: './test-block.component.html',
  styleUrls: ['./test-block.component.scss']
})
export class TestBlockComponent implements OnInit {

  answer: TestBlockAnswer = TestBlockAnswer.Multiple;

  constructor() { }

  

  ngOnInit(): void {
  }
  
}

export enum TestBlockAnswer {
  Multiple,
  One,
  Short
}
