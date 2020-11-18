import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.scss']
})
export class StoreManagementComponent implements OnInit {

  public cols = [];
  public emptyMessage: string;
  public selectedStore: any;
  public stores = [];
  public isStoreAdmin = true;

  constructor(
    private loader: LoaderService,
    private messageService: MessageService,
    private modalService: ModalService,
    private router: Router,
    private storageService: StorageService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  private getInitialData(): void {
    this.getColumns();
    this.loader.enable();
    switch (this.router.url.split('/')[3]) {
      case 'minhas':
        this.emptyMessage = 'Você ainda não cadastrou nenhuma loja!';
        const userId = JSON.parse(this.storageService.getSessionItem('userProfile')).userId;
        this.storeService.getStoresByUserId(userId).subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.stores = response.data;
          }
        });
        break;
      case 'todas':
        this.emptyMessage = 'Nenhuma loja encontrada!';
        this.isStoreAdmin = false;
        this.storeService.getAllStores().subscribe(response => {
          this.loader.disable();
          if (response.success) {
            this.stores = response.data;

          } else {
            this.showMessage(response.message);
          }
        });
        break;
    }
  }

  private getColumns(): void {
    this.cols = [
      { field: 'name', header: 'Nome' },
      { field: 'documentNumber', header: 'Documento' }
    ];
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

  public navigateToPage(route: string): void {
    this.router.navigateByUrl(route);
  }

  public registerStore(): any {

    this.modalService.openSimpleModal(
      'Cadastro de loja',
      'Vender como pessoa física ou jurídica?',
      [{text: 'Física'}, {text: 'Jurídica'}]).subscribe(response => {

        if (response == 'Física') {
          this.navigateToPage('cadastro/loja/fisica');

        } else {
          this.navigateToPage('cadastro/loja/juridica');
        }
      });
  }

  public selectStore(): void {
    this.storageService.setSessionItem('currentStore', JSON.stringify(this.selectedStore));
    this.navigateToPage('gerenciar/loja');
  }
}
