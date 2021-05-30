import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public cards: any;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loadCards();
  }

  public dashboardClick(card: any) {
    // TO DO
    console.log(card);
  }

  public navigateToPage(route: string) {
    // TO DO
    console.log(route);
  }

  private loadCards(): void {
    const authentication = this.authService.getAuthenticationState();

    this.cards = environment.DASHBOARD_CARDS.filter(option => option.roles.includes(authentication.roleId));
  }
}
