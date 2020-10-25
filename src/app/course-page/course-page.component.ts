import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CourseCategory, EnumObj } from '../shared/models/CourseCategory';
import { Lesson } from '../shared/models/Lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from '../guid';
import { Course } from '../shared/models/Course';
import { CourseService } from '../services/course.service';
import { MediaService } from '../services/media.service';
import { LessonMaterialResponse, LessonMaterialType, LessonService } from '../services/lesson.service';
import { from } from 'rxjs';
import { Block } from '../shared/models/Block';
import { TipBlock } from '../shared/models/TipBlock';
import { TextBlock } from '../shared/models/TextBlock';
import { AudioBlock } from '../shared/models/AudioBlock';
import { ImageBlock } from '../shared/models/ImageBlock';
import { VideoBlock } from '../shared/models/VideoBlock';
import { TestBlock } from '../shared/models/TestBlock';
import { Test } from '../shared/models/Test';

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
  constructorMode = false;
  lessonEdit: Lesson;
  course: Course = new Course();

  constructor(
    private courseService: CourseService,
    activeRoute: ActivatedRoute,
    private router: Router,
    private mediaService: MediaService,
    private lessonService: LessonService) {
    this.course.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit(): void {
    if (this.course.id) {
      this.courseService.getCourseById(this.course.id).subscribe(course => {
        this.course.name = course.name;
        this.course.description = course.description;

        course.lessons.forEach(_lesson => {
          let lesson = new Lesson(_lesson.id, null, _lesson.title);

          this.lessons.push(lesson);

          if (_lesson.materials) { // wait for yarik to lesson.materials
            from(_lesson.materials).subscribe(material => {
              this.lessonService.getLessonMaterial(material.id).subscribe(material => {
                console.log(material);
                lesson.blocks.push(this.getBlockByMaterialResponse(material));
              });
            });
          }

        });
      });
    } else {
      let request = {
        name: Guid.newGuid(),
        description: `test_${Guid.newGuid()}`,
        mediaId: 0
      };
      this.mediaService.createMockImage().subscribe(data => {
        request.mediaId = data.id;
        this.courseService.createCourse(request).subscribe(data => {
          this.course.id = data.id
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

  onDeleteLesson(lesson: Lesson): void {
    this.lessonService.deleteLesson(lesson.id).subscribe(result => {
      let lessonIndex = this.lessons.findIndex(l => l.guid === lesson.guid);
      this.lessons.splice(lessonIndex, 1);
    });
  }

  onSaveLesson(): void {
    this.constructorMode = false;
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
        block.value = new Test(matResponse.test.task, matResponse.test.score);
        block.value.testOptions = matResponse.test.options;
        break;
      case LessonMaterialType.Audio:
        block = new AudioBlock();
      case LessonMaterialType.Image:
        block = new ImageBlock();
      case LessonMaterialType.Video:
        block = new VideoBlock();

        this.mediaService.getMediaById(matResponse.media.id).subscribe(data => {
          block.value = data;
        });
        break;
    }

    return block;
  }
}
