import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstructorComponent } from './constructor/constructor.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseEnrollmentComponent } from './course-enrollment/course-enrollment.component';
import { CourseLessonViewerComponent } from './course-lesson-viewer/course-lesson-viewer.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserProfileCoursesComponent } from './user-profile/user-profile-courses/user-profile-courses.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'constructor', component: ConstructorComponent, pathMatch: 'full' },
  { path: 'course/edit/:id', component: CoursePageComponent },
  { path: 'course/create', component: CourseCreateComponent },
  { path: 'course/all', component: CourseListComponent },
  { path: 'course/enrollment/:id', component: CourseEnrollmentComponent },
  { path: 'user/register', component: RegistrationComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/profile', component: UserProfileComponent },
  { path: 'user/courses', component: UserProfileCoursesComponent },
  { path: 'course/view/:id', component: CourseLessonViewerComponent },
  { path: '', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
