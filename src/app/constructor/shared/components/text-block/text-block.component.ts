import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from '../../models/BaseFormComponent';

@Component({
  selector: 'text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss']
})
export class TextBlockComponent extends BaseFormComponent implements OnInit {
  @Input() id: string;
  @Output() delete = new EventEmitter<string>();

  form = this.formBuilder.group({
    header: ['', [Validators.required, Validators.maxLength(64)]],
    text: ['', [Validators.required, Validators.maxLength(2048)]]
  });

  constructor(public formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
  }

  add(): void {

  }

  cancel(): void {
    this.delete.emit(this.id);
  }
}
