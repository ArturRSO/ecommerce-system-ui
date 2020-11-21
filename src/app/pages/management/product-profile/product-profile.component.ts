import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { RegexEnum } from 'src/app/shared/utils/regex.enum';
import { Roles } from 'src/app/shared/utils/roles.enum';

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.scss']
})
export class ProductProfileComponent implements OnInit {

  private imagePattern = new RegExp(RegexEnum.IMAGE_FILE);
  private user: any;

  public imageOverlayText = "Cadastrar imagem do produto";
  public isStoreAdmin: boolean;
  public productImageSrc: any;
  public product: any;

  constructor(
    private loader: LoaderService,
    private modalService: ModalService,
    private productService: ProductService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  private getInitialData(): void {
    this.user = JSON.parse(this.storageService.getSessionItem('userProfile'));
    this.product = JSON.parse(this.storageService.getSessionItem('selectedProduct'));

    this.isStoreAdmin = this.user.roleId === Roles.STORE_ADMIN;

    if (this.product.imagePath) {
      this.loader.enable();

      this.productService.getProductImage(this.product.imagePath).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.imageOverlayText = "Mudar imagem do produto";
          this.productImageSrc = this.sanitizer.bypassSecurityTrustUrl(`data:image;base64, ${response.data}`);
        }
      });
    } else {
      this.productImageSrc = '../../../../assets/images/design/profile-avatar.png';
     }
  }

  public changeProductImage(): void {
    if (this.isStoreAdmin) {
      const fileUpload = document.getElementById('product-image-upload') as HTMLElement;
      fileUpload.click();
    }
  }

  public uploadImage(event: any): void {

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (file.type.match(this.imagePattern)) {
        this.loader.enable();

        this.productService.createProductImage(this.product.productId, file).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
              this.loader.enable();
              this.productService.getProductById(this.product.productId).subscribe(result => {
                this.loader.disable();
                if (result.success) {
                  this.storageService.setSessionItem('currentProduct', JSON.stringify(result.data));
                  this.getInitialData();

                } else {
                  this.modalService.openSimpleModal('Erro', result.message, [{text: 'OK'}]);
                }
              });
            });

          } else {
            this.modalService.openSimpleModal('Erro', response.message, [{text: 'OK'}]);
          }
        });

      } else {
        this.modalService.openSimpleModal('Atenção', 'Envie um arquivo de imagem!', [{text: 'OK'}]);
      }
    }
  }

  public deleteProduct(): void {
    // TO DO

    this.modalService.openSimpleModal('Atenção', 'Deseja mesmo deletar o produto?',
    [{text: 'Sim'}, {text: 'Não'}]).subscribe(response => {
      if (response === 'Sim') {
        console.log('Deletar!');
      }
    })
  }

  public updateProduct(): void {
    // TO DO

    console.log('Update');
  }
}
