import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { StoreService } from 'src/app/core/services/store.service';
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

  public addresses = [];
  public addressPlaceholder = 'Você ainda não cadastrou nenhum endereço.';
  public documentMask = InputMasks.CNPJ;
  public form: FormGroup;
  public storeType: string;
  public submitted = false;

  constructor(
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private storageService: StorageService,
    private storeService: StoreService
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
          addressId: ['', [Validators.required]],
        });
        break;

      case 'juridica':
        this.form = this.formBuilder.group({
          name: ['', Validators.required],
          documentNumber: ['', [Validators.required, Validators.pattern(new RegExp(RegexEnum.CNPJ))]],
          addressId: ['', [Validators.required]],
        });
        break;
    }
  }

  private getInitialData(): any {
    this.storeType = this.router.url.split('/')[3];
    this.user = JSON.parse(this.storageService.getSessionItem('userProfile'));

    this.loader.enable();
    this.addressService.getProfileAddresses(this.user.userId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.addressPlaceholder = 'Escolha um endereço'
        this.addresses = response.data;
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

    switch (this.router.url.split('/')[3]) {
      case 'fisica':
        store.documentNumber = this.user.documentNumber;
        store.documentTypeId = this.user.documentTypeId;
        break;

      case 'juridica':
        store.documentTypeId = DocumentType.CNPJ;
    }

    this.loader.enable();
    this.storeService.createStore(store, this.user.userId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
          this.navigateToPage('navegar/dashboard');
        });

      } else {
        this.modalService.openSimpleModal('Atenção', response.message, [{text: 'OK'}]);
      }
    });
  }
}
