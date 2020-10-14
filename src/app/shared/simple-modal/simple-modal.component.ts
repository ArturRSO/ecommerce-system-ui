import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements OnInit {

  public buttons = [];
  public message: string;
  public onClose: Subject<string>;
  public title: string;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public buttonClick(message: string): void {
    this.onClose.next(message);
    this.bsModalRef.hide();
  }
}
