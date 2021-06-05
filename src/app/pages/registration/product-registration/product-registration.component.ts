import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { Regex } from 'src/app/utils/enums/regex.enum';
import { RegistrationRequest } from 'src/app/utils/models/registration-request.model';

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
  private registration: any;
  private storeId: number;

  public imageSrc;

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

  get imgf() {
    return this.imageForm.controls;
  }

  get pf() {
    return this.productForm.controls;
  }

  public confirmDetails(): void {
    this.loader.enable();
    sessionStorage.removeItem('registerRequest');

    if (this.registration.update) {
      this.product.productId = this.registration.id;

      this.productService.updateProduct(this.product).subscribe(response => {
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
        this.modalService.openSimpleModal('Sucesso', 'Detalhe adicionado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
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
    this.product.details = [];
    this.step = 2;
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

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private setInitialData(): void {
    // this.registration = this.sessionStorageService.getObject('registerRequest');

    // TEST
    this.registration = new RegistrationRequest(1, false);

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
