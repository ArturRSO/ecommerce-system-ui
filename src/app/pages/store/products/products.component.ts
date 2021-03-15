import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';

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
  public types = [];
  public subtypes = [];
  public typeSubmenuId = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private loader: LoaderService,
    private modalService: ModalService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  public addProductToCart(product: any) {
    // TO DO
    console.log(product);
  }

  public getAllProducts(): void {
    this.productService.getProductsToSell().subscribe(response => {
      if (response.success) {
        this.products = response.data;

      } else {
        this.modalService.openSimpleModal('Atenção', response.message, [{text: 'OK'}]);
      }
    });
  }

  public getProductsBySubtypeId(subtypeId: number): void {
    this.loader.enable();

    this.productService.getProductsToSellBySubtypeId(subtypeId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.products = response.data;

      } else {
        this.modalService.openSimpleModal('Atenção', response.message, [{text: 'OK'}]);
      }
    });
  }

  public showProductDetails(product: any) {
    // TO DO
    console.log(product);
  }

  public typeMenuClick(typeId: number): void {
    this.loader.enable();

    this.productService.getProductSubtypesByTypeId(typeId).subscribe(response => {
      this.loader.disable();
      this.subtypes = response.data;
      this.typeSubmenuId = this.typeSubmenuId === 0 ? typeId : 0;
    })
  }

  private getData(): void {
    this.loader.enable();

    this.productService.getProductsToSell().subscribe(response => {
      if (response.success) {
        this.products = response.data;

      } else {
        this.modalService.openSimpleModal('Atenção', response.message, [{text: 'OK'}]);
      }

      this.productService.getProductTypes().subscribe(response => {
        this.loader.disable();
        this.types = response.data;
      });
    });
  }

  private navigateToPage(route: string) {
    // TO DO
    console.log(route);
  }
}
