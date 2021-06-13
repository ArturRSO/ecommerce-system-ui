import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StoreService } from 'src/app/core/services/store.service';
import { Roles } from 'src/app/utils/enums/roles.enum';

@Component({
  selector: 'app-stores-table',
  templateUrl: './stores-table.component.html',
  styleUrls: ['./stores-table.component.scss']
})
export class StoresTableComponent implements OnInit {

  public columns = ['storeId', 'name', 'documentNumber', 'creationDate'];
  public headers = ['ID', 'Nome', 'Documento', 'Data de cadastro'];
  public stores = [];

  constructor(
    private authService: AuthenticationService,
    private loader: LoaderService,
    private router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  public createStore(): void {
    this.navigateToPage('cadastro/endereco');
  }

  public getStoreClick(store: any): void {
    this.navigateToPage(`gerenciamento/loja?store=${store.storeId}`);
  }

  private getData(): void {
    this.loader.enable();
    if (this.authService.getAuthenticationState().roleId === Roles.SYSTEM_ADMIN) {
      this.storeService.getAllStores().subscribe(response => {
        this.loader.disable();
        this.stores = response.data;
      });
    } else {
      this.storeService.getStoresByUserId(this.authService.getAuthenticationState().userId).subscribe(response => {
        this.loader.disable();
        this.stores = response.data;
      });
    }
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }
}
