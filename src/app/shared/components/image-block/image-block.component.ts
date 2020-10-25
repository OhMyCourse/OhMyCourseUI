import { Component, OnInit } from '@angular/core';
import { BlockComponent } from '../../models/BlockComponent';
import { Utils } from '../../models/Utlis';

@Component({
  selector: 'app-image-block',
  templateUrl: './image-block.component.html',
  styleUrls: ['./image-block.component.scss'],
})
export class ImageBlockComponent extends BlockComponent implements OnInit {
  modules = {
    toolbar: [
      ['image'],
      [{ align: null }, { align: 'center' }, { align: 'right' }],
      [{ header: 1 }],
    ],
  };

  editorStyle = {
    height: 'auto',
    background: '#FFFFFF',
    border: '1px solid #F4F4F4',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  };

  constructor() {
    super();
  }

  ngOnInit(): void {}

  // actually arrays of srcs images but process last
  onContentChanged = (event: any) => {
    const html = event.html as string;
    const srcs = html.match('"[A-Za-z0-9/+:;,=]+"');
    srcs.forEach((element) => {
      let typeAndBase64String = element.slice(1, element.length - 1).split(',');
      let imageType = typeAndBase64String[0].split(':')[1].split(';')[0]; //data:image/jpeg;base64 => image/jpeg
      let base64 = typeAndBase64String[1];
      this.block.value = Utils.b64toBlob(base64, imageType);
    });
  };

  getEditorInstance(editorInstance: any) {
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('header', this.closeHandler);

    let lastNode =
      toolbar.container.childNodes[toolbar.container.childNodes.length - 1];
    lastNode.className = 'ql-formats last';

    let closeBtn = toolbar.controls.find((c) => c[0] === 'header');
    closeBtn[1].innerHTML = 'X';
  }

  closeHandler = () => {
    this.onDelete.emit(this.block.id);
  };
}
