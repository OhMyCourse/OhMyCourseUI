import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CreateLessonMaterialRequest, LessonService, LessonMaterialType, CreateTestRequest, CreateLessonRequest } from '../services/lesson.service';
import { MediaRequest, MediaService } from '../services/media.service';
import { Block } from '../shared/models/Block';
import { Lesson } from '../shared/models/Lesson';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent implements OnInit {
  @Input() lesson: Lesson;
  @Input() courseId: number;
  @Output() saveLesson = new EventEmitter();

  constructor(
    private mediaService: MediaService,
    private lessonService: LessonService) {
  }

  ngOnInit(): void {
  }

  onAddBlock(block: Block): void {
    this.lesson.blocks.push(block);
  }

  onDeleteBlock(id: string): void {
    this.lesson.blocks = this.lesson.blocks.filter(b => b.id !== id);
  }

  onSaveLesson(): void {
    let lessonMaterials: CreateLessonMaterialRequest[] = [];
    let blobs: MediaRequest[] = [];

    this.lesson.blocks.forEach((b, index) => {
      let value = b.value;
      console.log(b);
      switch (b.name) {
        case 'text':
          lessonMaterials.push(this.getLessonMaterialTextRequest(value as string, false));
          break;
        case 'tip':
          lessonMaterials.push(this.getLessonMaterialTextRequest(value as string, true));
          break;
        case 'test':
          lessonMaterials.push(this.getLessonMaterialTestRequest(value as CreateTestRequest));
          break;
        case 'audio':
          blobs.push({ type: LessonMaterialType.Audio, value: value as File, order: index });
          break;
        case 'video':
          blobs.push({ type: LessonMaterialType.Video, value: value as File, order: index });
          break;
        case 'image':
          blobs.push({ type: LessonMaterialType.Image, value: value as Blob, order: index });
          break;
      }
    })

    let request: CreateLessonRequest = {
      title: this.lesson.name,
      lessonMaterials: lessonMaterials,
      courseId: this.courseId
    };

    if (blobs.length !== 0) {
      this.mediaService.createMediaMany(blobs).subscribe(data => {
        console.log(data);
        data.forEach(b => {
          lessonMaterials.splice(
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
      })
    }

    this.saveLesson.emit();
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