import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { StoreService } from 'src/app/core/services/store.service';
import { ProductSearchType } from 'src/app/utils/enums/product-search-type.enum';
import { Roles } from 'src/app/utils/enums/roles.enum';
import { RolesList } from 'src/app/utils/lists/roles.list';
import { UserRegistration } from 'src/app/utils/models/user-registration.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public authentication: any;
  public navbarOpen = false;
  public options = [];
  public productsDropdownOpen = false;
  public productSubtypes = [];
  public productTypes = [];
  public searchForm: FormGroup;
  public storesDropdownOpen = false;
  public stores = [];

  private authenticationState: Subscription;
  private navbarOptions = [
    {
      name: 'Dashboard',
      elementId: null,
      route: 'gerenciamento/dashboard',
      icon: 'dashboard',
      samePage: false,
      allowedRoles: [Roles.SYSTEM_ADMIN]
    },
    {
      name: 'Perfil',
      elementId: null,
      route: 'cadastro/perfil',
      icon: 'account_box',
      samePage: false,
      allowedRoles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN, Roles.CUSTOMER]
    },
    {
      name: 'Carrinho',
      elementId: null,
      route: 'loja/carrinho',
      icon: 'shopping_cart',
      samePage: false,
      allowedRoles: [Roles.CUSTOMER, Roles.GUEST]
    }
  ];

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private productService: ProductService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private storeService: StoreService
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

  public getProductsBySubtype(subtype: any): void {
    const searchRequest = {
      searchType: ProductSearchType.SUBTYPE_ID,
      data: subtype
    }

    this.productService.setSearchRequest(searchRequest);
    this.navigateToPage('/loja/produtos');
  }

  public goToHomepage(): void {
    if (this.authentication.roleId === 3 || !this.authentication.authenticated) {
      this.navigateToPage('loja/produtos');
    }
  }

  public goToStoreDashboard(storeId: number): void {
    this.navigateToPage(`gerenciamento/dashboard?store=${storeId}`);
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
    const buttons = [{ text: 'Comprar' }, { text: 'Vender' }];

    this.modalService.openSimpleModal('Cadastro', 'O que deseja fazer?', buttons).subscribe(response => {
      const roles = new RolesList();
      const role = roles.getRoleByAction(response);

      this.sessionStorageService.setObject('userRegistration', new UserRegistration([role], false, null));
      this.navigateToPage('cadastro/usuario');
    });
  }

  public searchByName(): void {
    const searchRequest = {
      searchType: ProductSearchType.NAME,
      data: this.f.searchField.value
    }

    this.productService.setSearchRequest(searchRequest);
    this.navigateToPage('loja/produtos');
  }

  public searchByQuantity(): void {
    const searchRequest = {
      searchType: ProductSearchType.QUANTITY,
      data: 1
    }

    this.productService.setSearchRequest(searchRequest);
    this.navigateToPage('loja/produtos');
  }

  public toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  public toggleProductsDropdown(): void {
    this.productsDropdownOpen = !this.productsDropdownOpen;

    this.getProductTypes();
  }

  public toggleStoresDropdown(): void {
    this.storesDropdownOpen = !this.storesDropdownOpen;

    this.getStores();
  }

  public showProductTypeSubmenu(productTypeId: number): void {
    this.getSubtypesByProductTypeId(productTypeId);
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

  private getProductTypes(): void {
    this.loader.enable();
    this.productService.getProductTypes().subscribe(response => {
      this.loader.disable();
      this.productTypes = response.data;
    });
  }

  private getStores(): void {
    this.loader.enable();
    this.storeService.getStoresByUserId(this.authentication.userId).subscribe(response => {
      this.loader.disable();
      this.stores = response.data;
    });
  }

  private getSubtypesByProductTypeId(productId: number): void {
    this.loader.enable();
    this.productService.getProductSubtypesByTypeId(productId).subscribe(response => {
      this.loader.disable();
      this.productSubtypes = response.data;
    });
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
    this.options = this.navbarOptions.filter(option => option.allowedRoles.includes(this.authentication.roleId));
  }
}
