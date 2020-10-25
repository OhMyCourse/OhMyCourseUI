import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CourseService } from '../services/course.service';
import { MediaService } from '../services/media.service';
import { CourseWithImage } from '../shared/models/CourseWithImage';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'description', 'action'];
  courses: CourseWithImage[] = [];

  constructor(
    private courseService: CourseService, 
    private router: Router, 
    private mediaService: MediaService) { }

  ngOnInit(): void {
    this.courseService.getCourses().pipe(
      switchMap(data => from(data)),
      map(data => new CourseWithImage(data.id, data.name, data.description, data.media.id)),
      tap(data => {
        this.courses.push(data);
      }),
    ).subscribe(course => {
      this.mediaService.getMediaById(course.mediaId).subscribe(src => {
        course.loadImage(src);
      });
    })
  }

  editCourse(id: number) {
    this.router.navigateByUrl(`course/edit/${id}`);
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe(data => {
      this.courses = this.courses.filter(course => course.id !== id);
    });
  }
}