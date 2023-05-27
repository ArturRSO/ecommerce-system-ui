import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-order-conclusion',
  templateUrl: './order-conclusion.component.html',
  styleUrls: ['./order-conclusion.component.scss'],
})
export class OrderConclusionComponent implements OnInit {
  public order: any;
  public products = [];

  constructor(
    private loader: LoaderService,
    private modalService: ModalService,
    private orderService: OrderService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrderInfo();
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private getOrderInfo(): any {
    const orderId = parseInt(this.route.snapshot.queryParamMap.get('order'));

    if (orderId) {
      this.loader.enable();
      this.orderService.getOrderSummaryById(orderId).subscribe((response) => {
        this.loader.disable();
        if (response.success) {
          this.order = response.data;
          this.getProductInfo(response.data.itens);
        } else {
          this.modalService
            .openSimpleModal('Atenção', response.message, [{ text: 'OK' }])
            .subscribe(() => {
              this.navigateToPage('loja/produtos');
            });
        }
      });
    } else {
      this.modalService
        .openSimpleModal('Atenção', 'Forneça um id de pedido válido!', [
          { text: 'OK' },
        ])
        .subscribe(() => {
          this.navigateToPage('loja/produtos');
        });
    }
  }

  private getProductInfo(products: any) {
    for (let product of products) {
      this.loader.enable();
      this.productService
        .getProductById(product.productId)
        .subscribe((response) => {
          this.loader.disable();
          const item = response.data;
          item.orderQuantity = product.quantity;
          this.products.push(item);
        });
    }
  }
}
