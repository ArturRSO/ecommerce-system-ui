import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { SimpleModalComponent } from 'src/app/shared/simple-modal/simple-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalService: BsModalService,
  ) { }

  openSimpleModal(title: string, message: string, buttons: Array<any>): Observable<string> {

    const initialState = {
      title: title,
      message: message,
      buttons: buttons
    }

    const config = {
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'simple-modal',
      initialState: initialState
    };

    const modal = this.modalService.show(SimpleModalComponent, config);

    const subject = new Subject<string>();

    modal.content.onClose.subscribe((result) => {
      subject.next(result);
      subject.complete();
    });

    return subject;
  }
}
