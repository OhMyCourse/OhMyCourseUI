import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstructorComponent } from './constructor/constructor.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'constructor', component: ConstructorComponent, pathMatch: 'full' },
  { path: 'course/edit/:id', component: CoursePageComponent },
  { path: 'course/create', component: CoursePageComponent },
  { path: 'course/all', component: CourseListComponent },
  { path: '', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
