import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { StoreService } from 'src/app/core/services/store.service';
import { TelephoneService } from 'src/app/core/services/telephone.service';
import { DocumentType } from 'src/app/utils/enums/document-type.enum';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';
import { Regex } from 'src/app/utils/enums/regex.enum';
import { Roles } from 'src/app/utils/enums/roles.enum';
import { RegistrationRequest } from 'src/app/utils/models/registration-request.model';

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.scss']
})
export class StoreProfileComponent implements OnInit {

  public address: any;
  public documentLabel: string;
  public documentMask: string;
  public imageSrc: string;
  public postalCodeMask = InputMasks.CEP;
  public storeAdmin: boolean;
  public store: any;
  public telephone: any;
  public telephoneMask = InputMasks.TELEPHONE;

  private imagePattern = new RegExp(Regex.IMAGE_FILE);
  private profileImageSrc: string;

  constructor(
    private authService: AuthenticationService,
    private addressService: AddressService,
    private loader: LoaderService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private storeService: StoreService,
    private telephoneService: TelephoneService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  public changeProfileImage(): void {
    if (this.storeAdmin) {
      const fileUpload = document.getElementById('profile-image-upload') as HTMLElement;
      fileUpload.click();
    }
  }

  public deleteStore(): void {
    this.modalService.openSimpleModal('Confirmação', 'Tem certeza que deseja desativar esta loja?', [{ text: 'Não' }, { text: 'Sim' }]).subscribe(response => {
      if (response === 'Sim') {
        this.loader.enable();

        this.storeService.deleteStore(this.store.storeId).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.modalService.openSimpleModal('Sucesso', 'Loja desativada.', [{ text: 'OK' }]).subscribe(() => {
              this.navigateToPage('loja/produtos');
            });
          } else {
            this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
          }
        });
      }
    });
  }

  public navigateToOrders(): void {
    this.navigateToPage(`gerenciamento/pedidos?store=${this.store.storeId}`);
  }

  public setProfileImageHover(): void {
    if (this.storeAdmin) {
      this.imageSrc = '../../../../assets/images/profile-image-hover.png';
    }
  }

  public setProfileImage(): void {
    if (this.storeAdmin) {
      this.imageSrc = this.profileImageSrc;
    }
  }

  public updateAddress(): void {
    sessionStorage.setItem('nextRoute', 'gerenciamento/lojas');
    this.sessionStorageService.setObject('registerRequest', new RegistrationRequest(this.address.addressId, true, null));
    this.navigateToPage('cadastro/endereco');
  }

  public updateStore(): void {
    this.sessionStorageService.setObject('registerRequest', new RegistrationRequest(this.store.storeId, true, null));
    this.navigateToPage('cadastro/loja');
  }

  public updateTelephone(): void {
    sessionStorage.setItem('nextRoute', 'gerenciamento/lojas');
    this.sessionStorageService.setObject('registerRequest', new RegistrationRequest(this.telephone.telephoneId, true, null));
    this.navigateToPage('cadastro/telefone');
  }

  public uploadImage(event: any): any {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (file.type.match(this.imagePattern)) {
        this.loader.enable();

        this.storeService.changeProfileImage(this.store.storeId, file).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.modalService.openSimpleModal('Sucesso', response.message, [{ text: 'OK' }]).subscribe(() => {
              this.getData();
            });
          } else {
            this.modalService.openSimpleModal('Erro', response.message, [{ text: 'OK' }]);
          }
        });

      } else {
        this.modalService.openSimpleModal('Atenção', 'Envie um arquivo de imagem válido!', [{ text: 'OK' }]);
      }
    }
  }

  private getData(): void {
    const storeId = parseInt(this.route.snapshot.queryParamMap.get('store'));
    this.storeAdmin = this.authService.getAuthenticationState().roleId === Roles.STORE_ADMIN;

    if (storeId && storeId !== NaN) {
      this.loader.enable();
      this.storeService.getStoreById(storeId).subscribe(response => {
        if (response.success) {
          this.store = response.data;

          if (response.data.documentTypeId === DocumentType.CPF) {
            this.documentLabel = 'CPF';
            this.documentMask = InputMasks.CPF;

          } else {
            this.documentLabel = 'CNPJ';
            this.documentMask = InputMasks.CNPJ;
          }

          this.profileImageSrc = `data:image;base64, ${response.data.profileImage}`;
          this.imageSrc = this.profileImageSrc;

          const addressId = response.data.addressId;
          const telephoneId = response.data.telephoneId;

          this.addressService.getAddressById(addressId).subscribe(response => {
            if (response.success) {
              this.address = response.data;
            }

            this.telephoneService.getTelephoneById(telephoneId).subscribe(response => {
              if (response.success) {
                this.telephone = response.data;
              }
              this.loader.disable();
            });
          });

        } else {
          this.loader.disable();
          this.modalService.openSimpleModal('Atenção', response.data, [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage('gerenciamento/lojas');
          });
        }
      });
    } else {
      this.modalService.openSimpleModal('Atenção', 'Forneça um ID válido!', [{ text: 'OK' }]).subscribe(() => {
        this.navigateToPage('gerenciamento/lojas');
      });
    }
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }
}
