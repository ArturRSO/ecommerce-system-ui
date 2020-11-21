import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.scss']
})
export class ProductRegistrationComponent implements OnInit {

  private store: any;

  public form: FormGroup;
  public productTypes = [];
  public productSubtypes = [];
  public submitted = false;
  public update = false;

  constructor(
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private productService: ProductService,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
    this.buildForm();
  }

  get f() {
    return this.form.controls;
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      productType: ['', Validators.required],
      productSubtype: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  private getInitialData(): void {
    this.store = JSON.parse(this.storageService.getSessionItem('currentStore'));

    this.loader.enable();
    this.productService.getAllProductTypes().subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.productTypes = response.data;
      }
    });
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public getProductSubtypes(productType: any): void {
    this.loader.enable();
    console.log(productType);
    this.productService.getProductSubtypesByProductTypeId(productType.productTypeId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.productSubtypes = response.data;
      }
    });
  }

  public onSubmit(): void {
    console.log(this.form.value);
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const product = this.form.value;
    product.storeId = this.store.storeId;
    console.log(product);

    this.loader.enable();

    this.productService.createProduct(product).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.modalService.openSimpleModal('Sucesso', response.message, [{text:'OK'}]).subscribe(() => {
          this.navigateToPage('gerenciar/produtos/loja');
        });

      } else {
        this.modalService.openSimpleModal('Atenção', response.message, [{text: 'OK'}]);
      }
    });
  }
}
