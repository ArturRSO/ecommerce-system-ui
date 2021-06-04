import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductCartService } from 'src/app/core/services/product-cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product: any;

  constructor(
    private cartService: ProductCartService,
    private loader: LoaderService,
    private modalService: ModalService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  public openCartModal(product: any): void {
    this.modalService.openAddToCartModal('Adicionar ao carrinho?', product).subscribe(response => {
      if (response) {
        this.cartService.addToCart(response);
      }
    });
  }

  private getProduct(): void {
    const productId = parseInt(this.route.snapshot.queryParamMap.get('product'));

    if (productId && productId !== NaN) {
      this.loader.enable();
      this.productService.getProductById(productId).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.product = response.data;

        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });
    } else {
      this.modalService.openSimpleModal('Atenção', 'Forneça um id de produto válido!', [{ text: 'OK' }]).subscribe(() => {
        this.navigateToPage('loja/produtos');
      });
    }
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }
}
