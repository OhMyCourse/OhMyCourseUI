import { LessonMaterialType } from 'src/app/services/lesson.service';
import { Lesson } from './Lesson';

export class Course {
  public lessons: CourseLesson[] = [];

  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public mediaId?: number
  ) {}
}

export class CourseLesson {
  constructor(
    public id: number,
    public title: string,
    public materials: CourseLessonMaterial[],
    public description: string,
    public finished: boolean
  ) {
    this.materials = [];
  }
}

export class CourseLessonMaterial {
  constructor(public id: number, public type: LessonMaterialType) {}
}
