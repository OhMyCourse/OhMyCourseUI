import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { CourseService } from '../services/course.service';
import { MediaService } from '../services/media.service';
import { CourseWithImage } from '../shared/models/CourseWithImage';

@Component({
  selector: 'app-course-enrollment',
  templateUrl: './course-enrollment.component.html',
  styleUrls: ['./course-enrollment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseEnrollmentComponent implements OnInit {
  course: CourseWithImage;
  lessonsView = false;

  constructor(
    private courseService: CourseService,
    private mediaService: MediaService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCourse(Number.parseInt(this.activedRoute.snapshot.params['id']));
  }

  private loadCourse(id: number) {
    this.courseService
      .getCourseById(id)
      .pipe(
        map(
          (data) =>
            new CourseWithImage(
              data.id,
              data.name,
              data.description,
              data.media.id,
              data.lessons ? data.lessons.length : 0
            )
        ),
        tap((data) => {
          this.course = data;
        })
      )
      .subscribe((course) => {
        this.mediaService.getMediaById(course.mediaId).subscribe((src) => {
          course.loadImage(src);
        });
      });
  }
}
