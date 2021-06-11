import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { TelephoneService } from 'src/app/core/services/telephone.service';
import { UserService } from 'src/app/core/services/user.service';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';
import { Regex } from 'src/app/utils/enums/regex.enum';
import { Roles } from 'src/app/utils/enums/roles.enum';
import { RolesList } from 'src/app/utils/lists/roles.list';
import { PasswordUpdate } from 'src/app/utils/models/password-update.model';
import { RegistrationRequest } from 'src/app/utils/models/registration-request.model';
import { UserRegistration } from 'src/app/utils/models/user-registration.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public addresses = [];
  public documentMask = InputMasks.CPF;
  public imageSrc: string;
  public postalCodeMask = InputMasks.CEP;
  public profile = true;
  public telephoneMask = InputMasks.TELEPHONE;
  public telephones = [];
  public user: any;

  private imagePattern = new RegExp(Regex.IMAGE_FILE);
  private profileImageSrc: string;

  constructor(
    private addressService: AddressService,
    private authService: AuthenticationService,
    private loader: LoaderService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private telephoneService: TelephoneService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  public changeProfileImage(): void {
    if (this.profile) {
      const fileUpload = document.getElementById('profile-image-upload') as HTMLElement;
      fileUpload.click();
    }
  }

  public deleteAddress(addressId: number): void {
    this.modalService.openSimpleModal('Confirmação', 'Tem certeza que deseja deleter este endereço?', [{ text: 'Não' }, { text: 'Sim' }]).subscribe(response => {
      if (response === 'Sim') {
        this.loader.enable();

        this.addressService.deleteAddress(addressId).subscribe(response => {
          if (response.success) {
            this.modalService.openSimpleModal('Sucesso', 'Endereço deletado', [{ text: 'OK' }]).subscribe(() => {
              this.getAddressesAndTelephones();
            });
          } else {
            this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
          }
        });
      }
    });
  }

  public deleteProfile() {
    this.modalService.openSimpleModal('Confirmação', 'Tem certeza que deseja desativar seu perfil?', [{ text: 'Não' }, { text: 'Sim' }]).subscribe(response => {
      if (response === 'Sim') {
        this.loader.enable();

        this.userService.deleteUser(this.user.userId).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.modalService.openSimpleModal('Sucesso', 'Perfil desativado.', [{ text: 'OK' }]).subscribe(() => {
              this.navigateToPage('loja/produtos');
            });
          } else {
            this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
          }
        });
      }
    });
  }

  public deleteTelephone(telephoneId: number): void {
    this.modalService.openSimpleModal('Confirmação', 'Tem certeza que deseja deleter este telefone?', [{ text: 'Não' }, { text: 'Sim' }]).subscribe(response => {
      if (response === 'Sim') {
        this.loader.enable();

        this.telephoneService.deleteTelephone(telephoneId).subscribe(response => {
          if (response.success) {
            this.modalService.openSimpleModal('Sucesso', 'Telefone deletado', [{ text: 'OK' }]).subscribe(() => {
              this.getAddressesAndTelephones();
            });
          } else {
            this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
          }
        });
      }
    });
  }

  public navigateToPage(route: string): void {
    this.router.navigateByUrl(route);
  }

  public registerAddress(): void {
    this.sessionStorageService.setObject('registerRequest', new RegistrationRequest(null, false));
    this.navigateToPage('cadastro/endereco');
  }

  public registerTelephone(): void {
    this.sessionStorageService.setObject('registerRequest', new RegistrationRequest(null, false));
    this.navigateToPage('cadastro/telefone');
  }

  public setProfileImageHover(): void {
    if (this.profile) {
      this.imageSrc = '../../../../assets/images/profile-image-hover.png';
    }
  }

  public setProfileImage(): void {
    if (this.profile) {
      this.imageSrc = this.profileImageSrc;
    }
  }

  public updateAddress(addressId: number): void {
    this.sessionStorageService.setObject('registerRequest', new RegistrationRequest(addressId, true));
    this.navigateToPage('cadastro/endereco');
  }

  public updatePassword(): void {
    this.sessionStorageService.setObject('passwordUpdate', new PasswordUpdate(null, false));
    this.navigateToPage('cadastro/senha');
  }

  public updateProfile(): void {
    const roles = new RolesList();
    const role = roles.getRoleById(this.authService.getAuthenticationState().roleId);

    this.sessionStorageService.setObject('userRegistration', new UserRegistration([role], true, null));
    this.navigateToPage('cadastro/perfil/atualizar');
  }

  public updateTelephone(telephoneId: number): void {
    this.sessionStorageService.setObject('registerRequest', new RegistrationRequest(telephoneId, true));
    this.navigateToPage('cadastro/telefone');
  }

  public uploadImage(event: any): any {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (file.type.match(this.imagePattern)) {
        this.loader.enable();

        this.userService.changeProfileImage(this.user.userId, file).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.modalService.openSimpleModal('Sucesso', response.message, [{ text: 'OK' }]).subscribe(() => {
              this.getProfile();
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

  private getAddressesAndTelephones(): any {
    this.addressService.getAddressesByUserId(this.user.userId).subscribe(response => {
      if (response.success) {
        this.addresses = response.data;
      }

      this.telephoneService.getTelephonesByUserId(this.user.userId).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.telephones = response.data;
        }
      });
    });
  }

  private getProfile(): void {
    this.loader.enable();

    const authentication = this.authService.getAuthenticationState();
    const userId = parseInt(this.route.snapshot.queryParamMap.get('user'));

    if (userId && userId !== NaN) {
      if (authentication.roleId === Roles.SYSTEM_ADMIN) {
        this.userService.getUserById(userId).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.profile = false;
            this.user = response.data;
            this.profileImageSrc = `data:image;base64, ${response.data.profileImage}`;
            this.imageSrc = this.profileImageSrc;

            this.getAddressesAndTelephones();
          }
        });
      } else {
        this.modalService.openSimpleModal('Atenção', 'Você não possui acesso a esse recurso.', [{ text: 'OK' }]);
      }
    } else {
      this.userService.getProfile().subscribe(response => {
        this.user = response.data;
        this.profileImageSrc = `data:image;base64, ${response.data.profileImage}`;
        this.imageSrc = this.profileImageSrc;

        this.getAddressesAndTelephones();
      });
    }
  }
}
