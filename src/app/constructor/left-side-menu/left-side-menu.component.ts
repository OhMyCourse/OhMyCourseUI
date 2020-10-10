import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'left-side-menu',
    templateUrl: './left-side-menu.component.html',
    styleUrls: ['./left-side-menu.component.scss']
})
export class LeftSideMenuComponent implements OnInit {
    @Output() onTextBlockAdd: EventEmitter<any>;

    items = [
        { name: 'Text block', icon: null },
        { name: 'Video block', icon: null },
        { name: 'Audio block', icon: null }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
