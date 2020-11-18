import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { InputMasks } from 'src/app/shared/utils/input-masks.enum';

@Component({
  selector: 'app-address-registration',
  templateUrl: './address-registration.component.html',
  styleUrls: ['./address-registration.component.scss']
})
export class AddressRegistrationComponent implements OnInit {

  private address: any;

  public postalCodeMask = InputMasks.CEP;
  public form: FormGroup;
  public submitted = false;
  public update = false;

  constructor(
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
    this.buildForm();
  }

  get f() {
    return this.form.controls;
  }

  private buildForm(): void {
    if (this.update) {
      this.form = this.formBuilder.group({
        postalCode: [this.address.postalCode, Validators.required],
        address: [this.address.address, Validators.required],
        number: [this.address.number, Validators.required],
        stateCode: [this.address.stateCode, Validators.required],
        city: [this.address.city, Validators.required],
        district: [this.address.district, Validators.required],
        complement: [this.address.complement]
      });

    } else {
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
  }

  private getInitialData(): void {
    if (this.router.url.split('/')[2] === 'atualizar') {
      this.update = true;
      this.address = JSON.parse(this.storageService.getSessionItem('addressToUpdate'));
    }
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
    address.userId = JSON.parse(this.storageService.getSessionItem('userProfile')).userId;
    address.country = 'Brasil';

    this.loader.enable();

    if (this.update) {

      this.addressService.updateAddress(address).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', response.messagem, [{text:'OK'}]).subscribe(() => {
            this.router.navigateByUrl('gerenciar/perfil/enderecos');
          });

        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{text:'OK'}]);
        }
      });

    } else {
      this.addressService.createAddress(address).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', response.message, [{text:'OK'}]).subscribe(() => {
            this.router.navigateByUrl('gerenciar/perfil');
          });

        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{text:'OK'}]);
        }
      });
    }
  }
}
