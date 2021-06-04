import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { Regex } from 'src/app/utils/enums/regex.enum';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.scss']
})
export class ProductRegistrationComponent implements OnInit {

  public detailForm: FormGroup;
  public detailLabels = [];
  public detailSubmitted = false;
  public productDetails = [];
  public productForm: FormGroup;
  public productSubtypes = [];
  public productTypes = [];
  public submitted = false;
  public validationMessages: any;

  private registration: any;
  private storeId: number;

  constructor(
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private productService: ProductService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.buildForms();
    this.setInitialData();
  }

  get df() {
    return this.detailForm.controls;
  }

  get pf() {
    return this.productForm.controls;
  }

  public onProductSubtypeSelection(value: any): void {
    this.loader.enable();
    this.productService.getProductDetailLabelsByProductSubtypeId(value).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.detailLabels = response.data;
      }
    });
  }

  public onProductTypeSelection(value: any): void {
    this.loader.enable();
    this.productService.getProductSubtypesByTypeId(value).subscribe(response => {
      this.loader.disable();
      this.productSubtypes = response.data;
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    const product = this.productForm.value;
    product.storeId = this.storeId;
    product.isNew = true;
    product.details = this.productDetails;

    this.loader.enable();
    sessionStorage.removeItem('registerRequest');

    if (this.registration.update) {
      product.productId = this.registration.id;

      this.productService.updateProduct(product).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', 'Produto atualizado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
            // TO DO
            // this.navigateToPage('cadastro/perfil');
          });
        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });
    } else {
      this.productService.createProduct(product).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', 'Produto cadastrado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
            // TO DO
            // this.navigateToPage('cadastro/perfil');
          });
        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });
    }
  }

  public submitDetail(): void {
    this.detailSubmitted = true;

    if (this.detailForm.invalid) {
      return;
    }

    this.productDetails.push(this.detailForm.value);
    this.detailSubmitted = false;
    this.detailForm.reset();
  }

  private buildForms(): void {
    this.productForm = this.formBuilder.group({
      productTypeId: ['', Validators.required],
      productSubtypeId: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.1)]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.pattern(Regex.ONLY_NUMBERS)]]
    });

    this.detailForm = this.formBuilder.group({
      labelId: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private setInitialData(): void {
    this.registration = this.sessionStorageService.getObject('registerRequest');

    this.loader.enable();

    if (this.registration.update) {
      this.productService.getProductById(this.registration.id).subscribe(response => {
        this.loader.disable();
        this.pf.productTypeId.setValue(response.data.productTypeId);
        this.pf.productSubtypeId.setValue(response.data.productSubtypeId);
        this.pf.name.setValue(response.data.name);
        this.pf.price.setValue(response.data.price);
        this.pf.quantity.setValue(response.data.quantity);

        this.storeId = response.data.storeId;
      });
    } else {
      this.storeId = this.registration.id;
    }

    this.productService.getProductTypes().subscribe(response => {
      this.loader.disable();
      this.productTypes = response.data;
    });

    this.setValidationMessages();
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      productTypeId: [
        { type: 'required', message: 'Selecione o tipo do produto' }
      ],
      productSubtypeId: [
        { type: 'required', message: 'Selecione o subtipo do produto' }
      ],
      name: [
        { type: 'required', message: 'Digite o nome do produto' }
      ],
      labelId: [
        { type: 'required', message: 'Selecione o rótulo do detalhe' }
      ],
      value: [
        { type: 'required', message: 'Digite o conteúdo do detalhe' }
      ],
      price: [
        { type: 'required', message: 'Digite o preço do produto' },
        { type: 'min', message: 'Digite um valor maior que zero.' }
      ],
      quantity: [
        { type: 'required', message: 'Digite a quantidade em estoque' },
        { type: 'min', message: 'Digite um valor maior que zero.' },
        { type: 'pattern', message: 'Digite um valor válido.' }
      ]
    }
  }
}
