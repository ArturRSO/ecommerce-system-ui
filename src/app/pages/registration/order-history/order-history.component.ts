import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { OrderService } from 'src/app/core/services/order.service';
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
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  public getStatusById(statusId: number): any {

    return new OrderStatusList().getStatusById(statusId);
  }

  private getOrders(): void {
    this.loader.enable();
    this.orderService.getOrdersByUserId(this.authService.getAuthenticationState().userId).subscribe(response => {
      this.loader.disable();
      this.orders = response.data;
    });
  }
}
