import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BlockComponent } from '../../models/BlockComponent';

@Component({
  selector: 'app-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss']
})
export class VideoBlockComponent extends BlockComponent implements OnInit {
  @ViewChild('file') file;
  @ViewChild('videoSource') videoSource: HTMLSourceElement;
  @ViewChild('video') video: HTMLVideoElement;

  videoToUpload: File = null;
  url = null;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.blockControl.setValue({});
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
        this.blockControl.setValue(this.url);
      };
    });
  }

  //https://stackoverflow.com/questions/47936183/angular-file-upload
}
