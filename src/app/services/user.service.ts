import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserProfile } from '../shared/models/UserProfile';
import { CourseLessonResponse } from './course.service';
import { Course } from '../shared/models/Course';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  get isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  getProfile(): Observable<UserProfile> {
    const url = `${this.baseUrl}/user`;

    return this.http
      .get<UserProfile>(url)
      .pipe(
        map(
          (r) =>
            new UserProfile(
              r.id,
              r.name,
              r.email,
              r.birthday,
              null,
              null,
              null,
              r.biography,
              r.mediaId
            )
        )
      );
  }

  updateProfile(request: UpdateProfileRequest): Observable<any> {
    const url = `${this.baseUrl}/user`;

    return this.http.put<any>(url, request);
  }

  register(request: RegisterRequest): Observable<string> {
    const url = `${this.baseUrl}/user`;

    return this.http.post<any>(url, request).pipe(
      map((r) => r.token),
      tap((t) => this.saveToken(t))
    );
  }

  login(request: LoginRequest): Observable<string> {
    const url = `${this.baseUrl}/user/login`;

    return this.http.post<any>(url, request).pipe(
      map((r) => r.token),
      tap((t) => this.saveToken(t))
    );
  }

  getCourses(id: number): Observable<UserCourseItem[]> {
    const url = `${this.baseUrl}/user/courses?userId=${id}`;

    return this.http.get<UserCourseItem[]>(url);
  }

  logout() {
    localStorage.removeItem('token');
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}

export interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  birthday: Date;
  bio: string;
  mediaId?: number;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  email: string;
  dateOfBirth: Date;
  biography: string;
  mediaId: number;
}

export interface UserCourseItem {
  status: 'started' | 'created' | 'completed';
  score: number;
  courseId: number;
  passedLessons: CourseLessonResponse[];
  course: Course;
}
