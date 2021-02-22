import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
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
  public userName = 'Teste';

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
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

  private checkAuthenticationChange(): void {
    this.authenticationState = this.authService.getAuthenticationChange().subscribe(state => {
      this.authentication = state;
    })
  }

  private getAuthentication(): void {
    this.authentication = this.authService.getAuthenticationState();
  }

  private setNavbarOptions(): void {
    this.options = environment.NAVBAR_OPTIONS.filter(option => option.allowedRoles.includes(this.authentication.roleId));
  }
}
