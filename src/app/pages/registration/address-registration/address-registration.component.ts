import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';

@Component({
  selector: 'app-address-registration',
  templateUrl: './address-registration.component.html',
  styleUrls: ['./address-registration.component.scss']
})
export class AddressRegistrationComponent implements OnInit {

  public form: FormGroup;
  public postalCodeMask = InputMasks.CEP;
  public submitted = false;
  public validationMessages: any;

  private registration: any;

  constructor(
    private addressService: AddressService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.setInitialData();
  }

  get f() {
    return this.form.controls;
  }

  public fillAddressByCep(): void {

    if (this.f.postalCode.value) {
      this.loader.enable();
      this.addressService.getAddressByPostalCode(this.f.postalCode.value).subscribe(response => {
        this.loader.disable();

        if (response.erro) {
          this.modalService.openSimpleModal('Atenção', 'CEP não encontrado!', [{ text: 'OK' }]);

        } else {
          this.f.address.setValue(response.logradouro);
          this.f.stateCode.setValue(response.uf);
          this.f.city.setValue(response.localidade);
          this.f.district.setValue(response.bairro);
        }
      });
    }
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const address = this.form.value;
    address.country = 'Brasil';
    address.userId = this.authService.getAuthenticationState().userId;

    this.loader.enable();
    sessionStorage.removeItem('userRegistration');

    if (this.registration.update) {
      address.addressId = this.registration.id;

      this.addressService.updateAddress(address).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', 'Endereço atualizado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage('cadastro/perfil');
          });
        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });
    } else {
      this.addressService.createAddress(address).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', 'Endereço cadastrado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
            const nextRoute = sessionStorage.getItem('nextRoute');

            if (nextRoute) {
              sessionStorage.removeItem('nextRoute');
              this.navigateToPage(nextRoute);

            } else {
              this.navigateToPage('cadastro/perfil');
            }
          });
        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      postalCode: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      stateCode: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      complement: ['']
    });
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private setInitialData(): void {
    this.registration = this.sessionStorageService.getObject('registerRequest');

    if (this.registration.update) {
      this.loader.enable();
      this.addressService.getAddressById(this.registration.id).subscribe(response => {
        this.loader.disable();
        this.f.postalCode.setValue(response.data.postalCode);
        this.f.address.setValue(response.data.address);
        this.f.number.setValue(response.data.number);
        this.f.stateCode.setValue(response.data.stateCode);
        this.f.city.setValue(response.data.city);
        this.f.district.setValue(response.data.district);
        this.f.complement.setValue(response.data.complement);
      });
    }

    this.setValidationMessages();
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      postalCode: [
        { type: 'required', message: 'Digite o CEP' }
      ],
      address: [
        { type: 'required', message: 'Digite o logradouro' }
      ],
      number: [
        { type: 'required', message: 'Digite o número' }
      ],
      stateCode: [
        { type: 'required', message: 'Digite o UF do estado' }
      ],
      city: [
        { type: 'required', message: 'Digite a cidade' }
      ],
      district: [
        { type: 'required', message: 'Digite o bairro' }
      ]
    }
  }
}
