import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductCartService } from 'src/app/core/services/product-cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { StoreService } from 'src/app/core/services/store.service';
import { Roles } from 'src/app/utils/enums/roles.enum';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  public management = false;
  public product: any;
  public store: any;

  constructor(
    private authService: AuthenticationService,
    private cartService: ProductCartService,
    private loader: LoaderService,
    private modalService: ModalService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  public deleteProduct(): void {
    this.modalService
      .openSimpleModal(
        'Atenção',
        'Tem certeza que deseja desativar este produto',
        [{ text: 'Não' }, { text: 'Sim' }]
      )
      .subscribe((response) => {
        if (response === 'Sim') {
          this.loader.enable();
          this.productService
            .deleteProduct(this.product.productId)
            .subscribe((response) => {
              this.loader.disable();
              if (response.success) {
                this.modalService
                  .openSimpleModal('Sucesso', 'Produto desativado.', [
                    { text: 'OK' },
                  ])
                  .subscribe(() => {
                    this.navigateToPage('gerenciamento/produtos');
                  });
              } else {
                this.modalService.openSimpleModal('Atenção', response.message, [
                  { text: 'OK' },
                ]);
              }
            });
        }
      });
  }

  public goToStoreProfile(): void {
    this.navigateToPage(`gerenciamento/loja?store=${this.store.storeId}`);
  }

  public openCartModal(product: any): void {
    this.modalService
      .openAddToCartModal('Adicionar ao carrinho?', product)
      .subscribe((response) => {
        if (response) {
          this.cartService.addToCart(response);
        }
      });
  }

  public updateProduct(): void {
    this.navigateToPage(
      `cadastro/produto/atualizar?product=${this.product.productId}`
    );
  }

  private getProduct(): void {
    const productId = parseInt(
      this.route.snapshot.queryParamMap.get('product')
    );
    const management = this.route.snapshot.queryParamMap.get('product');

    this.management =
      management &&
      this.authService.getAuthenticationState().roleId === Roles.STORE_ADMIN;

    if (productId) {
      this.loader.enable();
      this.productService.getProductById(productId).subscribe((response) => {
        if (response.success) {
          this.product = response.data;

          if (!management) {
            this.storeService
              .getStoreById(this.product.storeId)
              .subscribe((response) => {
                this.store = response.data;
                this.loader.disable();
              });
          } else {
            this.loader.disable();
          }
        } else {
          this.loader.disable();
          this.modalService
            .openSimpleModal('Atenção', response.message, [{ text: 'OK' }])
            .subscribe(() => {
              this.navigateToPage('loja/produtos');
            });
        }
      });
    } else {
      this.modalService
        .openSimpleModal('Atenção', 'Forneça um ID de produto válido!', [
          { text: 'OK' },
        ])
        .subscribe(() => {
          this.navigateToPage('loja/produtos');
        });
    }
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }
}
