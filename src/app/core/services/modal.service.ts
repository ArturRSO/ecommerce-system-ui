import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalComponent } from 'src/app/shared/simple-modal/simple-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalService: BsModalService,
  ) { }

  openSimpleModal(initialState: any): Promise<string> {

    const config = {
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'simple-modal',
      initialState: initialState
    };

    const modal = this.modalService.show(SimpleModalComponent, config);

    return new Promise<string>((resolve, reject) => modal.content.onClose.subscribe((result) => resolve(result)));
  }
}
