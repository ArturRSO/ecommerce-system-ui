import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { Roles } from '../utils/roles.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public options: any;

  constructor(
    private router: Router,
    private loader: LoaderService,
    private storageService: StorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadOptions();
  }

  private loadOptions(): void {
    if (this.storageService.getSessionItem('userProfile')) {
      this.options = JSON.parse(this.storageService.getSessionItem('userProfile')).options;

    } else {
      this.loader.enable();
      this.userService.getUserOptionsByRole(Roles.CUSTOMER).subscribe(response => {
        this.options = response.data;
        this.loader.disable();
      });
    }
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private scrollToElement(id: string) {
    const element = document.querySelector(`#${id}`);

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  public navClick(option: any) {
    if (option.samePage) {
      this.scrollToElement(option.elementId);

    } else {
      this.navigateToPage(option.route);
    }
  }
}
