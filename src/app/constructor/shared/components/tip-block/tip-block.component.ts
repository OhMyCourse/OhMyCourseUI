import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Quill from 'quill';

@Component({
  selector: 'app-tip-block',
  templateUrl: './tip-block.component.html',
  styleUrls: ['./tip-block.component.scss']
})
export class TipBlockComponent implements OnInit {

  editorStyle = {
    height: '100px',
    background: '#FEE983',
  };

  modules = {
    toolbar: [
      [{ size:  ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ align: null}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
    ]
  };

  tipBlock = new FormControl('');

  constructor() { }

  ngOnInit(): void {

  }

}
