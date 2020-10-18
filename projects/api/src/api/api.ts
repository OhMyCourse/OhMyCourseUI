export * from './course.service';
import { CourseService } from './course.service';
export * from './lesson.service';
import { LessonService } from './lesson.service';
export * from './media.service';
import { MediaService } from './media.service';
export const APIS = [CourseService, LessonService, MediaService];
