import { Component, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BlockComponent } from '../../models/BlockComponent';

@Component({
  selector: 'app-audio-block',
  templateUrl: './audio-block.component.html',
  styleUrls: ['./audio-block.component.scss'],
})
export class AudioBlockComponent extends BlockComponent implements OnInit {
  @ViewChild('file') file;
  @ViewChild('audio') audio: HTMLAudioElement;

  audioToUpload: File = null;
  url = null;

  constructor() {
    super();
  }

  ngOnInit(): void {}

  onAudioUpload(): void {
    this.file.nativeElement.click();
  }

  onFileAdded(files: FileList): void {
    this.audioToUpload = files.item(0);
    this.block.value = this.audioToUpload;
    const reader = new FileReader();
    of(this.audioToUpload)
      .pipe(delay(500))
      .subscribe((data) => {
        reader.readAsDataURL(data);
        reader.onload = (event) => {
          this.url = (event.target as FileReader).result;
        };
      });
  }
}
