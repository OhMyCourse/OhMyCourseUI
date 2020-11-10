import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from } from 'rxjs';
import { CourseService } from '../services/course.service';
import {
  LessonMaterialResponse,
  LessonMaterialType,
  LessonService,
} from '../services/lesson.service';
import { MediaService } from '../services/media.service';
import { AudioBlock } from '../shared/models/AudioBlock';
import { Block } from '../shared/models/Block';
import { Course } from '../shared/models/Course';
import { ImageBlock } from '../shared/models/ImageBlock';
import { Lesson } from '../shared/models/Lesson';
import { Test, TestOption, TestType } from '../shared/models/Test';
import { TestBlock } from '../shared/models/TestBlock';
import { TextBlock } from '../shared/models/TextBlock';
import { TipBlock } from '../shared/models/TipBlock';
import { VideoBlock } from '../shared/models/VideoBlock';

@Component({
  selector: 'app-course-lesson-viewer',
  templateUrl: './course-lesson-viewer.component.html',
  styleUrls: ['./course-lesson-viewer.component.scss'],
})
export class CourseLessonViewerComponent implements OnInit {
  @Input() course: Course;
  @Output() onBackToEnrollment = new EventEmitter();
  lessonToView: Lesson;

  constructor(
    private lessonService: LessonService,
    private mediaService: MediaService,
    private coursService: CourseService
  ) {}

  ngOnInit(): void {
    this.coursService.getCourseById(this.course.id).subscribe((course) => {
      this.course = course;
    });
  }

  loadLessonDetails(lessonId: number) {
    this.lessonService.getLessonById(lessonId).subscribe((data) => {
      this.lessonToView = new Lesson();
      this.lessonToView.name = data.title;
      this.lessonToView.desciption = data.description;

      if (data.materials) {
        from(data.materials).subscribe((material) => {
          this.lessonService
            .getLessonMaterial(material.id)
            .subscribe((material) => {
              console.log(material);
              this.lessonToView.blocks.push(
                this.getBlockByMaterialResponse(material)
              );
            });
        });
      }
    });
  }

  getBlockByMaterialResponse(matResponse: LessonMaterialResponse): Block {
    let block: Block;

    switch (matResponse.type) {
      case LessonMaterialType.Text:
        if (matResponse.textContent.isTip) {
          block = new TipBlock();
        } else {
          block = new TextBlock();
        }
        block.value = matResponse.textContent.text;
        break;
      case LessonMaterialType.Test:
        block = new TestBlock();
        block.value = new Test(
          matResponse.test.task,
          matResponse.test.score,
          this.getTestTypeByOptions(matResponse.test.options)
        );
        block.value.testOptions = matResponse.test.options;
        break;
      case LessonMaterialType.Audio:
        block = new AudioBlock();

        this.getMediaById(matResponse.media.id, block);
        break;
      case LessonMaterialType.Image:
        block = new ImageBlock();

        this.getMediaById(matResponse.media.id, block);
        break;
      case LessonMaterialType.Video:
        block = new VideoBlock();

        this.getMediaById(matResponse.media.id, block);
        break;
    }

    return block;
  }

  private getMediaById(mediaId: number, block: Block) {
    this.mediaService.getMediaById(mediaId).subscribe((data) => {
      block.value = data;
    });
  }

  private getTestTypeByOptions(testOptions: TestOption[]) {
    if (testOptions.length === 1 && testOptions[0].isRight) {
      return TestType.Short;
    } else if (testOptions.filter((t) => t.isRight).length === 1) {
      return TestType.Radio;
    } else {
      return TestType.Checkbox;
    }
  }
}
