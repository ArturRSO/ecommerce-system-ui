import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { Roles } from '../utils/roles.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public authenticated: boolean;
  public options: any;
  public searchForm: FormGroup;
  public userName: string;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private storageService: StorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadOptions();
    this.buildForm();
    this.checkAuthentication();
  }

  get f() {
    return this.searchForm.controls;
  }

  private buildForm(): void {
    this.searchForm = this.formBuilder.group({
      searchField: ['']
    });
  }

  private checkAuthentication(): void {
    this.authenticated = this.authenticationService.checkAuth();
  }

  private loadOptions(): void {
    if (this.storageService.getSessionItem('userProfile')) {
      this.options = JSON.parse(this.storageService.getSessionItem('userProfile')).options;
      this.userName = JSON.parse(this.storageService.getSessionItem('userProfile')).firstName;

    } else {
      this.loader.enable();
      this.userService.getUserOptionsByRole(Roles.CUSTOMER).subscribe(response => {
        this.options = response.data;
        this.loader.disable();
      });
    }
  }

  private scrollToElement(id: string) {
    const element = document.querySelector(`#${id}`);

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  public logout(): void {
    this.authenticationService.logout();
    this.checkAuthentication();
    this.navigateToPage('navegar/home');
  }

  public navClick(option: any) {
    if (option.samePage) {
      this.scrollToElement(option.elementId);

    } else {
      this.navigateToPage(option.route);
    }
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public register(): void {
    const buttons = [
      {
        text: 'Comprar'
      },
      {
        text: 'Vender'
      }
    ];

    this.modalService.openSimpleModal('Cadastro', 'O que você quer fazer?', buttons).subscribe(value => {
      if (value === 'Comprar') {
        this.navigateToPage('cadastro/cliente');

      } else if (value === 'Vender') {
        this.navigateToPage('cadastro/vendedor');
      }
    });
  }

  public search() {
    // TO DO

    console.log(this.f.searchField.value);
  }
}
