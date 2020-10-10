import { Component, OnInit } from '@angular/core';
import { TextBlockComponent } from './shared/components/text-block/text-block.component';
import { Block } from './shared/models/Block';
import { TextBlock } from './shared/models/TextBlock';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent implements OnInit {
  blocks: Block[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onAddTextBlock(): void {
    this.blocks.push(new TextBlock());
  }
}
