import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productTypes = [];

  constructor(
    private loader: LoaderService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductTypes();
  }

  private getProductTypes(): void {
    this.loader.enable();
    this.productService.getAllProductTypes().subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.productTypes = response.data;
      }
    });
  }
}
