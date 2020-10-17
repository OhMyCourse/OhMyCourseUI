import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CourseCategory, EnumObj } from '../shared/models/CourseCategory';

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
  lessons: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  addLesson() {

  }
}
