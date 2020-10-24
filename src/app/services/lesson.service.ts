import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  createLesson(request: CreateLessonRequest): Observable<any> {
      return this.http.post(`${this.baseUrl}/lesson`, request);
  }

  deleteLesson(lessonId: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/lesson/${lessonId}`);
  }

  getLessons(courseId: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/course/${this.baseUrl}/lessons`);
  }

  getLessonById(lessonId: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/lesson/${lessonId}`);
  }
}

export interface CreateLessonRequest {
    courseId: number;
    title: string;
    lessonMaterials: CreateLessonMaterialRequest[];
}

export interface CreateLessonMaterialRequest {
    type?: LessonMaterialType;
    mediaId?: number;
    textContent?: CreateTextContentRequest;
    test?: CreateTestRequest;
}

export interface CreateTextContentRequest {
    text: string;
    isTip: boolean;
}

export interface CreateTestRequest {
    task: string
    score: number //1-10
    testOptions: CreateTestOptionRequest[]; 
}

export interface CreateTestOptionRequest {
    title: string;
    isRight: boolean;
}

export enum LessonMaterialType {
    Text = 'text',
    Image = 'image',
    Video = 'video',
    Test = 'test', 
    Audio = 'audio'
}