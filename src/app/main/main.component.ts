import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { MediaService } from '../services/media.service';

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
    this.courseService.getCourseById(1).subscribe(data => {
      this.mediaService.getMediaById(data.media.id).subscribe(src => {
        let course = new CourseWithImage(data.id, data.name, data.description);
        course.loadImage(src);
        this.courses.push(course);
      });
    })
  }

  editCourse(id: number) {
    this.router.navigateByUrl(`course/edit/${id}`);
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id);
  }
}

export class CourseWithImage {
  constructor(
    public id: number, 
    public name: string, 
    public description: string, 
    public imageSrc?: string) {

  }

  loadImage(image: Blob) {
    let reader = new FileReader();
    reader.onload = (event) => {
      this.imageSrc = (event.target as FileReader).result as string;
    };
    reader.readAsDataURL(image);
  }
}