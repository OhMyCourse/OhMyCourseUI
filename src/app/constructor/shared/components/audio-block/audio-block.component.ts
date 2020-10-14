import { Component, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-audio-block',
  templateUrl: './audio-block.component.html',
  styleUrls: ['./audio-block.component.scss']
})
export class AudioBlockComponent implements OnInit {
  @ViewChild('file') file;
  @ViewChild('audio') audio: HTMLAudioElement;

  audioToUpload: File = null;
  url = null;

  constructor() { }

  ngOnInit(): void {
  }

  onAudioUpload(): void {
    this.file.nativeElement.click();
  }

  onFileAdded(files: FileList): void {
    this.audioToUpload = files.item(0);
    const reader = new FileReader();
    of(this.audioToUpload).pipe(delay(500)).subscribe(data => {
      reader.readAsDataURL(data);
      reader.onload = (event) => {
        this.url = (event.target as FileReader).result;
      };
    });
  }
}
