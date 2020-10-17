import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstructorComponent } from './constructor/constructor.component';
import { CoursePageComponent } from './constructor/course-page/course-page.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'constructor', component: ConstructorComponent, pathMatch: 'full'},
  { path: 'course/create', component: CoursePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
