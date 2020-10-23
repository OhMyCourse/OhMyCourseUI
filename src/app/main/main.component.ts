import { Component, OnInit } from '@angular/core';
import { CourseService, MediaService } from 'api';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'description', 'action'];

  courses: CourseWithImage[] = [];

  constructor(private courseService: CourseService, private mediaService: MediaService, private imageServce: ImageService) { }

  ngOnInit(): void {
    this.courseService.courseControllerGetById(1).subscribe(data => {
      this.imageServce.getImageSrc(data.media.id).subscribe(src => {
        let course = new CourseWithImage(data.name, data.description);
        course.loadImage(src);
        this.courses.push(course);
      });
    })
  }

  editCourse(id: number) {

  }

}

export class CourseWithImage {
  constructor(public name: string, public description: string, public imageSrc?: string) {

  }

  loadImage(image: Blob) {
    let reader = new FileReader();
    reader.onload = (event) => {
      this.imageSrc = (event.target as FileReader).result as string;
    };
    reader.readAsDataURL(image);
  }
}