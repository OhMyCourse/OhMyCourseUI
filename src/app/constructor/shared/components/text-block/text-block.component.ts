import { Component, Input, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseFormComponent } from '../../models/BaseFormComponent';

@Component({
  selector: 'app-text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss']
})
export class TextBlockComponent extends BaseFormComponent implements OnInit {
  @Input() id: string;

  modules = {
    toolbar: [
      [{ font: [] }],
      [{ size:  ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ align: null}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
    ]
  };

  editorStyle = {
    height: 'auto',
    background: '#FFFFFF',
    border: '1px solid #F4F4F4',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  };

  textBlock = new FormControl('');

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
