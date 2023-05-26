import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-payment-method-pick-modal',
  templateUrl: './payment-method-pick-modal.component.html',
  styleUrls: ['./payment-method-pick-modal.component.scss']
})
export class PaymentMethodPickModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentMethodPickModalComponent>
  ) { }

  ngOnInit(): void {
  }

  public buttonClick(paymentMethod: any): void {
    this.dialogRef.close(paymentMethod);
  }
}
