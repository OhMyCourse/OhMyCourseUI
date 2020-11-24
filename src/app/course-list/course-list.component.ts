import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CourseService } from '../services/course.service';
import { MediaService } from '../services/media.service';
import { UserService } from '../services/user.service';
import { CourseCategory, EnumObj } from '../shared/models/CourseCategory';
import { CourseWithImage } from '../shared/models/CourseWithImage';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  courses: CourseWithImage[] = [];
  categories: EnumObj[] = EnumObj.ParseEnum(CourseCategory);
  categorySelect: FormControl = new FormControl('');

  constructor(
    private courseService: CourseService,
    private mediaService: MediaService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses() {
    this.courseService
      .getCourses()
      .pipe(
        switchMap((data) => from(data)),
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
          if (
            !this.userService.user.value.notShowingCourses.includes(data.id)
          ) {
            this.courses.push(data);
          }
        })
      )
      .subscribe((course) => {
        this.mediaService.getMediaById(course.mediaId).subscribe((src) => {
          course.loadImage(src);
        });
      });
  }
}
