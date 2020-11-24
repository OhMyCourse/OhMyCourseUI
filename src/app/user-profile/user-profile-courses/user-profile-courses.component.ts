import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { MediaService } from 'src/app/services/media.service';
import { UserCourseItem, UserService } from 'src/app/services/user.service';
import { Course, CourseLesson } from 'src/app/shared/models/Course';
import { CourseWithImage } from 'src/app/shared/models/CourseWithImage';
import { ProfileMenuItem } from 'src/app/shared/models/ProfileMenuItem';
import { UserProfile } from 'src/app/shared/models/UserProfile';

@Component({
  selector: 'app-user-profile-courses',
  templateUrl: './user-profile-courses.component.html',
  styleUrls: ['./user-profile-courses.component.scss'],
})
export class UserProfileCoursesComponent implements OnInit {
  menuItems: ProfileMenuItem[] = [
    new ProfileMenuItem('My profile', false, '/user/profile'),
    new ProfileMenuItem('My courses', true, '/user/courses'),
    new ProfileMenuItem('Certificates', false, '/user/certificates'),
  ];

  profile: UserProfile;

  started: CourseWithImage[] = [];
  created: CourseWithImage[] = [];
  completed: CourseWithImage[] = [];

  all = [...this.started, ...this.created, ...this.completed];

  constructor(
    private mediaService: MediaService,
    private courseService: CourseService,
    public router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((profile) => {
      this.profile = profile;

      this.mediaService
        .getMediaById(this.profile.mediaId)
        .subscribe((image) => {
          this.profile.loadImage(image);
        });
      this.userService.getCourses(this.profile.id).subscribe((courses) => {
        this.created = this.getCoursesByType(courses, 'created');
        this.started = this.getCoursesByType(courses, 'started');
        this.completed = this.getCoursesByType(courses, 'finished');

        this.profile.courseCreated = this.created.length;
        this.profile.courseCompleted = this.completed.length;
        this.profile.courseStarted = this.started.length;
        this.reloadCourses();
      });
    });
  }

  private getCoursesByType(
    courses: UserCourseItem[],
    type: 'started' | 'finished' | 'created'
  ) {
    return courses
      .filter((c) => c.status === type)
      .map(
        (c) =>
          new CourseWithImage(
            c.courseId,
            c.course.name,
            c.course.description,
            c.course.mediaId,
            c.course.lessons ? c.course.lessons.length : 0,
            '',
            c.course.lessons
          )
      );
  }

  onCourseDelete(id: number) {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.reloadCourses();
    });
  }

  reloadCourses() {
    from([...this.started, ...this.completed, ...this.created]).subscribe(
      (val) => {
        this.mediaService
          .getMediaById(val.mediaId)
          .subscribe((result) => val.loadImage(result));
      }
    );
  }

  onCourseItemClick(courseId: number) {
    this.router.navigateByUrl('course/view/' + courseId);
  }

  getFinishedLessonsCount(lessons: CourseLesson[]) {
    if (!lessons) {
      return;
    }
    const ids = lessons.map((l) => l.id);
    return this.userService.user.value.passedLessons.filter((l) =>
      ids.includes(l)
    ).length;
  }
}
