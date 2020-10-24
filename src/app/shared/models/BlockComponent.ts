import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Block } from './Block';

@Component({
    template: ''
})
export class BlockComponent {
    @Input() blockControl: AbstractControl;
    @Input() block: Block;
}