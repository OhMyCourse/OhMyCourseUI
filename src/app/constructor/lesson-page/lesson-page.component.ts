import { Component, Input, OnInit } from '@angular/core';
import { Block } from '../shared/models/Block';

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss']
})
export class LessonPageComponent implements OnInit {
  @Input() blocks: Block[];

  constructor() { }

  ngOnInit(): void {
  }
}
