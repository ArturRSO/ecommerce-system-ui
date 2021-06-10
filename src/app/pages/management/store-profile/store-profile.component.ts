import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { StoreService } from 'src/app/core/services/store.service';
import { TelephoneService } from 'src/app/core/services/telephone.service';
import { DocumentType } from 'src/app/utils/enums/document-type.enum';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';
import { Regex } from 'src/app/utils/enums/regex.enum';

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
  public store: any;
  public telephone: any;
  public telephoneMask = InputMasks.TELEPHONE;

  private imagePattern = new RegExp(Regex.IMAGE_FILE);
  private profileImageSrc: string;

  constructor(
    private addressService: AddressService,
    private loader: LoaderService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private telephoneService: TelephoneService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  public changeProfileImage(): void {
    const fileUpload = document.getElementById('profile-image-upload') as HTMLElement;
    fileUpload.click();
  }

  public deleteStore(): void {
    // TO DO
    console.log('DELETE STORE');
  }

  public navigateToOrders(): void {
    this.navigateToPage(`gerenciamento/pedidos?store=${this.store.storeId}`);
  }

  public setProfileImageHover(): void {
    this.imageSrc = '../../../../assets/images/profile-image-hover.png';
  }

  public setProfileImage(): void {
    this.imageSrc = this.profileImageSrc;
  }

  public updateAddress(): void {
    // TO DO
    console.log('UPDATE ADDRESS');
  }

  public updateStore(): void {
    // TO DO
    console.log('UPDATE STORE');
  }

  public updateTelephone(): void {
    // TO DO
    console.log('UPDATE TELEPHONE');
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
