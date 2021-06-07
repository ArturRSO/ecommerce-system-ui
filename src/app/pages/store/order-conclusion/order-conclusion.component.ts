import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-conclusion',
  templateUrl: './order-conclusion.component.html',
  styleUrls: ['./order-conclusion.component.scss']
})
export class OrderConclusionComponent implements OnInit {

  public order: any;

  constructor(
    private loader: LoaderService,
    private modalService: ModalService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrderInfo();
  }

  private getOrderInfo(): any {
    // TO DO
    console.log(this.order);
  }
}
