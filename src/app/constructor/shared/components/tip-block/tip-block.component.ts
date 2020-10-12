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
    height: 'auto',
    background: '#FEE983',
    border: '1px solid #F4F4F4',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
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
