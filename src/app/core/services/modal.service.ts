import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { SimpleModalComponent } from 'src/app/shared/simple-modal/simple-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    public dialog: MatDialog
  ) { }

  public openSimpleModal(title: string, message: string, buttons: Array<any>): Observable<string> {

    const dialogRef = this.dialog.open(SimpleModalComponent, {
      width: '250px',
      data: {title: title, message: message, buttons: buttons}
    });

    const subject = new Subject<string>();

    dialogRef.afterClosed().subscribe(response => {
      subject.next(response);
      subject.complete();
    });

    return subject;
  }
}
