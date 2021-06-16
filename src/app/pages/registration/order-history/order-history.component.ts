import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderStatus } from 'src/app/utils/enums/order-status.enum';
import { OrderStatusList } from 'src/app/utils/lists/order-status.list';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  public orders = [];

  constructor(
    private authService: AuthenticationService,
    private loader: LoaderService,
    private modalService: ModalService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  public getStatusById(statusId: number): any {

    return new OrderStatusList().getStatusById(statusId);
  }

  public goToOrderDetail(orderId: number) {
    this.navigateToPage(`loja/pedido?order=${orderId}&summary=true`);
  }

  private getOrders(): void {
    this.loader.enable();
    this.orderService.getOrdersByUserId(this.authService.getAuthenticationState().userId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.orders = response.data.sort(this.sortOrders);
        const sentOrder = this.orders.find(order => order.orderStatusId === OrderStatus.SENT);

        if (sentOrder) {
          this.modalService.openSimpleModal('Atenção',
            'Um ou mais pedidos já foram enviados, se você já recebeu o pedido, por favor, clique no pedido e clique no botão \"Já recebi meu pedido\" para marcar o pedido como recebido.',
            [{ text: 'OK' }]);
        }
      }
    });
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private sortOrders(a: any, b: any): number {
    if (a.orderStatusId === OrderStatus.RECEIVED && b.orderStatusId !== OrderStatus.RECEIVED) {
      return -1;

    } else if (a.orderStatusId === b.orderStatusId) {
      return 0;

    } else if (a.orderStatusId === OrderStatus.SENT && b.orderStatusId !== OrderStatus.SENT) {
      return 1;
    }
  }
}
