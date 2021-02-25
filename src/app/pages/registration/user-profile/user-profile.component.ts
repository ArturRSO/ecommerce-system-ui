import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/core/services/address.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserService } from 'src/app/core/services/user.service';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public addresses = [];
  public documentMask = InputMasks.CPF;
  public postalCodeMask = InputMasks.CEP;
  public telephones = [];
  public user: any;

  constructor(
    private addressService: AddressService,
    private authService: AuthenticationService,
    private loader: LoaderService,
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

  private getProfile(): void {
    this.loader.enable();

    const userId = this.authService.getAuthenticationState().userId;

    this.userService.getProfile().subscribe(response => {
      this.user = response.data;

      this.addressService.getAddressesByUserId(userId).subscribe(response => {
        this.addresses = response.data;

        this.loader.disable();
      });
    });
  }
}
