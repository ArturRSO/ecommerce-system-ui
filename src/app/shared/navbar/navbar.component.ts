import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public authentication: any;
  private authenticationState: Subscription;
  public navbarOpen = false;
  public options = [];
  public searchForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getAuthentication();
    this.checkAuthenticationChange();
    this.setNavbarOptions();
  }

  get f() {
    return this.searchForm.controls;
  }

  public logout(): void {
    this.authService.logout();
    this.navigateToPage('loja/produtos');
  }

  public navbarClick(option: any): void {
    if (option.samePage) {
      this.scrollToElement(option.elementId);

    } else {
      this.navigateToPage(option.route);
    }
  }

  public navigateToPage(route: string): void {
    this.router.navigateByUrl(route);
  }

  public openRegistrationModal(): void {
    const buttons = [{text: 'Comprar'}, {text: 'Vender'}];

    this.modalService.openSimpleModal('Cadastro', 'O que deseja fazer?', buttons).subscribe(response => {
      const registerType = response === 'Comprar' ? 'customer' : 'storeAdmin';

      this.sessionStorageService.setObject('userRegistration', {type: registerType, update: false});
      this.navigateToPage('cadastro/usuario');
    });
  }

  public search(): void {
    // TO DO
    console.log(this.f.searchField.value);
  }

  public toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  private buildForm(): void {
    this.searchForm = this.formBuilder.group({
      searchField: ['']
    });
  }

  private checkAuthenticationChange(): void {
    this.authenticationState = this.authService.getAuthenticationChange().subscribe(state => {
      this.authentication = state;
      this.setNavbarOptions();
    })
  }

  private getAuthentication(): void {
    this.authentication = this.authService.getAuthenticationState();
  }

  private scrollToElement(id: string) {
    const element = document.querySelector(`#${id}`);

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  private setNavbarOptions(): void {
    this.options = environment.NAVBAR_OPTIONS.filter(option => option.allowedRoles.includes(this.authentication.roleId));
  }
}
