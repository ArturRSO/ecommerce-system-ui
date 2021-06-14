import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';
import { OrderStatus } from 'src/app/utils/enums/order-status.enum';
import { Roles } from 'src/app/utils/enums/roles.enum';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  public authentication: any;
  public order: any;
  public products = [];

  public markAsReceived = false;
  public markAsSent = false;

  constructor(
    private authService: AuthenticationService,
    private loader: LoaderService,
    private modalService: ModalService,
    private orderService: OrderService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrderInfo();
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public return(): void {
    if (this.authentication.roleId === Roles.CUSTOMER) {
      this.navigateToPage('cadastro/historico');

    } else {
      this.navigateToPage('gerenciamento/pedidos');
    }
  }

  public updateOrderStatus(orderStatusId: number) {
    this.loader.enable();
    this.orderService.updateOrderStatus(this.order.orderId, orderStatusId).subscribe(response => {
      if (response.success) {
        this.modalService.openSimpleModal('Sucesso', 'Status do pedido atualizado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
          this.return();
        });
      } else {
        this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
      }
    });
  }

  private getOrderInfo(): any {
    this.authentication = this.authService.getAuthenticationState();
    const orderId = parseInt(this.route.snapshot.queryParamMap.get('order'));
    const isSummary = this.route.snapshot.queryParamMap.get('summary');

    this.loader.enable();

    if (orderId && orderId !== NaN) {
      if (isSummary) {
        if (this.authentication.roleId !== Roles.CUSTOMER) {
          this.orderService.getOrderById(orderId).subscribe(response => {
            this.loader.disable();
            if (response.success) {
              this.order = response.data;
              this.getProductInfo(response.data.itens);

              this.markAsReceived = this.order.orderStatusId === OrderStatus.SENT;

            } else {
              this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]).subscribe(() => {
                this.navigateToPage('gerenciamento/pedidos');
              });
            }
          });

        } else {
          this.modalService.openSimpleModal('Atenção', 'Você não tem acesso a esse recurso.', [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage('loja/produtos');
          });
        }

      } else {
        this.orderService.getOrderSummaryById(orderId).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.order = response.data;
            this.getProductInfo(response.data.itens);

            this.markAsReceived = this.order.orderStatusId === OrderStatus.PAID;

          } else {
            this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]).subscribe(() => {
              this.navigateToPage('cadastro/historico');
            });
          }
        });
      }
    } else {
      this.modalService.openSimpleModal('Atenção', 'Forneça um id de pedido válido!', [{ text: 'OK' }]).subscribe(() => {
        this.navigateToPage('loja/produtos');
      });
    }
  }

  private getProductInfo(products: any) {
    for (let product of products) {
      this.loader.enable();
      this.productService.getProductById(product.productId).subscribe(response => {
        this.loader.disable();
        const item = response.data;
        item.orderQuantity = product.quantity;
        this.products.push(item);
      });
    }
  }
}
