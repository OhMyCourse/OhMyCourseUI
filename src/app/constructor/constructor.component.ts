import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MediaService } from 'api';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Block } from './shared/models/Block';
import { Lesson } from './shared/models/Lesson';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent implements OnInit {
  @Input() lesson: Lesson;
  @Output() saveLesson = new EventEmitter();

  images: Blob[] = []

  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
  }

  onAddBlock(block: Block): void {
    this.lesson.blocks.push(block);
  }

  onSaveLesson(): void {
    this.saveImages();
    this.saveLesson.emit();
  }

  private saveImages() {
    console.log('save images');
    from(this.images).pipe(
      switchMap(image => {
        return this.mediaService.mediaControllerCreateForm(image);
      })
    ).subscribe(data => {
      console.log(data);
    })
  }
}
