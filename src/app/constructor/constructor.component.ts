import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  CreateLessonMaterialRequest,
  LessonService,
  LessonMaterialType,
  CreateTestRequest,
  CreateLessonRequest,
} from '../services/lesson.service';
import { MediaRequest, MediaService } from '../services/media.service';
import { Block } from '../shared/models/Block';
import { Lesson } from '../shared/models/Lesson';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss'],
})
export class ConstructorComponent implements OnInit {
  @Input() lesson: Lesson;
  @Input() courseId: number;
  @Output() saveLesson = new EventEmitter();

  constructor(
    private mediaService: MediaService,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit constructor');
  }

  onAddBlock(block: Block): void {
    this.lesson.blocks.push(block);
  }

  onDeleteBlock(id: string): void {
    this.lesson.blocks = this.lesson.blocks.filter((b) => b.id !== id);
  }

  onSaveLesson(): void {
    let request: CreateLessonRequest = {
      title: this.lesson.name,
      lessonMaterials: [],
      courseId: this.courseId,
    };

    let files: MediaRequest[] = [];

    this.lesson.blocks.forEach((b, index) => {
      let value = b.value;

      switch (b.name) {
        case 'text':
          request.lessonMaterials.push(
            this.getLessonMaterialTextRequest(value as string, false)
          );
          break;
        case 'tip':
          request.lessonMaterials.push(
            this.getLessonMaterialTextRequest(value as string, true)
          );
          break;
        case 'test':
          request.lessonMaterials.push(
            this.getLessonMaterialTestRequest(value as CreateTestRequest)
          );
          break;
        case 'audio':
          files.push({
            type: LessonMaterialType.Audio,
            value: value as File,
            order: index,
          });
          break;
        case 'video':
          files.push({
            type: LessonMaterialType.Video,
            value: value as File,
            order: index,
          });
          break;
        case 'image':
          files.push({
            type: LessonMaterialType.Image,
            value: value as File,
            order: index,
          });
          break;
      }
    });

    if (files.length !== 0) {
      this.mediaService.createMediaMany(files).subscribe((data) => {
        data.forEach((b) => {
          request.lessonMaterials.splice(
            b.order,
            0,
            this.getLessonMaterialBlobRequest(b.mediaId, b.type)
          );
        });

        this.lessonService.createLesson(request).subscribe((data) => {
          console.log('save lesson response', data);
          this.saveLesson.emit();
        });
      });
    } else {
      this.lessonService.createLesson(request).subscribe((data) => {
        console.log('save lesson response', data);
        this.saveLesson.emit();
      });
    }
  }

  private getLessonMaterialTestRequest(
    request: CreateTestRequest
  ): CreateLessonMaterialRequest {
    return {
      type: LessonMaterialType.Test,
      test: request,
    };
  }

  private getLessonMaterialBlobRequest(
    mediaId: number,
    type:
      | LessonMaterialType.Video
      | LessonMaterialType.Image
      | LessonMaterialType.Audio
  ): CreateLessonMaterialRequest {
    return {
      type: type,
      mediaId: mediaId,
    };
  }

  private getLessonMaterialTextRequest(
    value: string,
    isTip: boolean
  ): CreateLessonMaterialRequest {
    return {
      type: LessonMaterialType.Text,
      textContent: {
        text: value,
        isTip: isTip,
      },
    };
  }
}
