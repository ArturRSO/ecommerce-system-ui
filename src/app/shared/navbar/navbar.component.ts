import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public authentication;
  public navbarOpen = false;
  public options = [];
  public searchForm: FormGroup;
  public userName = 'Teste';

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.checkAuthentication();
    this.setNavbarOptions();
  }

  get f() {
    return this.searchForm.controls;
  }

  public logout(): void {
    // TO DO
    console.log('LOGOUT');
  }

  public navbarClick(option: any): void {
    // TO DO
    console.log(option);
  }

  public navigateToPage(route: string): void {
    // TO DO
    console.log(route);
  }

  public openRegistrationModal(): void {
    // TO DO
    console.log('OPEN REGISTRATION MODAL');
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

  private checkAuthentication(): void {
    this.authentication = this.localStorageService.getObject('authentication');
  }

  private setNavbarOptions(): void {
    this.options = environment.NAVBAR_OPTIONS.filter(option => option.allowedRoles.includes(this.authentication.roleId));
  }
}
