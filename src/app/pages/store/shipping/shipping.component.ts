import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/core/services/address.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  public addresses = [];
  public postalCodeMask = InputMasks.CEP;

  constructor(
    private addressService: AddressService,
    private authService: AuthenticationService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.getAddresses();
  }

  public confirmAddress(address: any): void {
    // TO DO
    console.log(address);
  }

  public registerAddress(): void {
    // TO DO
    console.log('REGISTER ADDRESS');
  }

  private getAddresses(): void {
    this.loader.enable();

    const userId = this.authService.getAuthenticationState().userId;

    this.addressService.getAddressesByUserId(userId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.addresses = response.data;
      }
    });
  }
}
