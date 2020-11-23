import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { MediaService } from 'src/app/services/media.service';
import { UserService } from 'src/app/services/user.service';
import { Course } from 'src/app/shared/models/Course';
import { CourseWithImage } from 'src/app/shared/models/CourseWithImage';
import { ProfileMenuItem } from 'src/app/shared/models/ProfileMenuItem';
import { UserProfile } from 'src/app/shared/models/UserProfile';

@Component({
  selector: 'app-user-profile-courses',
  templateUrl: './user-profile-courses.component.html',
  styleUrls: ['./user-profile-courses.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
        this.created = courses
          .filter((c) => c.status === 'created')
          .map(
            (c) =>
              new CourseWithImage(
                c.courseId,
                c.course.name,
                c.course.description,
                c.course.mediaId,
                0
              )
          );
        this.started = courses
          .filter((c) => c.status === 'started')
          .map(
            (c) =>
              new CourseWithImage(
                c.courseId,
                c.course.name,
                c.course.description,
                c.course.mediaId,
                0
              )
          );
        this.completed = courses
          .filter((c) => c.status === 'completed')
          .map(
            (c) =>
              new CourseWithImage(
                c.courseId,
                c.course.name,
                c.course.description,
                c.course.mediaId,
                0
              )
          );

        this.profile.courseCreated = this.created.length;
        this.profile.courseCompleted = this.completed.length;
        this.profile.courseStarted = this.started.length;
        this.reloadCourses();
      });
    });
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
}
