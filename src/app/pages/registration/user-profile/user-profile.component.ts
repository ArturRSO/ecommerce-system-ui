import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/core/services/address.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { TelephoneService } from 'src/app/core/services/telephone.service';
import { UserService } from 'src/app/core/services/user.service';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';
import { RolesList } from 'src/app/utils/lists/roles.list';
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
    private sessionStorageService: SessionStorageService,
    private telephoneService: TelephoneService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  public navigateToPage(route: string): void {
    // TO DO
    console.log(route);
  }

  public deleteAddress(addressId: number): void {
    // TO DO
    console.log(addressId);
  }

  public updateAddress(address: any): void {
    // TO DO
    console.log(address);
  }

  public updateProfile(): void {
    const roles = new RolesList();
    const role = roles.getRoleById(this.user.roleId);

    this.sessionStorageService.setObject('userRegistration', new UserRegistration([role], false, null));
    this.navigateToPage('cadastro/perfil/atualizar');
  }

  public deleteTelephone(telephoneId: number): void {
    // TO DO
    console.log(telephoneId);
  }

  public updateTelephone(telephone: any): void {
    // TO DO
    console.log(telephone);
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
