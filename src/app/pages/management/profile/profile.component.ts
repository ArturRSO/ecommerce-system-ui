import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  private getInitialData(): void {
    this.user = JSON.parse(this.storageService.getSessionItem('userProfile'));
  }

  public changeProfilePicture(): void {
    // TO DO
    console.log('CHANGE PROFILE PIC');
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }
}
