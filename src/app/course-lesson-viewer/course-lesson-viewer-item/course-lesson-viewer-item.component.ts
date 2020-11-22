import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/shared/models/Lesson';

@Component({
  selector: 'app-course-lesson-viewer-item',
  templateUrl: './course-lesson-viewer-item.component.html',
  styleUrls: ['./course-lesson-viewer-item.component.scss'],
})
export class CourseLessonViewerItemComponent implements OnInit {
  @Input() lesson: Lesson;
  @Input() courseName: string;
  @Input() courseId: string;
  @Output() onGoBackByAnchor: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onFinishLesson() {
    this.onGoBackByAnchor.emit();
  }
}
