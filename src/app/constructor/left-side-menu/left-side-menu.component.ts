import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'left-side-menu',
    templateUrl: './left-side-menu.component.html',
    styleUrls: ['./left-side-menu.component.scss']
})
export class LeftSideMenuComponent implements OnInit {
    @Output() addTextBlock = new EventEmitter();

    items = [
        { name: 'Text block', icon: 'text_format', onClick: () => this.addTextBlock.emit() },
        { name: 'Video block', icon: 'video_library', onClick: () => console.log('video block') },
        { name: 'Audio block', icon: 'audiotrack', onClick: () => console.log('audio block') }
    ];

    constructor() { }

    ngOnInit(): void {
    }
}
