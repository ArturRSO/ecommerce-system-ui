import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { StoreService } from 'src/app/core/services/store.service';
import { TelephoneService } from 'src/app/core/services/telephone.service';
import { UtilService } from 'src/app/core/services/util.service';
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

  public address: any;
  public documentLabel: string;
  public documentMask: string;
  public imageOverlayText = "Cadastrar imagem de perfil";
  public isStoreAdmin: boolean;
  public profileImageSrc: any;
  public store: any;
  public telephone: any;

  constructor(
    private addressService: AddressService,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private storageService: StorageService,
    private storeService: StoreService,
    private telephoneService: TelephoneService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  private getInitialData(): void {

    this.store = JSON.parse(this.storageService.getSessionItem('currentStore'));
    this.user = JSON.parse(this.storageService.getSessionItem('userProfile'));
    this.getAddress();
    this.getTelephone();

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

      this.storeService.getProfileImage(this.store.profileImagePath).subscribe(response => {
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

  private getAddress(): void {
    this.loader.enable();
    this.addressService.getAddressById(this.store.addressId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.address = response.data;
      }
    });
  }

  private getTelephone(): void {
    this.loader.enable();
    this.telephoneService.getTelephoneById(this.store.telephoneId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.telephone = response.data;
      }
    })
  }

  public changeProfileImage(): void {
    const fileUpload = document.getElementById('store-image-upload') as HTMLElement;
    fileUpload.click();
  }

  public getTelephoneType(telephoneTypeId: number): string {

    return this.utilService.getTelephoneTypes().find(type => type.id = telephoneTypeId)?.name;
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public updateStore(): void {
    this.storageService.setSessionItem('currentStore', JSON.stringify(this.store));
    this.navigateToPage('cadastro/atualizar/loja');
  }

  public uploadImage(event: any): void {

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (file.type.match(this.imagePattern)) {
        this.loader.enable();

        this.storeService.createProfileImage(this.store.storeId, file).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
              this.loader.enable();
              this.storeService.getStoreById(this.store.storeId).subscribe(result => {
                this.loader.disable();
                if (result.success) {
                  this.storageService.setSessionItem('currentStore', JSON.stringify(result.data));
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
