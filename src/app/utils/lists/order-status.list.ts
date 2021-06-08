import { OrderStatus } from "../enums/order-status.enum";

export class OrderStatusList {

  public RECEIVED = { id: OrderStatus.RECEIVED, name: 'Pedido recebido', badge: 'badge-primary' };
  public PAID = { id: OrderStatus.PAID, name: 'Pagamento confirmado', badge: 'badge-success' };
  public SENT = { id: OrderStatus.SENT, name: 'Pedido enviado', badge: 'badge-info' };
  public FINISHED = { id: OrderStatus.FINISHED, name: 'Pedido finalizado', badge: 'badge-info' };

  public getAllStatuses(): any {

    return [
      this.RECEIVED,
      this.PAID,
      this.SENT,
      this.FINISHED
    ]
  }

  public getStatusById(statusId: number): any {

    return this.getAllStatuses().find(status => status.id === statusId);
  }
}
