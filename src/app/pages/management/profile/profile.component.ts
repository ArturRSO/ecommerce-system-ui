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
    this.user = JSON.parse(this.storageService.getSessionItem('userProfile'));
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
