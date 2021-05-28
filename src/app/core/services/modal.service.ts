import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { AddToCartModalComponent } from 'src/app/shared/add-to-cart-modal/add-to-cart-modal.component';
import { PaymentMethodPickModalComponent } from 'src/app/shared/payment-method-pick-modal/payment-method-pick-modal.component';
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

  public openAddToCartModal(title: string, product: any): Observable<any> {

    const dialogRef = this.dialog.open(AddToCartModalComponent, {
      width: '250px',
      data: {title: title, product: product, buttons: [{ text: 'Confirmar' }, { text: 'Cancelar' }]}
    });

    const subject = new Subject<string>();

    dialogRef.afterClosed().subscribe(response => {
      subject.next(response);
      subject.complete();
    });

    return subject;
  }

  public openPaymentMethodPickModal(title: string, message: string, paymentMethods: Array<any>): Observable<any> {

    const dialogRef = this.dialog.open(PaymentMethodPickModalComponent, {
      width: '250px',
      data: {title: title, message: message, paymentMethods: paymentMethods}
    });

    const subject = new Subject<string>();

    dialogRef.afterClosed().subscribe(response => {
      subject.next(response);
      subject.complete();
    });

    return subject;
  }
}
