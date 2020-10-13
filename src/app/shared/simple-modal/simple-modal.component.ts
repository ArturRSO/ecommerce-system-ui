import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements OnInit {

  @Output() customClick = new EventEmitter();

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  private close(): void {
    this.bsModalRef.hide();
  }

  public buttonClick(message: string): void {
    this.customClick.emit(message);
    this.close();
  }
}
