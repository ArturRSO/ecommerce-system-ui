import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ProductService } from 'src/app/core/services/product.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

  private store: any;

  public cols = [];
  public emptyMessage = 'Nenhum produto cadastrado.';
  public products = [];
  public selectedProduct: any;

  constructor(
    private loader: LoaderService,
    private productService: ProductService,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  private getInitialData(): any {
    this.store = JSON.parse(this.storageService.getSessionItem('currentStore'));
    this.getColumns();

    this.loader.enable();
    switch (this.router.url.split('/')[3]) {
      case 'loja':
        this.productService.getProductsByStoreId(this.store.storeId).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.products = response.data;
          }
        });
        break;
      case 'todos':
        this.productService.getAllProducts().subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.products = response.data;
          }
        });
        break;
    }
  }

  private getColumns(): void {
    this.cols = [
      { field: 'productId', header: 'Id' },
      { field: 'name', header: 'Nome' },
      { field: 'productType.name', header: 'Tipo' },
      { field: 'productSubtype.name', header: 'Subtipo' },
      { field: 'price', header: 'Preço' },
      { field: 'quantity', header: 'Quantidade' }
    ];
  }

  public navigateToPage(route: string): void {
    this.router.navigateByUrl(route);
  }

  public selectProduct(): void {
    this.storageService.setSessionItem('selectedProduct', JSON.stringify(this.selectedProduct));
    this.navigateToPage('gerenciar/produto');
  }
}
