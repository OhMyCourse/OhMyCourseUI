import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_PATH } from 'api';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient, @Inject(BASE_PATH) private basePath) { }

  getImageSrc(mediaId: number): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.basePath}/media/${mediaId}`, { responseType: 'blob' as 'json' });
  }
}
