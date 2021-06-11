import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderStatusList } from 'src/app/utils/lists/order-status.list';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {

  public columns = ['orderId', 'totalPrice', 'creationDate', 'status'];
  public headers = ['ID', 'Valor', 'Data do pedido', 'Status'];
  public orders = [];

  constructor(
    private loader: LoaderService,
    private modalService: ModalService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  public getOrderClick(order: any) {
    this.navigateToPage(`loja/pedido?order=${order.orderId}`);
  }

  private getData(): void {
    const storeId = parseInt(this.route.snapshot.queryParamMap.get('store'));

    if (storeId && storeId !== NaN) {
      this.loader.enable();
      this.orderService.getOrdersByStoreId(storeId).subscribe(response => {
        if (response.success) {
          const orderStatusList = new OrderStatusList();
          this.orders = response.data;

          this.orders.forEach(order => {
            order.status = orderStatusList.getStatusById(order.orderStatusId).name;
          });

        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage('gerenciamento/dashboard');
          });
        }
        this.loader.disable();
      });
    } else {
      this.modalService.openSimpleModal('Atenção', 'Forneça um ID válido!', [{ text: 'OK' }]).subscribe(() => {
        this.navigateToPage('gerenciamento/dashboard');
      });
    }
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }
}
