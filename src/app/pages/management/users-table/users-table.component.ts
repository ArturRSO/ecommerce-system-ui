import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { RolesList } from 'src/app/utils/lists/roles.list';
import { UserRegistration } from 'src/app/utils/models/user-registration.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  public columns = ['userId', 'firstName', 'lastName', 'email', 'documentNumber'];
  public headers = ['ID', 'Nome', 'Sobrenome', 'E-mail', 'Documento'];
  public users = [];

  public form: FormGroup;
  public roles = [];
  public submitted = false;
  public validationMessages: any;

  constructor(
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private router: Router,
    private userService: UserService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getData();
    this.setValidationMessages();
  }

  get f() {
    return this.form.controls;
  }

  public createUser(): void {
    this.sessionStorageService.setObject('userRegistration', new UserRegistration(this.roles, false, null));
    this.navigateToPage('cadastro/usuario');
  }

  public getUserClick(user: any) {
    this.navigateToPage(`cadastro/perfil?user=${user.userId}`);
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loader.enable();
    if (this.f.roleId.value === 0) {
      this.getAllUsers();

    } else {
      this.userService.getUsersByRoleId(this.f.roleId.value).subscribe(response => {
        this.users = response.data;
        this.loader.disable();
      });
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      roleId: ['', [Validators.required]]
    });
  }

  private getAllUsers(): void {
    this.userService.getAllUsers().subscribe(response => {
      this.users = response.data;

      this.loader.disable();
    });
  }

  private getData(): void {
    this.loader.enable();

    this.getAllUsers();

    this.roles = new RolesList().allRoles;
    this.roles.push({ id: 0, name: 'Todos' });
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      roleId: [
        { type: 'required', message: 'Selecione o tipo de usuário' }
      ]
    }
  }
}
