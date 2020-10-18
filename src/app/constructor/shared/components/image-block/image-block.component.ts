import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Utils } from '../../models/Utlis';

@Component({
  selector: 'app-image-block',
  templateUrl: './image-block.component.html',
  styleUrls: ['./image-block.component.scss']
})
export class ImageBlockComponent implements OnInit {
  @Input() id: string;
  @Input() images: Blob[]

  modules = {
    toolbar: [
      ['image'],
      [{ align: null }, { align: 'center' }, { align: 'right' }],
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

  onContentChanged = (event: any) => {
    const html = event.html as string;
    const srcs = html.match('"[A-Za-z0-9/+:;,=]+"');
    srcs.forEach(element => {
      let typeAndBase64String = element.slice(1, element.length - 1).split(',');
      let imageType = typeAndBase64String[0].split(':')[1].split(';')[0]; //data:image/jpeg;base64 => image/jpeg
      let base64 = typeAndBase64String[1];
      this.images.push(Utils.b64toBlob(base64, imageType));
    });
  }
}

