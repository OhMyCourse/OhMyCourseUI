import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    template: ''
})
export class BlockComponent {
    @Input() blockControl: AbstractControl;
    @Input() id: string;
}