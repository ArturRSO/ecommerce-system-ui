import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { TelephoneService } from 'src/app/core/services/telephone.service';
import { UserService } from 'src/app/core/services/user.service';
import { UtilService } from 'src/app/core/services/util.service';
import { InputMasks } from 'src/app/shared/utils/input-masks.enum';
import { RegexEnum } from 'src/app/shared/utils/regex.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private imagePattern = new RegExp(RegexEnum.IMAGE_FILE);

  public addresses = [];
  public documentMask = InputMasks.CPF;
  public imageOverlayText = "Cadastrar imagem de perfil";
  public isProfile = true;
  public orderText: string;
  public orderRoute: string;
  public profileImageSrc: any;
  public telephones = [];
  public user: any;

  constructor(
    private addressService: AddressService,
    private authService: AuthenticationService,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private storageService: StorageService,
    private telephoneService: TelephoneService,
    private userService: UserService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
    this.getProfileAdresses();
    this.getProfileTelephones();
  }

  private getInitialData(): void {
    switch (this.router.url.split('/')[2]) {
      case 'perfil':
        this.user = JSON.parse(this.storageService.getSessionItem('userProfile'));
        this.orderRoute = 'gerenciar/perfil/pedidos';
        this.orderText = 'Meus pedidos';
        break;
      case 'usuario':
        this.user = JSON.parse(this.storageService.getSessionItem('userToUpdate'));
        this.orderRoute = 'gerenciar/usuario/pedidos';
        this.orderText = 'Ver pedidos';
        this.isProfile = false;
        break;
    }

    if (this.user.profileImagePath) {
      this.loader.enable();

      this.userService.getProfileImage(this.user.userId, this.user.profileImagePath).subscribe(response => {
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

  private getProfileAdresses(): any {
    this.loader.enable();
    this.addressService.getProfileAddresses(this.user.userId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.addresses = response.data;
      }
    });
  }

  private getProfileTelephones(): any {
    this.loader.enable();
    this.telephoneService.getProfileTelephones(this.user.userId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.telephones = response.data;
      }
    });
  }

  public changeProfileImage(): void {
    if (this.isProfile) {
      const fileUpload = document.getElementById('profile-image-upload') as HTMLElement;
      fileUpload.click();
    }
  }

  public getTelephoneType(telephoneTypeId: number): string {

    return this.utilService.getTelephoneTypes().find(type => type.id = telephoneTypeId).name;
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public openDeletionModal(): void {
    this.modalService.openSimpleModal('Atenção', 'Deseja mesmo desativar a conta?', [{text: 'Não'}, {text: 'Sim'}]).subscribe(response => {
      if (response === 'Sim') {
        this.loader.enable();
        this.userService.deleteProfile(this.user.userId).subscribe(result => {
          this.loader.disable();
          if (result.success) {
            this.modalService.openSimpleModal('Sucesso', result.message, [{text: 'OK'}]).subscribe(() => {
              this.authService.logout();
              this.navigateToPage('navegar/home');
            });

          } else {
            this.modalService.openSimpleModal('Atenção', result.message, [{text: 'OK'}]);
          }
        });
      }
    });
  }

  public uploadImage(event: any): void {

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (file.type.match(this.imagePattern)) {
        this.loader.enable();

        this.userService.createProfileImage(this.user.userId, file).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
              this.loader.enable();
              this.userService.getProfile().subscribe(result => {
                this.loader.disable();
                if (result.success) {
                  this.storageService.setSessionItem('userProfile', JSON.stringify(result.data));
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

  public updateAddress(address: any) {
    this.storageService.setSessionItem('addressToUpdate', JSON.stringify(address));
    this.navigateToPage('cadastro/atualizar/endereco');
  }

  public updateProfile() {
    this.navigateToPage('cadastro/atualizar/perfil')
  }

  public updateTelephone(telephone: any) {
    this.storageService.setSessionItem('telephoneToUpdate', JSON.stringify(telephone));
    this.navigateToPage('cadastro/atualizar/telefone');
  }
}
