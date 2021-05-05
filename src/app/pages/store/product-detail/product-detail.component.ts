import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product: any;

  constructor(
    private loader: LoaderService,
    private modalService: ModalService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct();
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
      this.modalService.openSimpleModal('Atenção', 'Forneça um id de produto válido!', [{ text: 'OK' }]);
    }
  }
}
