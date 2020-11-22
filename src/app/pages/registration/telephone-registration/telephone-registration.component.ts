import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { TelephoneService } from 'src/app/core/services/telephone.service';
import { UtilService } from 'src/app/core/services/util.service';
import { InputMasks } from 'src/app/shared/utils/input-masks.enum';

@Component({
  selector: 'app-telephone-registration',
  templateUrl: './telephone-registration.component.html',
  styleUrls: ['./telephone-registration.component.scss']
})
export class TelephoneRegistrationComponent implements OnInit {

  private telephone: any;
  private userId: number;

  public form: FormGroup;
  public submitted = false;
  public telephoneMask = InputMasks.TELEPHONE;
  public telephoneTypes = [];
  public update = false;

  constructor(
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private storageService: StorageService,
    private telephoneService: TelephoneService,
    private utilService: UtilService
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
        localCode: [this.telephone.localCode, [Validators.required, Validators.maxLength(2)]],
        number: [this.telephone.number, [Validators.required]],
        telephoneTypeId: [this.telephone.telephoneTypeId, [Validators.required]]
      });

    } else {
      this.form = this.formBuilder.group({
        localCode: ['', [Validators.required, Validators.maxLength(2)]],
        number: ['', [Validators.required]],
        telephoneTypeId: ['', [Validators.required]]
      });
    }
  }

  private getInitialData(): void {
    this.userId = JSON.parse(this.storageService.getSessionItem('userProfile')).userId;
    this.telephoneTypes = this.utilService.getTelephoneTypes();

    switch (this.router.url.split('/')[2]) {
      case 'atualizar':
        this.update = true;
        this.telephone = JSON.parse(this.storageService.getSessionItem('telephoneToUpdate'));
        break;
    }
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const telephone = this.form.value;

    this.loader.enable();

    if (this.update) {
      telephone.telephoneId = this.telephone.telephoneId;
      telephone.userId = this.telephone.userId;
      telephone.internationalCode = this.telephone.internationalCode;

      this.telephoneService.updateTelephone(telephone).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
            this.navigateToPage('gerenciar/perfil')
          });

        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{text: 'OK'}]);
        }
      });

    } else {
      telephone.userId = this.userId;
      telephone.telephoneTypeId = parseInt(telephone.telephoneTypeId);

      this.telephoneService.createTelephone(telephone).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
            this.navigateToPage('gerenciar/perfil')
          });

        } else {
          this.modalService.openSimpleModal('Atenção', response.message, [{text: 'OK'}]);
        }
      });
    }
  }
}
