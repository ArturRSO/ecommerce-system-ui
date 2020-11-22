import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { StoreService } from 'src/app/core/services/store.service';
import { TelephoneService } from 'src/app/core/services/telephone.service';
import { DocumentType } from 'src/app/shared/utils/document-type.enum';
import { InputMasks } from 'src/app/shared/utils/input-masks.enum';
import { RegexEnum } from 'src/app/shared/utils/regex.enum';

@Component({
  selector: 'app-store-registration',
  templateUrl: './store-registration.component.html',
  styleUrls: ['./store-registration.component.scss']
})
export class StoreRegistrationComponent implements OnInit {

  private user: any;
  private storeToUpdate: any;

  public addresses = [];
  public addressPlaceholder = 'Você ainda não cadastrou nenhum endereço';
  public documentMask = InputMasks.CNPJ;
  public form: FormGroup;
  public storeType: string;
  public submitted = false;
  public telephones = [];
  public telephoneMask = InputMasks.TELEPHONE;
  public telephonePlaceholder = 'Você ainda não cadastrou nenhum telefone';
  public updateJuridica = false;

  constructor(
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private storageService: StorageService,
    private storeService: StoreService,
    private telephoneService: TelephoneService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
    this.buildForm();
  }

  get f() {
    return this.form.controls;
  }

  private buildForm(): void {

    switch (this.storeType) {
      case 'fisica':
        this.form = this.formBuilder.group({
          name: ['', Validators.required],
          addressId: ['', Validators.required],
          telephoneId: ['', Validators.required]
        });
        break;

      case 'juridica':
        this.form = this.formBuilder.group({
          name: ['', Validators.required],
          documentNumber: ['', [Validators.required, Validators.pattern(new RegExp(RegexEnum.CNPJ))]],
          addressId: ['', Validators.required],
          telephoneId: ['', Validators.required]
        });
        break;

      case 'loja':
        this.storeToUpdate = JSON.parse(this.storageService.getSessionItem('currentStore'));
        if (this.storeToUpdate.documentTypeId === DocumentType.CPF) {
          this.form = this.formBuilder.group({
            name: [this.storeToUpdate.name, Validators.required],
            addressId: [this.storeToUpdate.addressId, Validators.required],
            telephoneId: [this.storeToUpdate.telephoneId, Validators.required]
          });

        } else {
          this.updateJuridica = true;
          this.form = this.formBuilder.group({
            name: [this.storeToUpdate.name, Validators.required],
            documentNumber: [this.storeToUpdate.documentNumber, [Validators.required, Validators.pattern(new RegExp(RegexEnum.CNPJ))]],
            addressId: [this.storeToUpdate.addressId, Validators.required],
            telephoneId: [this.storeToUpdate.telephoneId, Validators.required]
          });
        }
        break;
    }
  }

  private getInitialData(): any {
    this.storeType = this.router.url.split('/')[3];
    this.user = JSON.parse(this.storageService.getSessionItem('userProfile'));

    this.getAddresses();
    this.getTelephones();
  }

  private getAddresses(): void {
    this.loader.enable();
    this.addressService.getAddressesByUserId(this.user.userId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.addressPlaceholder = 'Escolha um endereço';
        this.addresses = response.data;
      }
    });
  }

  private getTelephones(): void {
    this.loader.enable();
    this.telephoneService.getTelephonesByUserId(this.user.userId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.telephones = response.data;
        this.telephonePlaceholder = 'Escolha um telefone';
      }
    });
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public onSubmit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const store = this.form.value;

    if (this.storeType === 'loja') {

      if (this.storeToUpdate.documentTypeId === DocumentType.CPF) {
        store.documentNumber = this.storeToUpdate.documentNumber;
      }

      store.storeId = this.storeToUpdate.storeId;
      store.documentTypeId = this.storeToUpdate.documentTypeId;

      this.loader.enable();
      this.storeService.updateStore(store).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
            this.navigateToPage('gerenciar/lojas/minhas');
          });

        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{text: 'OK'}]);
        }
      });

    } else {
      switch (this.storeType) {
        case 'fisica':
          store.documentNumber = this.user.documentNumber;
          store.documentTypeId = this.user.documentTypeId;
          break;

        case 'juridica':
          store.documentTypeId = DocumentType.CNPJ;
          break;
      }

      this.loader.enable();
      this.storeService.createStore(store, this.user.userId).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
            this.navigateToPage('gerenciar/lojas/minhas');
          });

        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{text: 'OK'}]);
        }
      });
    }
  }
}
