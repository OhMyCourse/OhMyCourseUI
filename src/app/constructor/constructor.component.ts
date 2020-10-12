import { Component, OnInit } from '@angular/core';
import { Block } from './shared/models/Block';

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

  onAddBlock(block: Block): void {
    this.blocks.push(block);
  }
}
