import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  lessons: Lesson[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddLesson(): void {
    this.lessons.push(new Lesson());
  }

  onEditLesson(lesson: Lesson): void {

  }

  onDeleteLesson(lesson: Lesson): void {
    // this.lessons.splice(this.lessons.find(lesson), )
  }
}
