import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductCartService } from 'src/app/core/services/product-cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductSearchType } from 'src/app/utils/enums/product-search-type.enum';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public products = [];

  private productSearch: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cartService: ProductCartService,
    private loader: LoaderService,
    private modalService: ModalService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkSearchRequest();
  }

  public openCartModal(product: any): void {
    this.modalService.openAddToCartModal('Adicionar ao carrinho?', product).subscribe(response => {
      if (response) {
        this.cartService.addToCart(response);
      }
    });
  }

  public showProductDetails(product: any) {
    this.navigateToPage(`loja/detalhe?product=${product.productId}`)
  }

  private checkSearchRequest(): void {
    if (!sessionStorage.getItem('searchRequest')) {
      this.getProductsByQuantity(1);

    } else {
      this.getProducts(sessionStorage.getItem('searchRequest'));
    }

    this.productSearch = this.productService.getSearchRequest().subscribe(response => {
      this.getProducts(response);
    });
  }

  private getProductsByQuantity(quantity: number): void {
    this.loader.enable();
    this.productService.getProductsByQuantity(quantity).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.products = response.data;

      } else {
        this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
      }
    });
  }

  private getProducts(search: any): void {
    switch (search.searchType) {
      case ProductSearchType.NAME:
        this.loader.enable();
        this.productService.getProductsByNameAndQuantity(search.data, 1).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.products = response.data;

          } else {
            this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
          }
        });
        break;

      case ProductSearchType.QUANTITY:
        this.getProductsByQuantity(1);
        break;

      case ProductSearchType.SUBTYPE_ID:
        this.loader.enable();
        this.productService.getProductsBySubtypeIdAndQuantity(search.data.productSubtypeId, 1).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.products = response.data;

          } else {
            this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
          }
        });
        break;

      default:
        this.getProductsByQuantity(1);
        break;
    }
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }
}
