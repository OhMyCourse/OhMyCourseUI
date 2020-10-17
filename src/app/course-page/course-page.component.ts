import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CourseCategory, EnumObj } from '../constructor/shared/models/CourseCategory';
import { Lesson } from '../constructor/shared/models/Lesson';

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
  lessons: Lesson[] = [new Lesson('test', 'test')]; // empty
  constructorMode = true; // false
  lessonEdit: Lesson;

  constructor() {
    this.lessonEdit = this.lessons[0]; // remove
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
}
