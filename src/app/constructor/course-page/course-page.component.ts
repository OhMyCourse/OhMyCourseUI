import { Component, Input, OnInit } from '@angular/core';
import { Block } from '../shared/models/Block';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  @Input() blocks: Block[];

  constructor() { }

  ngOnInit(): void {
  }
}
