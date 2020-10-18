import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CourseCategory, EnumObj } from '../constructor/shared/models/CourseCategory';
import { Lesson } from '../constructor/shared/models/Lesson';
import { CourseService, CreateCourseRequestDto, MediaService } from 'api';

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

  constructor(private courseService: CourseService, private mediaService: MediaService) {
  }

  ngOnInit(): void {
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
    // hardcode values must be deleted 
    
    let request: CreateCourseRequestDto = {
      name: 'How to use <<Oh my course!>>',
      description: 'test',
      mediaId: 1
    };

    this.courseService.courseControllerCreate(request).subscribe(val => {
      console.log(val);
    })
  }
}
