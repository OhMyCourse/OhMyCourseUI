import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from 'src/app/shared/models/Lesson';

@Component({
  selector: 'app-course-lesson-viewer-item',
  templateUrl: './course-lesson-viewer-item.component.html',
  styleUrls: ['./course-lesson-viewer-item.component.scss'],
})
export class CourseLessonViewerItemComponent implements OnInit {
  @Input() lesson: Lesson;

  constructor() {}

  ngOnInit(): void {}
}
