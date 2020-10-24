import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Inject, Injectable } from '@angular/core';
import { from, Observable, zip } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BlobRequest } from '../constructor/constructor.component';
import { LessonMaterialType } from './lesson.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  createMockImage(): Observable<MediaResponse> {
    return this.getMediaById(1).pipe(
      switchMap(data => this.createMedia(data))
    );
  }

  createMedia(blob: Blob): Observable<MediaResponse> {
    const formData = new FormData();
    formData.append('file', blob);

    return this.http.post<MediaResponse>(`${this.baseUrl}/media`, formData);
  }

  getMediaById(mediaId: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.baseUrl}/media/${mediaId}`, { responseType: 'blob' as 'json' });
  }

  createMediaMany(blobs: BlobRequest[]): Observable<MediaOrderResponse[]> {
    console.log(blobs);

    let requests = blobs.map(blob => this.createMedia(blob.value).pipe(
      map(response => {
        return {
          mediaId: response.id,
          order: blob.order,
          type: blob.type
        } as MediaOrderResponse;
      })
    ));

    return zip(requests);
  }
}

export interface MediaResponse {
  id: number;
  fileName: string;
  mimetype: string;
  title: string;
}

export interface MediaOrderResponse {
  mediaId: number;
  order: number;
  type: LessonMaterialType.Video | LessonMaterialType.Image | LessonMaterialType.Audio;
}