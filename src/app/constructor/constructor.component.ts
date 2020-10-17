import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

  onAddBlock(block: Block): void {
    this.lesson.blocks.push(block);
  }

  onSaveLesson(): void {
    this.saveLesson.emit();
  }
}
