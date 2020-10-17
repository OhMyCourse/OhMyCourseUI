import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from '../constructor/shared/models/Lesson';

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss']
})
export class LessonPageComponent implements OnInit {
  @Input() lesson: Lesson;

  constructor() { }

  ngOnInit(): void {
  }
}
