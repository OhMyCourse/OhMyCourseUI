import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/services/media.service';
import { UserCourseItem, UserService } from 'src/app/services/user.service';
import { Certificate } from 'src/app/shared/models/Certificate';
import { CourseWithImage } from 'src/app/shared/models/CourseWithImage';
import { ProfileMenuItem } from 'src/app/shared/models/ProfileMenuItem';
import { UserProfile } from 'src/app/shared/models/UserProfile';

@Component({
  selector: 'app-user-profile-certificates',
  templateUrl: './user-profile-certificates.component.html',
  styleUrls: ['./user-profile-certificates.component.scss'],
})
export class UserProfileCertificatesComponent implements OnInit {
  certificates: Certificate[] = [
    new Certificate(1, 'DSladlsaldasldalsdlsadlas', new Date()),
    new Certificate(2, '21321321321', new Date()),
  ];

  menuItems: ProfileMenuItem[] = [
    new ProfileMenuItem('My profile', false, '/user/profile'),
    new ProfileMenuItem('My courses', false, '/user/courses'),
    new ProfileMenuItem('Certificates', true, '/user/certificates'),
  ];

  profile: UserProfile;

  constructor(
    private userService: UserService,
    private mediaService: MediaService,
    private router: Router
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
        this.userService.getCreatedCourses().subscribe((createdCourses) => {
          this.profile.courseCreated = createdCourses.map(
            (x) => new CourseWithImage(x.id, x.name, '', x.mediaId, 0)
          ).length;
          this.profile.courseCompleted = this.getCoursesByType(
            courses,
            'finished'
          ).length;
          this.profile.courseStarted = this.getCoursesByType(
            courses,
            'started'
          ).length;
        });
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

  onCertificateClick(cert: Certificate) {
    this.router.navigate([
      '/cert',
      cert.id,
      { certName: cert.name, certDate: cert.date },
    ]);
  }
}
