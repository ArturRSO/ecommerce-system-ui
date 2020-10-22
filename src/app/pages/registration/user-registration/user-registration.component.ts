import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserService } from 'src/app/core/services/user.service';
import { UtilService } from 'src/app/core/services/util.service';
import { InputMasks } from 'src/app/shared/utils/input-masks.enum';
import { RegexEnum } from 'src/app/shared/utils/regex.enum';
import { Roles } from 'src/app/shared/utils/roles.enum';
import { DocumentType } from 'src/app/shared/utils/document-type.enum';
import { MustMatch } from 'src/app/shared/validators/must-match.validator';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  private documentRegex = new RegExp(RegexEnum.CPF);
  private roleId: number;
  private user: any;

  public birthdayYearRange: string;
  public defaultBirthday: Date;
  public documentLabel = 'CPF';
  public documentMask = InputMasks.CPF;
  public form: FormGroup;
  public minBirthday: Date;
  public maxBirthday: Date;
  public selectRole = false;
  public submitted = false;
  public update = false;

  constructor(
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private storageService: StorageService,
    private userService: UserService,
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
        firstName: [this.user.firstName, [Validators.required, Validators.pattern(new RegExp(RegexEnum.NAME))]],
        lastName: [this.user.lastName, [Validators.required, Validators.pattern(new RegExp(RegexEnum.NAME))]],
        documentNumber: [this.user.documentNumber, [Validators.required, Validators.pattern(this.documentRegex)]],
        birthday: [this.defaultBirthday, Validators.required],
        roleId: ['', Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]]
      });

    } else {
      this.form = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.pattern(new RegExp(RegexEnum.NAME))]],
        lastName: ['', [Validators.required, Validators.pattern(new RegExp(RegexEnum.NAME))]],
        documentNumber: ['', [Validators.required, Validators.pattern(this.documentRegex)]],
        birthday: ['', Validators.required],
        roleId: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(new RegExp(RegexEnum.PASSWORD))]],
        confirmPassword: ['', Validators.required]
      }, {
        validator: MustMatch('password', 'confirmPassword')
      });
    }
  }

  private getInitialData(): void {
    const birthdayRange = this.utilService.getBirthdayRange();
    this.minBirthday = birthdayRange.minDate;
    this.maxBirthday = birthdayRange.maxDate;
    this.defaultBirthday = birthdayRange.maxDate;
    this.birthdayYearRange = `${birthdayRange.minDate.getFullYear()}:${birthdayRange.maxDate.getFullYear()}`;

    const registrationType = this.router.url.split('/')[2];

    switch (registrationType) {
      case 'usuario':
        this.selectRole = true;
        break;
      case 'cliente':
        this.roleId = Roles.CUSTOMER;
        break;
      case 'vendedor':
        this.roleId = Roles.STORE_ADMIN;
        break;
      case 'atualizar':
        this.update = true;

        if (this.router.url.split('/')[3] === 'perfil') {
          this.user = JSON.parse(this.storageService.getSessionItem('userProfile'));
          this.defaultBirthday = new Date(this.user.birthday);
          this.roleId = this.user.roleId;

        } else {
          this.user = JSON.parse(this.storageService.getSessionItem('userToUpdate'));
          this.defaultBirthday = new Date(this.user.birthday);
          this.selectRole = true;
        }
        break;
      default:
        this.roleId = Roles.CUSTOMER;
    }
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public onSubmit(): void {
    this.submitted = true;

    if (!this.selectRole) {
      this.f.roleId.setValue(this.roleId);
    }

    if (this.form.invalid) {
      return;
    }

    const user = this.form.value;
    user.birthday = this.utilService.formatDateString(user.birthday);
    user.documentTypeId = DocumentType.CPF;

    if (this.update) {
      this.loader.enable();

      if (this.selectRole) {
        this.userService.updateUser(user, this.user.userId).subscribe(response => {
          this.loader.disable();
          this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
            this.navigateToPage('navegar/dashboard');
          });
        });

      } else {
        this.userService.updateUserProfile(user, this.user.userId).subscribe(response => {
          if (response.success) {
            this.userService.getProfile().subscribe(result => {
              this.storageService.setSessionItem('userProfile', JSON.stringify(result.data));
              this.loader.disable();
              this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
                this.navigateToPage('gerenciar/perfil');
              });

            });
          } else {
            this.loader.disable();
            this.modalService.openSimpleModal('Atenção', response.message, [{text: 'OK'}]);
          }
        });
      }

    } else {
      delete user.confirmPassword;

      this.loader.enable();

      if (this.selectRole) {
        this.userService.createUser(user).subscribe(response => {
          if (response.success) {
            this.loader.disable();
            this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
              this.navigateToPage('navegar/dashboard');
            });

          } else {
            this.loader.disable();
            this.modalService.openSimpleModal('Atenção', response.message, [{text: 'OK'}]);
          }
        });

      } else {
        this.userService.createCustomer(user).subscribe(response => {
          if (response.success) {
            this.loader.disable();
            this.modalService.openSimpleModal('Sucesso', response.message, [{text: 'OK'}]).subscribe(() => {
              this.navigateToPage('navegar/home');
            });

          } else {
            this.loader.disable();
            this.modalService.openSimpleModal('Atenção', response.message, [{text: 'OK'}]);
          }
        });
      }
    }
  }
}
