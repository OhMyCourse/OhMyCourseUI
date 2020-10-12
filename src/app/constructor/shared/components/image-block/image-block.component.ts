import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-block',
  templateUrl: './image-block.component.html',
  styleUrls: ['./image-block.component.scss']
})
export class ImageBlockComponent implements OnInit {
  @Input() id: string;

  modules = {
    toolbar: [
      ['image'],
      [{ align: null}, {align: 'center'}, {align: 'right'}],
    ]
  };

  editorStyle = {
    height: 'auto',
    background: '#FFFFFF',
    border: '1px solid #F4F4F4',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  };

  constructor() {
  }

  ngOnInit(): void {
  }
}
