import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { BaseFormComponent } from '../constructor/shared/models/BaseFormComponent';
import { Lesson } from '../constructor/shared/models/Lesson';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.scss']
})
export class LessonFormComponent extends BaseFormComponent implements OnInit {
  @Input() lesson: Lesson;
  @Output() deleteLesson = new EventEmitter<Lesson>();
  @Output() editLesson = new EventEmitter<Lesson>();

  form = this.fb.group({
    nameControl: ['', [Validators.required]],
    descriptionControl: ['']
  });

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.setValue('nameControl', this.lesson.name);
  }

  onEditLesson(): void {
    this.editLesson.emit(this.lesson);
  }

  onDeleteLesson(): void {
    this.deleteLesson.emit(this.lesson);
  }
}
