import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss']
})
export class VideoBlockComponent implements OnInit {
  @Input() id: string;
  @ViewChild('file') file;
  @ViewChild('videoSource') videoSource: HTMLSourceElement;
  @ViewChild('video') video: HTMLVideoElement;

  videoToUpload: File = null;
  url = null;

  constructor() { }

  ngOnInit(): void {
  }

  loadVideo(): void {
    this.file.nativeElement.click();
  }

  onFileAdded(files: FileList): void {
    this.videoToUpload = files.item(0);
    const reader = new FileReader();
    of(this.videoToUpload).pipe(delay(500)).subscribe(data => {
      reader.readAsDataURL(data);
      reader.onload = (event) => {
        this.url = (event.target as FileReader).result;
      };
    });
  }

  //https://stackoverflow.com/questions/47936183/angular-file-upload
}
