import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CourseCategory, EnumObj } from '../shared/models/CourseCategory';
import { Lesson } from '../shared/models/Lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from '../guid';
import { Course } from '../shared/models/Course';
import { CourseService } from '../services/course.service';
import { MediaService } from '../services/media.service';
import {
  LessonMaterialResponse,
  LessonMaterialType,
  LessonService,
} from '../services/lesson.service';
import { forkJoin, from } from 'rxjs';
import { Block } from '../shared/models/Block';
import { TipBlock } from '../shared/models/TipBlock';
import { TextBlock } from '../shared/models/TextBlock';
import { AudioBlock } from '../shared/models/AudioBlock';
import { ImageBlock } from '../shared/models/ImageBlock';
import { VideoBlock } from '../shared/models/VideoBlock';
import { TestBlock } from '../shared/models/TestBlock';
import { Test, TestOption, TestType } from '../shared/models/Test';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoursePageComponent implements OnInit {
  categories: EnumObj[] = EnumObj.ParseEnum(CourseCategory);
  categorySelect: FormControl = new FormControl('', [Validators.required]);
  category: EnumObj;
  lessons: Lesson[] = [];
  constructorMode = false;
  lessonEdit: Lesson;
  course: Course = new Course();

  constructor(
    private courseService: CourseService,
    activeRoute: ActivatedRoute,
    private router: Router,
    private mediaService: MediaService,
    private lessonService: LessonService
  ) {
    this.course.id = Number.parseInt(activeRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    if (this.course.id) {
      this.reloadData();
    } else {
      let request = {
        name: Guid.newGuid(),
        description: `test_${Guid.newGuid()}`,
        mediaId: 0,
      };
      this.mediaService.createMockImage().subscribe((data) => {
        request.mediaId = data.id;
        this.courseService.createCourse(request).subscribe((data) => {
          this.course.id = data.id;
        });
      });
    }
  }

  onAddLesson(): void {
    const lessonName = `Lesson ${this.lessons.length + 1} - ...`;
    this.lessons.push(new Lesson(null, lessonName));
  }

  onEditLesson(lesson: Lesson): void {
    this.constructorMode = true;
    this.lessonEdit = lesson;
  }

  onDeleteLesson(lesson: Lesson, callback?: () => void): void {
    this.lessonService.deleteLesson(lesson.id).subscribe(() => {
      let lessonIndex = this.lessons.findIndex((l) => l.guid === lesson.guid);

      this.lessons.splice(lessonIndex, 1);

      if (callback) {
        callback();
      }
    });
  }

  onSaveLesson(deleteLessonId?: number): void {
    if (deleteLessonId) {
      let lesson = this.lessons.find((l) => l.id === deleteLessonId);

      this.onDeleteLesson(lesson, () => {
        this.lessons = [];
        this.reloadData();
        this.constructorMode = false;
      });
    } else {
      this.constructorMode = false;
      this.reloadData();
    }
  }

  onSaveCourse(): void {
    this.router.navigateByUrl('');
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

  private reloadData() {
    this.courseService.getCourseById(this.course.id).subscribe((course) => {
      this.course.name = course.name;
      this.course.description = course.description;

      course.lessons.forEach((_lesson) => {
        let lesson = new Lesson(_lesson.id, null, _lesson.title);

        this.lessons.push(lesson);

        if (_lesson.materials) {
          from(_lesson.materials).subscribe((material) => {
            this.lessonService
              .getLessonMaterial(material.id)
              .subscribe((material) => {
                lesson.blocks.push(this.getBlockByMaterialResponse(material));
              });
          });
        }
      });
    });
  }
}
