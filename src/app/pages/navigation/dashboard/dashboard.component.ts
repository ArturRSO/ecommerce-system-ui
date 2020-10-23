import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public showMenu = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }
}
