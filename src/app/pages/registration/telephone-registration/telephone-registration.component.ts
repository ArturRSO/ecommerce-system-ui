import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { TelephoneService } from 'src/app/core/services/telephone.service';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';
import { Regex } from 'src/app/utils/enums/regex.enum';
import { TelephoneTypeList } from 'src/app/utils/lists/telephone-type.list';

@Component({
  selector: 'app-telephone-registration',
  templateUrl: './telephone-registration.component.html',
  styleUrls: ['./telephone-registration.component.scss']
})
export class TelephoneRegistrationComponent implements OnInit {

  public form: FormGroup;
  public localCodeMask = InputMasks.TWO_DIGIT;
  public submitted = false;
  public telephoneMask = InputMasks.TELEPHONE;
  public telephoneTypes = [];
  public validationMessages: any;

  private registration: any;
  private telephoneTypeList = new TelephoneTypeList();

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private telephoneService: TelephoneService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.setInitialData();
  }

  get f() {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const telephone = this.form.value;
    telephone.userId = this.authService.getAuthenticationState().userId;
    telephone.internationalCode = '+55';

    this.loader.enable();
    sessionStorage.removeItem('registerRequest');

    if (this.registration.update) {
      telephone.telephoneId = this.registration.id;

      this.telephoneService.updateTelephone(telephone).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', 'Telefone atualizado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage('cadastro/perfil');
          });
        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });
    } else {

      let nextRoute = 'cadastro/perfil';
      let relateWithUser = true;
      let storeRegistration = false;

      if (this.registration.additionalInfo) {
        if (this.registration.additionalInfo?.storeRegistration) {
          nextRoute = 'cadastro/loja';
          relateWithUser = false;
          storeRegistration = true;
        }
      } else if (sessionStorage.getItem('nextRoute')) {
        nextRoute = sessionStorage.getItem('nextRoute');
      }

      this.telephoneService.createTelephone(telephone, relateWithUser).subscribe(response => {
        this.loader.disable();
        if (response.success) {

          if (storeRegistration) {
            this.registration.additionalInfo.telephoneId = response.data;
            this.sessionStorageService.setObject('registerRequest', this.registration);
          }

          sessionStorage.removeItem("nextRoute");
          this.modalService.openSimpleModal('Sucesso', 'Telefone cadastrado com sucesso!', [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage(nextRoute);
          });
        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]);
        }
      });
    }
  }

  public setTelephoneMask(telephoneTypeId: any) {
    this.telephoneMask = this.telephoneTypeList.getTelephoneTypeById(telephoneTypeId).mask;
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      telephoneTypeId: ['', Validators.required],
      localCode: ['', [Validators.required, Validators.pattern(Regex.ONLY_NUMBERS)]],
      number: ['', [Validators.required, Validators.pattern(Regex.ONLY_NUMBERS)]]
    });
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private setInitialData(): void {
    this.registration = this.sessionStorageService.getObject('registerRequest');

    if (this.registration.update) {
      this.loader.enable();
      this.telephoneService.getTelephoneById(this.registration.id).subscribe(response => {
        this.loader.disable();
        this.f.telephoneTypeId.setValue(response.data.telephoneTypeId);
        this.f.localCode.setValue(response.data.localCode);
        this.f.number.setValue(response.data.number);
      });
    }

    this.telephoneTypes = this.telephoneTypeList.getAllTelephoneTypes();

    this.setValidationMessages();
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      telephoneTypeId: [
        { type: 'required', message: 'Selecione o tipo' }
      ],
      localCode: [
        { type: 'required', message: 'Digite o DDD' },
        { type: 'pattern', message: 'Digite um DDD válido' }
      ],
      number: [
        { type: 'required', message: 'Digite o número' },
        { type: 'pattern', message: 'Digite um número válido.' }
      ]
    }
  }
}
