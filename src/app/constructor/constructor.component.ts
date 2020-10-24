import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CreateLessonMaterialRequest, LessonService, LessonMaterialType, CreateTestRequest, CreateLessonRequest } from '../services/lesson.service';
import { BlobRequest, MediaService } from '../services/media.service';
import { BaseFormComponent } from '../shared/models/BaseFormComponent';
import { Block } from '../shared/models/Block';
import { Lesson } from '../shared/models/Lesson';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent extends BaseFormComponent implements OnInit {
  @Input() lesson: Lesson;
  @Input() courseId: number;
  @Output() saveLesson = new EventEmitter();

  form = this.fb.group({});

  private lessonMaterials: CreateLessonMaterialRequest[] = [];

  constructor(
    private mediaService: MediaService,
    private lessonService: LessonService,
    private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    if (this.lesson.blocks.length !== 0) {
      this.lesson.blocks.forEach((block) => {
        this.form.addControl(this.getBlockControlName(block), new FormControl());
      });
    }
  }

  onAddBlock(block: Block): void {
    this.form.addControl(this.getBlockControlName(block), new FormControl(undefined));
    this.lesson.blocks.push(block);
  }

  onSaveLesson(): void {

    let blobs: BlobRequest[] = [];

    Object.keys(this.form.controls).forEach((key, index) => {
      let value = this.form.controls[key].value;
      this.lesson.blocks[index].value = value;

      switch (key.split('_')[0]) {
        case 'text':
          this.lessonMaterials.push(this.getLessonMaterialTextRequest(value, false));
          break;
        case 'tip':
          this.lessonMaterials.push(this.getLessonMaterialTextRequest(value, true));
          break;
        case 'test':
          this.lessonMaterials.push(this.getLessonMaterialTestRequest(value));
          break;
        case 'audio':
          blobs.push({ type: LessonMaterialType.Audio, value: value, order: index });
          break;
        case 'video':
          blobs.push({ type: LessonMaterialType.Video, value: value, order: index });
          break;
        case 'image':
          blobs.push({ type: LessonMaterialType.Image, value: value, order: index });
          break;
      }
    });

    let request: CreateLessonRequest = {
      title: this.lesson.name,
      lessonMaterials: this.lessonMaterials,
      courseId: this.courseId
    };

    if (blobs.length !== 0) {
      this.mediaService.createMedia(blobs[0].value).subscribe(data => {
        console.log(data);
      });

      this.mediaService.createMediaMany(blobs).subscribe(data => {
        console.log(data);
        data.forEach(b => {
          this.lessonMaterials = this.lessonMaterials.splice(
            b.order,
            0,
            this.getLessonMaterialBlobRequest(b.mediaId, b.type)
          );
        });

        this.lessonService.createLesson(request).subscribe(data => {
          console.log(data);
        });
      });
    } else {
      this.lessonService.createLesson(request).subscribe(data => {
        console.log(data);
      })
    }

    this.saveLesson.emit();
  }

  getBlockControlName(block: Block) {
    return `${block.name}_${block.id}`;
  }

  getControlByBlockName(block: Block): FormControl {
    let control = this.getControl(this.getBlockControlName(block)) as FormControl;
    return control;
  }

  private getLessonMaterialTestRequest(request: CreateTestRequest): CreateLessonMaterialRequest {
    return {
      type: LessonMaterialType.Test,
      test: request,
    }
  }

  private getLessonMaterialBlobRequest(
    mediaId: number,
    type: LessonMaterialType.Video | LessonMaterialType.Image | LessonMaterialType.Audio
  ): CreateLessonMaterialRequest {
    return {
      type: type,
      mediaId: mediaId
    };
  }

  private getLessonMaterialTextRequest(value: string, isTip: boolean): CreateLessonMaterialRequest {
    return {
      type: LessonMaterialType.Text,
      textContent: {
        text: value,
        isTip: isTip
      }
    }
  }
}