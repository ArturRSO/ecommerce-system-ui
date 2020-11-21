import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { StoreService } from 'src/app/core/services/store.service';
import { DocumentType } from 'src/app/shared/utils/document-type.enum';
import { InputMasks } from 'src/app/shared/utils/input-masks.enum';
import { RegexEnum } from 'src/app/shared/utils/regex.enum';
import { Roles } from 'src/app/shared/utils/roles.enum';

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.scss']
})
export class StoreProfileComponent implements OnInit {

  private imagePattern = new RegExp(RegexEnum.IMAGE_FILE);
  private user: any;

  public documentLabel: string;
  public documentMask: string;
  public imageOverlayText = "Cadastrar imagem de perfil";
  public isStoreAdmin: boolean;
  public profileImageSrc: any;
  public store: any;

  constructor(
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private storageService: StorageService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  private getInitialData(): void {

    this.store = JSON.parse(this.storageService.getSessionItem('currentStore'));
    this.user = JSON.parse(this.storageService.getSessionItem('userProfile'));

    this.isStoreAdmin = this.user.roleId === Roles.STORE_ADMIN;

    if (this.store.documentTypeId === DocumentType.CPF) {
      this.documentLabel = 'CPF';
      this.documentMask = InputMasks.CPF;

    } else {
      this.documentLabel = 'CNPJ';
      this.documentMask = InputMasks.CNPJ;
    }

    if (this.store.profileImagePath) {
      this.loader.enable();

      this.storeService.getProfileImage(this.store.storeId, this.user.userId, this.store.profileImagePath).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.imageOverlayText = "Mudar foto de perfil";
          this.profileImageSrc = this.sanitizer.bypassSecurityTrustUrl(`data:image;base64, ${response.data}`);
        }
      });
    } else {
     this.profileImageSrc = '../../../../assets/images/design/profile-avatar.png';
    }
  }

  public changeProfileImage(): void {
    const fileUpload = document.getElementById('store-image-upload') as HTMLElement;
    fileUpload.click();
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public updateStore(): void {
    // TO DO
    console.log('UPDATE');
  }

  public uploadImage(event: any): void {

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (file.type.match(this.imagePattern)) {
        this.loader.enable();

        this.storeService.createProfileImage(this.store.storeId, this.user.userId, file).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
              this.loader.enable();
              this.storeService.getStoresByUserId(this.user.userId).subscribe(result => {
                this.loader.disable();
                if (result.success) {
                  const store = result.data.find(store => store.storeId === this.store.storeId);
                  this.storageService.setSessionItem('currentStore', JSON.stringify(store));
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

  public openDeletionModal(): void {
    this.modalService.openSimpleModal('Atenção', 'Deseja mesmo desativar a loja?', [{text: 'Não'}, {text: 'Sim'}]).subscribe(response => {
      // TO DO
      if (response === 'Sim') {
        console.log(response);
      }
    });
  }
}
