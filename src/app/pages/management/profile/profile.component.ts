import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { InputMasks } from 'src/app/shared/utils/input-masks.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public addresses = [];
  public isProfile = true;
  public orderText: string;
  public orderRoute: string;
  public user: any;
  public documentMask = InputMasks.CPF;

  constructor(
    private addressService: AddressService,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
    this.getProfileAdresses();
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

  private getProfileAdresses(): any {
    this.loader.enable();
    this.addressService.getProfileAddresses(this.user.userId).subscribe(response => {
      this.loader.disable();
      if (response.success) {
        this.addresses = response.data;
      }
    })
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  public openDeletionModal(): void {

    // TO DO
    this.modalService.openSimpleModal('Atenção', 'Deseja mesmo desativar a conta?', [{text: 'Não'}, {text: 'Sim'}]).subscribe(response => {
      if (response === 'Sim') {
        console.log(response);

      } else {
        console.log(response);
      }
    });
  }

  public updateAddress(address: any) {
    // TO DO
    console.log(address);
  }
}
