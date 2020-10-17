import { Component, Input, OnInit } from '@angular/core';
import { Block } from './shared/models/Block';
import { Lesson } from './shared/models/Lesson';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent implements OnInit {
  @Input() lesson: Lesson;

  constructor() { }

  ngOnInit(): void {
  }

  onAddBlock(block: Block): void {
    this.lesson.blocks.push(block);
  }
}
