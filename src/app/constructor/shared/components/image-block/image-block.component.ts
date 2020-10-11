import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'image-block',
  templateUrl: './image-block.component.html',
  styleUrls: ['./image-block.component.scss']
})
export class ImageBlockComponent implements OnInit {
  @Input() id: string;
  @Output() delete = new EventEmitter<string>();

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

  add(): void {

  }

  cancel(): void {
    this.delete.emit(this.id);
  }
}
