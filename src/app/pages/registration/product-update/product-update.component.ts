import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Regex } from 'src/app/utils/enums/regex.enum';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  public detailForm: UntypedFormGroup;
  public detailSubmitted = false;
  public imageForm: UntypedFormGroup;
  public imageSrc: string;
  public imageSubmitted = false;
  public product: any;
  public productForm: UntypedFormGroup;
  public productSubtypes = [];
  public productTypes = [];
  public newProduct: any;
  public selectedDetail: any;
  public selectedImage;
  public step = 1;
  public submitted = false;
  public validationMessages: any;

  private image: any;
  private imagePattern = new RegExp(Regex.IMAGE_FILE);

  constructor(
    private formBuilder: UntypedFormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForms();
    this.setInitialData();
  }

  get df() {
    return this.detailForm.controls;
  }

  get imgf() {
    return this.imageForm.controls;
  }

  get pf() {
    return this.productForm.controls;
  }

  public selectDetail(detail: any): void {
    this.selectedDetail = detail;
    this.df.label.setValue(detail.label);
    this.df.value.setValue(detail.value);
  }

  public selectImage(image: any): void {
    this.selectedImage = image;
  }

  public submitDetail(): void {
    this.detailSubmitted = true;

    if (this.detailForm.invalid) {
      return;
    }

    this.newProduct.details.push(this.detailForm.value);

    this.modalService.openSimpleModal('Sucesso', 'Detalhe adicionado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
      this.product.details = this.product.details.filter(detail => detail.labelId !== this.selectedDetail.labelId);
      this.selectedDetail = null;
      this.detailSubmitted = false;
      this.detailForm.reset();
    });
  }

  public submitImage(): void {
    this.imageSubmitted = true;

    if (this.imageForm.invalid) {
      return;
    }

    this.loader.enable();

    this.productService.updateProductImage(this.product.productId, this.selectedImage.productImageId, this.image).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.modalService.openSimpleModal('Sucesso', 'Detalhe adicionado com sucesso!', [{ text: 'OK' }]).subscribe(() => {

          this.imageSubmitted = false;
          this.imageSrc = null;
          this.imageForm.reset();
          this.selectImage = null;
        });
      } else {
        this.modalService.openSimpleModal('Atenção', response.messsage, [{ text: 'OK' }]).subscribe(() => {
          this.imageSubmitted = false;
          this.imageSrc = null;
          this.imageForm.reset();
        });
      }
    });
  }

  public submitProduct(updateDetails: boolean): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    this.newProduct = this.productForm.value;
    this.newProduct.productId = this.product.productId;
    this.newProduct.storeId = this.product.storeId;
    this.newProduct.isNew = true;
    this.newProduct.price = parseFloat(this.newProduct.price.replace('.', '').replace(',', '.'));
    this.newProduct.productTypeId = this.product.productType.productTypeId;
    this.newProduct.productSubtypeId = this.product.productSubtype.productSubtypeId;

    if (updateDetails) {
      this.newProduct.details = [];
      this.step = 2;

    } else {
      this.updateProduct(false);
    }
  }

  public uploadImage(event: any): any {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (file.type.match(this.imagePattern)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
        };

        this.image = file;

      } else {
        this.imageForm.reset();
        this.modalService.openSimpleModal('Atenção', 'Envie um arquivo de imagem válido!', [{ text: 'OK' }]);
      }
    }
  }

  public updateProduct(updateImages: boolean): void {
    this.loader.enable();

    if (!this.newProduct.details || this.newProduct.details.length === 0) {
      this.newProduct.details = this.product.details;
    }

    this.productService.updateProduct(this.newProduct).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        if (updateImages) {
          this.step = 3;

        } else {
          this.modalService.openSimpleModal('Sucesso', 'Produto atualizado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage('gerenciamento/produtos');
          });
        }
      } else {
        this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
      }
    });
  }

  private buildForms(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.1)]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.pattern(Regex.ONLY_NUMBERS)]]
    });

    this.detailForm = this.formBuilder.group({
      label: [{value: '', disabled: true}],
      value: ['', Validators.required]
    });

    this.imageForm = this.formBuilder.group({
      file: [ '', Validators.required]
    });
  }

  private fillProductForm(): void {
    this.pf.name.setValue(this.product.name);
    this.pf.price.setValue(this.product.price.toString().replace('.', ','));
    this.pf.quantity.setValue(this.product.quantity);
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private setInitialData(): void {
    const productId = parseInt(this.route.snapshot.queryParamMap.get('product'));

    if (productId && productId !== NaN) {
      this.loader.enable();

      this.productService.getProductById(productId).subscribe(response => {
        if (response.success) {
          this.loader.disable();
          this.product = response.data;
          this.fillProductForm();

        } else {
          this.loader.disable();
          this.modalService.openSimpleModal('Atenção', response.data, [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage('gerenciamento/produtos');
          });
        }
      });

      this.setValidationMessages();

    } else {
      this.modalService.openSimpleModal('Atenção', 'Forneça um ID de produto válido!', [{ text: 'OK' }]).subscribe(() => {
        this.navigateToPage('gerenciamento/produtos');
      });
    }
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      name: [
        { type: 'required', message: 'Digite o nome do produto' }
      ],
      value: [
        { type: 'required', message: 'Digite o conteúdo do detalhe' }
      ],
      file: [
        { type: 'required', message: 'Forneça uma imagem' }
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
