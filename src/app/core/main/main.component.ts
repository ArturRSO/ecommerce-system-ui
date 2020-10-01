import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../services/authentication.service';
import { LoaderService } from '../services/loader.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageService]
})
export class MainComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private loader: LoaderService,
    private storageService: StorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getInfoIfLogged();
  }

  private getInfoIfLogged(): void {
    // Prevent make request in every app reload
    if (!this.storageService.getSessionItem('userProfile')) {
      this.loader.enable();
      if (this.authenticationService.checkAuth()) {
        this.userService.getProfile().subscribe(response => {
          this.storageService.setSessionItem('userProfile', JSON.stringify(response.data));

          this.loader.disable();
        });
      } else {
        this.loader.disable();
      }
    }
  }
}
