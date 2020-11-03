import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { InputMasks } from 'src/app/shared/utils/input-masks.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public isProfile = true;
  public orderText: string;
  public orderRoute: string;
  public user: any;
  public documentMask = InputMasks.CPF;

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
        break;
      case 'usuario':
        this.user = JSON.parse(this.storageService.getSessionItem('userToUpdate'));
        this.orderRoute = 'gerenciar/usuario/pedidos';
        this.orderText = 'Ver pedidos';
        this.isProfile = false;
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
