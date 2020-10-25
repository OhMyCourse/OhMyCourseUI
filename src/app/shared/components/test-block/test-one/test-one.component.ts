import { Component, Input, OnInit } from '@angular/core';
import { Test } from 'src/app/shared/models/Test';

@Component({
  selector: 'app-test-one',
  templateUrl: './test-one.component.html',
})
export class TestOneComponent implements OnInit {
  @Input() test: Test;

  constructor() {}

  ngOnInit(): void {}
}
