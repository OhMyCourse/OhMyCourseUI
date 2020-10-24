import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CourseCategory, EnumObj } from '../shared/models/CourseCategory';
import { Lesson } from '../shared/models/Lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from '../guid';
import { Course } from '../shared/models/Course';
import { CourseService } from '../services/course.service';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoursePageComponent implements OnInit {

  categories: EnumObj[] = EnumObj.ParseEnum(CourseCategory);
  categorySelect: FormControl = new FormControl('', [Validators.required]);
  category: EnumObj;
  lessons: Lesson[] = [];
  constructorMode = false;
  lessonEdit: Lesson;
  course: Course = new Course();

  constructor(
    private courseService: CourseService, 
    activeRoute: ActivatedRoute,
    private router: Router,
    private mediaService: MediaService) {
    this.course.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit(): void {
    if(this.course.id) {
      // this.lessonService.lessonControllerGetById(1).subscribe(data => {
      //   let lesson = new Lesson(data.id, data.materials.)
      // })
      // get lessons by courseId
    } else {
      let request = {
        name: Guid.newGuid(),
        description: `test_${Guid.newGuid()}`,
        mediaId: 0
      };
      this.mediaService.createMockImage().subscribe(data => {
        request.mediaId = data.id;
        this.courseService.createCourse(request).subscribe(data => {
          this.course.id = data.id
        })
      })
    }
  }

  onAddLesson(): void {
    const lessonName = `Lesson ${this.lessons.length + 1} - ...`;
    this.lessons.push(new Lesson(null, lessonName));
  }

  onEditLesson(lesson: Lesson): void {
    this.constructorMode = true;
    this.lessonEdit = lesson;
  }

  onDeleteLesson(lesson: Lesson): void {
    // this.lessons.splice(this.lessons.find(lesson), )
  }

  onSaveLesson(): void {
    this.constructorMode = false;
  }

  onSaveCourse(): void {
    this.router.navigateByUrl('');
  }
}
