import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'blocks-menu',
  templateUrl: './blocks-menu.component.html',
  styleUrls: ['./blocks-menu.component.scss']
})
export class BlocksMenuComponent implements OnInit {
  @Output() addTextBlock = new EventEmitter();

  items = [
      { name: 'Text', icon: 'text_format', onClick: () => this.addTextBlock.emit() },
      { name: 'Video', icon: 'video_library', onClick: () => console.log('video block') },
      { name: 'Audio', icon: 'audiotrack', onClick: () => console.log('audio block') },
      { name: 'Image', icon: 'image', onClick: () => console.log('image block')},
      { name: 'Tip', icon: 'priority_high', onClick: () => console.log('tip block')}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
