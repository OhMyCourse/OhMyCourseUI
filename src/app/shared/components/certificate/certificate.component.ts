import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User, UserService } from 'src/app/services/user.service';
import { Certificate } from '../../models/Certificate';
import jspdf from 'jspdf';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss'],
})
export class CertificateComponent implements OnInit {
  certificate: Certificate;
  userName: Observable<string>;

  @ViewChild('certificate') certificateRef: ElementRef;

  constructor(route: ActivatedRoute, private userService: UserService) {
    this.certificate = new Certificate(
      null,
      route.snapshot.paramMap.get('certName'),
      <Date>(<unknown>route.snapshot.paramMap.get('certDate'))
    );
  }

  ngOnInit(): void {
    this.userName = this.userService.user.pipe(
      filter((x) => !!x),
      map((x) => x.name)
    );
  }

  onDownoload() {
    let content = this.certificateRef.nativeElement;
    let doc = new jspdf();
    let _elementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      },
    };
    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 190,
      elementHandlers: _elementHandlers,
    });

    doc.save('test.pdf');
  }
}
