import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
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
  public imageForm: FormGroup;
  public imageCount = 0;
  public imageSrc: string;
  public imageSubmitted = false;
  public product: any;
  public productForm: FormGroup;
  public productSubtypes = [];
  public productTypes = [];
  public step = 1;
  public remainingImages = -4;
  public submitted = false;
  public validationMessages: any;

  private image: any;
  private imagePattern = new RegExp(Regex.IMAGE_FILE);
  private productId: number;
  private storeId: number;

  constructor(
    private formBuilder: FormBuilder,
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

  public conclude(): void {
    this.navigateToPage(`gerenciamento/produtos?store=${this.storeId}`);
  }

  public confirmDetails(): void {
    this.loader.enable();
    this.productService.createProduct(this.product).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.modalService.openSimpleModal('Sucesso', 'Produto cadastrado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
          this.productId = response.data;
          this.step = 3;
        });
      } else {
        this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
      }
    });
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

  public submitDetail(): void {
    this.detailSubmitted = true;

    if (this.detailForm.invalid) {
      return;
    }

    this.product.details.push(this.detailForm.value);

    this.modalService.openSimpleModal('Sucesso', 'Detalhe adicionado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
      this.detailSubmitted = false;
      this.detailForm.reset();
    });
  }

  public submitImage(): void {
    this.imageSubmitted = true;

    if (this.imageCount >= 4) {
      this.modalService.openSimpleModal('Sucesso', 'Você já adicionou o máximo possível de imagens!', [{ text: 'OK' }]);
      return;
    }

    if (this.imageForm.invalid) {
      return;
    }

    this.loader.enable();

    this.productService.changeProductImage(this.productId, this.image).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.modalService.openSimpleModal('Sucesso', 'Imagem cadastrada com sucesso!', [{ text: 'OK' }]).subscribe(() => {
          this.imageCount += 1;
          this.remainingImages += 1;

          this.imageSubmitted = false;
          this.imageSrc = null;
          this.imageForm.reset();
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

  public submitProduct(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    this.product = this.productForm.value;
    this.product.storeId = this.storeId;
    this.product.isNew = true;
    this.product.price = parseFloat(this.product.price.replace('.', '').replace(',', '.'));
    this.product.details = [];
    this.step = 2;
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

    this.imageForm = this.formBuilder.group({
      file: [{ value: '', disabled: this.imageCount >= 4 }, Validators.required]
    });
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private setInitialData(): void {
    const storeId = parseInt(this.route.snapshot.queryParamMap.get('store'));

    if (storeId && storeId !== NaN) {
      this.loader.enable();
      this.storeId = storeId;
      this.productService.getProductTypes().subscribe(response => {
        this.loader.disable();
        this.productTypes = response.data;
      });

      this.setValidationMessages();
    } else {
      this.modalService.openSimpleModal('Atenção', 'Forneça um ID de loja válido', [{ text: 'OK' }]).subscribe(resposne => {
        this.navigateToPage('gerenciar/dashboard');
      });
    }
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
