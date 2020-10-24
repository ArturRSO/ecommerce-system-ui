import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public orderText: string;
  public orderRoute: string;
  public updateText = 'Atualizar perfil';
  public updateRoute: string;
  public user: any;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  private getInitialData(): void {
    switch (this.router.url.split('/')[2]) {
      case 'perfil':
        this.user = JSON.parse(this.storageService.getSessionItem('userProfile'));
        this.orderRoute = 'gerenciar/perfil/pedidos';
        this.orderText = 'Meus pedidos';
        this.updateRoute = 'cadastro/atualizar/perfil';
        break;
      case 'usuario':
        this.user = JSON.parse(this.storageService.getSessionItem('userToUpdate'));
        this.orderRoute = 'gerenciar/usuario/pedidos';
        this.orderText = 'Ver pedidos';
        this.updateRoute = 'cadastro/atualizar/usuario';
        break;
    }
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public openWarningModal(): void {
    const buttons = [
      {
        text: 'Não'
      },
      {
        text: 'Sim'
      }
    ]

    // TO DO
    this.modalService.openSimpleModal('Atenção', 'Deseja mesmo desativar a conta?', buttons).subscribe(response => {
      if (response === 'Sim') {
        console.log(response);

      } else {
        console.log(response);
      }
    })
  }
}
