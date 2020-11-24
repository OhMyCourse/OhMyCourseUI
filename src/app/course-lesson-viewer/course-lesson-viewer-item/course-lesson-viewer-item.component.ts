import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Course } from 'src/app/shared/models/Course';
import { Lesson } from 'src/app/shared/models/Lesson';

@Component({
  selector: 'app-course-lesson-viewer-item',
  templateUrl: './course-lesson-viewer-item.component.html',
  styleUrls: ['./course-lesson-viewer-item.component.scss'],
})
export class CourseLessonViewerItemComponent implements OnInit {
  @Input() lesson: Lesson;
  @Input() course: Course;
  @Output() onGoBackByAnchor: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  onFinishLesson() {
    this.userService
      .finishLesson(this.lesson.id, this.userService.user.value.id)
      .pipe(delay(1000))
      .subscribe(() => {
        this.onGoBackByAnchor.emit();

        of(this.course.lessons.length)
          .pipe(delay(1000))
          .subscribe((data) => {
            const ids = this.course.lessons.map((l) => l.id);
            const lessonsLength = this.userService.user.value.passedLessons.filter(
              (l) => ids.includes(l)
            ).length;

            if (lessonsLength === data) {
              this.userService
                .finishCourse(this.course.id, this.userService.user.value.id)
                .subscribe();
            }
          });
      });
  }
}
