import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  getCourses(): Observable<CourseResponse[]> {
    return this.http.get<CourseResponse[]>(`${this.baseUrl}/courses`);
  }

  createCourse(course: CreateCourseRequest): Observable<CourseResponse> {
    return this.http.post<CourseResponse>(`${this.baseUrl}/course`, course);
  }

  updateCourse(course: UpdateCourseRequest): Observable<CourseResponse> {
    return this.http.put<CourseResponse>(`${this.baseUrl}/course/${course.id}`, course);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/course/${courseId}`);
  }

  getCourseById(courseId: number): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${this.baseUrl}/course/${courseId}`);
  }
}

export interface CreateCourseRequest {
  name: string;
  description: string;
  mediaId: number;
}

export interface CourseResponse {
  id: number;
  name: string;
  description: string;
  media: {
    id: number;
    fileName: string;
    mimetype: string;
    title: string;
  };
}

export interface UpdateCourseRequest {
  id: number;
  description: string;
  mediaId: number;
}