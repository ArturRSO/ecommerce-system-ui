import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { StoreService } from 'src/app/core/services/store.service';
import { DocumentType } from 'src/app/utils/enums/document-type.enum';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';
import { DocumentTypeList } from 'src/app/utils/lists/document-type.list';

@Component({
  selector: 'app-store-registration',
  templateUrl: './store-registration.component.html',
  styleUrls: ['./store-registration.component.scss']
})
export class StoreRegistrationComponent implements OnInit {

  public documentMask = InputMasks.CPF;
  public documentTypes = [];
  public form: FormGroup;
  public submitted = false;
  public validationMessages: any;

  private registration: any;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.setInitialData();
  }

  get f() {
    return this.form.controls;
  }

  public onDocumentTypeSelection(value: any) {
    this.documentMask = value === DocumentType.CPF ? InputMasks.CPF : InputMasks.CNPJ;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const store = this.form.value;

    this.loader.enable();
    sessionStorage.removeItem('userRegistration');

    if (this.registration.update) {
      store.storeId = this.registration.id;

      this.storeService.updateStore(store).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', 'Loja atualizada com sucesso!', [{ text: 'OK' }]).subscribe(() => {
            // TO DO
            // this.navigateToPage('cadastro/perfil');
          });
        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });
    } else {
      this.storeService.createStore(store, this.authService.getAuthenticationState().userId).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', 'Loja cadastrada com sucesso!', [{ text: 'OK' }]).subscribe(() => {
            // TO DO
            // this.navigateToPage('cadastro/perfil');
          });
        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      documentNumber: ['', Validators.required],
      documentTypeId: ['', Validators.required]
    });
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private setInitialData(): void {
    this.registration = this.sessionStorageService.getObject('registerRequest');

    if (this.registration.update) {
      this.loader.enable();
      this.storeService.getStoreById(this.registration.id).subscribe(response => {
        this.loader.disable();
        this.f.name.setValue(response.data.name);
        this.f.documentNumber.setValue(response.data.documentNumber);
        this.f.documentTypeId.setValue(response.data.documentTypeId);
      });
    }

    this.documentTypes = new DocumentTypeList().getAllDocumentTypes();

    this.setValidationMessages();
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      name: [
        { type: 'required', message: 'Digite o nome da loja' }
      ],
      documentNumber: [
        { type: 'required', message: 'Digite o documento associado á loja' }
      ],
      documentTypeId: [
        { type: 'required', message: 'Selecione o tipo de documento' }
      ]
    }
  }
}
