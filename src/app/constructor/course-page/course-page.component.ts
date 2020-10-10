import { Component, OnInit } from '@angular/core';
import { Block } from '../shared/models/Block';

@Component({
  selector: 'course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  blocks: Block[];


  constructor() { }

  ngOnInit(): void {
  }
}
