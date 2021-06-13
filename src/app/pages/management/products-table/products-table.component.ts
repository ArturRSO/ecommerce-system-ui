import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  public columns = ['productId', 'name', 'price', 'quantity',];
  public headers = ['ID', 'Nome', 'Preço', 'Quantidade'];
  public products = [];

  constructor(
    private loader: LoaderService,
    private modalService: ModalService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  public createProduct(): void {
    this.navigateToPage('cadastro/produto');
  }

  public getData(): void {
    const storeId = parseInt(this.route.snapshot.queryParamMap.get('store'));

    if (storeId && storeId !== NaN) {
      this.loader.enable();
      this.productService.getProductsByStoreIdAndQuantity(storeId, 0).subscribe(response => {
        this.products = response.data;
        this.loader.disable();
      });
    } else {
      this.modalService.openSimpleModal('Atenção', 'Forneça um ID de loja válido!', [{ text: 'OK' }]).subscribe(() => {
        this.navigateToPage('gerenciamento/dashboard');
      });
    }
  }

  public getProductClick(product: any): void {
    this.navigateToPage(`loja/detalhe?product=${product.productId}`);
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }
}
