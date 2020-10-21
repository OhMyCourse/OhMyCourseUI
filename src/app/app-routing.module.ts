import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstructorComponent } from './constructor/constructor.component';
import { CoursePageComponent } from './course-page/course-page.component';

const routes: Routes = [
  { path: 'constructor', component: ConstructorComponent, pathMatch: 'full'},
  { path: '', component: CoursePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
