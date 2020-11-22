import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { MediaService } from 'src/app/services/media.service';
import { Course } from 'src/app/shared/models/Course';
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

  profile = new UserProfile(
    'Vasya Pupkin',
    'vasya.pupkin@gmail.com',
    new Date('01/01/2021'),
    1,
    2,
    3,
    null,
    281
  );

  started: CourseWithImage[] = [
    new CourseWithImage(1, 'Test', 'Test', 281, 5, 'Vasya pup', 2),
    new CourseWithImage(1, 'Test', 'Test', 281, 5, 'Vasya pup', 3),
  ];
  created: CourseWithImage[] = [
    new CourseWithImage(186, 'Test', 'Test', 281, 5, 'Vasya pup', 2),
  ];
  joined: CourseWithImage[] = [
    new CourseWithImage(1, 'Test', 'Test', 281, 5, 'Vasya pup', 2),
    new CourseWithImage(1, 'Test', 'Test', 281, 5, 'Vasya pup', 3),
  ];

  all = [...this.started, ...this.created, ...this.joined];

  constructor(
    private mediaService: MediaService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.mediaService.getMediaById(this.profile.mediaId).subscribe((image) => {
      this.profile.loadImage(image);
    });

    this.reloadCourses();
  }

  onCourseDelete(id: number) {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.reloadCourses();
    });
  }

  reloadCourses() {
    from(this.all).subscribe((val) => {
      this.mediaService
        .getMediaById(val.mediaId)
        .subscribe((result) => val.loadImage(result));
    });
  }
}
