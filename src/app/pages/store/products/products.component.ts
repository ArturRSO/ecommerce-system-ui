import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
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
    private loader: LoaderService,
    private modalService: ModalService,
    private productService: ProductService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.checkSearchRequest();
    this.getProducts();
  }

  public addProductToCart(product: any) {
    // TO DO
    console.log(product);
  }

  public showProductDetails(product: any) {
    // TO DO
    console.log(product);
  }

  private checkSearchRequest(): void {
    if (!sessionStorage.getItem('searchRequest')) {
      this.getProductsByQuantity(1);
    }
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

  private getProducts(): void {
    this.productService.getSearchRequest().subscribe(response => {

      switch (response.searchType) {
        case ProductSearchType.NAME:
          this.loader.enable();
          this.productService.getProductsByNameAndQuantity(response.data, 1).subscribe(response => {
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
          this.productService.getProductsBySubtypeIdAndQuantity(response.data.productSubtypeId, 1).subscribe(response => {
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
    });
  }

  private navigateToPage(route: string) {
    // TO DO
    console.log(route);
  }
}
