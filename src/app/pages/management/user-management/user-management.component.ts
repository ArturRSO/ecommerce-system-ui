import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserService } from 'src/app/core/services/user.service';
import { Roles } from 'src/app/shared/utils/roles.enum';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public users = [];
  public cols = [];

  constructor(
    private loader: LoaderService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  private getInitialData() {
    this.getColumns();

    this.loader.enable();
    switch (this.router.url.split('/')[3]) {
      case 'administradores':
        this.getUsersByRoleId(Roles.SYSTEM_ADMIN);
        break;
      case 'clientes':
        this.getUsersByRoleId(Roles.CUSTOMER);
        break;
      case 'lojistas':
        this.getUsersByRoleId(Roles.STORE_ADMIN);
        break;
      case 'todos':
        this.userService.getAllUsers().subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.users = response.data;

          } else {
            this.showMessage(response.message);
          }
        });
    }
  }

  private getColumns(): void {
    this.cols = [
      { field: 'userId', header: 'Id' },
      { field: 'firstName', header: 'Nome' },
      { field: 'lastName', header: 'Sobrenome' },
      { field: 'email', header: 'Email' },
      { field: 'documentNumber', header: 'CPF' },
      { field: 'birthday', header: 'Aniversário' },
      { field: 'creationDate', header: 'Data de criação'}
    ]
  }

  private getUsersByRoleId(roleId: number): void {
    this.userService.getUsersByRoleId(roleId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.users = response.data;

      } else {
        this.showMessage(response.message);
      }
    });
  }

  private showMessage(message: string): void {
    const msgConfig = {
      severity: 'error',
      summary: 'Erro',
      detail: message
    }

    this.messageService.clear();
    this.messageService.add(msgConfig);
  }
}
