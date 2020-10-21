import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CreateLessonMaterialRequestDto, CreateLessonRequestDto, CreateTestRequestDto, LessonService, MediaService } from 'api';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Guid } from '../guid';
import { BaseFormComponent } from './shared/models/BaseFormComponent';
import { Block } from './shared/models/Block';
import { Lesson } from './shared/models/Lesson';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent extends BaseFormComponent implements OnInit  {
  @Input() lesson: Lesson;
  @Input() courseId: number;
  @Output() saveLesson = new EventEmitter();

  order: number = 1;
  form = this.fb.group({});

  constructor(private mediaService: MediaService, private lessonService: LessonService, private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
  }

  onAddBlock(block: Block): void {
    block.order = this.order;
    this.form.addControl(this.getBlockControlName(block), new FormControl(undefined));
    this.order++;
    this.lesson.blocks.push(block);
  }

  private lessonMaterials: CreateLessonMaterialRequestDto[] = [];

  onSaveLesson(): void {

    Object.keys(this.form.controls).forEach(key => {
      let value = this.form.controls[key].value;

      switch(key.split('_')[0]) {
        case 'text':
          this.lessonMaterials.push(this.saveText(value, false));
          break;
        case 'tip':
          this.lessonMaterials.push(this.saveText(value, true));
          break;
        case 'audio':
          this.saveBlob(value, 'audio');
          break;
        case 'video':
          this.saveBlob(value, 'video');
          break;
        case 'test':
          this.lessonMaterials.push(this.saveTest(value));
          break;
        case 'image':
          this.saveBlob(value, 'video');
          break;
      }
    });

    let request: CreateLessonRequestDto = {
      title: this.lesson.name,
      lessonMaterials: this.lessonMaterials,
      courseId: this.courseId
    };

    console.log(request);

    this.lessonService.lessonControllerCreate(request).subscribe(data => {
      console.log(data);
    })

    this.saveLesson.emit();
  }

  getBlockControlName(block: Block) {
    return `${block.name}_${block.order}`;
  }

  getControlByBlockName(block: Block): FormControl {
    let control = this.getControl(this.getBlockControlName(block)) as FormControl;
    return control;
  }

  private saveTest(value: CreateTestRequestDto): CreateLessonMaterialRequestDto {
    return {
      type: 'test',
      test: value,
    }
  }

  private saveBlob(value: Blob, type: 'audio' | 'video'): void {
    this.mediaService.mediaControllerCreateForm(value).subscribe(data => {
      this.lessonMaterials.push({
        type: type,
        mediaId: data.id,
      });
    });
  }

  private saveText(value: string, isTip: boolean): CreateLessonMaterialRequestDto {
    return {
      type: 'text',
      textContent: {
        text: value,
        isTip: false
      }
    } 
  }
}