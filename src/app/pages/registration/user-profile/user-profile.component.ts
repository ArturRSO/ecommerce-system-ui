import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { TelephoneService } from 'src/app/core/services/telephone.service';
import { UserService } from 'src/app/core/services/user.service';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';
import { RolesList } from 'src/app/utils/lists/roles.list';
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
  public postalCodeMask = InputMasks.CEP;
  public telephoneMask = InputMasks.TELEPHONE;
  public profileImageSrc: string;
  public telephones = [];
  public user: any;

  constructor(
    private addressService: AddressService,
    private authService: AuthenticationService,
    private loader: LoaderService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private telephoneService: TelephoneService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  public navigateToPage(route: string): void {
    this.router.navigateByUrl(route);
  }

  public deleteAddress(addressId: number): void {
    // TO DO
    console.log(addressId);
  }

  public registerAddress(): void {
    this.sessionStorageService.setObject('registerRequest', new RegistrationRequest(null, false));
    this.navigateToPage('cadastro/endereco');
  }

  public updateAddress(addressId: number): void {
    this.sessionStorageService.setObject('registerRequest', new RegistrationRequest(addressId, true));
    this.navigateToPage('cadastro/endereco');
  }

  public updateProfile(): void {
    const roles = new RolesList();
    const role = roles.getRoleById(this.authService.getAuthenticationState().roleId);

    this.sessionStorageService.setObject('userRegistration', new UserRegistration([role], true, null));
    this.navigateToPage('cadastro/perfil/atualizar');
  }

  public deleteTelephone(telephoneId: number): void {
    // TO DO
    console.log(telephoneId);
  }

  public registerTelephone(): void {
    this.sessionStorageService.setObject('registerRequest', new RegistrationRequest(null, false));
    this.navigateToPage('cadastro/telefone');
  }

  public updateTelephone(telephoneId: number): void {
    this.sessionStorageService.setObject('registerRequest', new RegistrationRequest(telephoneId, true));
    this.navigateToPage('cadastro/telefone');
  }

  private getProfile(): void {
    this.loader.enable();

    const userId = this.authService.getAuthenticationState().userId;

    this.userService.getProfile().subscribe(response => {
      this.user = response.data;

      this.profileImageSrc = `data:image;base64, ${response.data.profileImage}`

      this.addressService.getAddressesByUserId(userId).subscribe(response => {
        if (response.success) {
          this.addresses = response.data;
        }

        this.telephoneService.getTelephonesByUserId(userId).subscribe(response => {
          if (response.success) {
            this.telephones = response.data;
          }

          this.loader.disable();
        });
      });
    });
  }
}
