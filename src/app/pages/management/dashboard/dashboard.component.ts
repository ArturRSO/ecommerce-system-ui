import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public gridCols = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return 1;
      }

      return 2;
    })
  );

  public option: any;

  constructor(
    private authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.loadCards();
  }

  public navigateToPage(route: string) {
    // TO DO
    console.log(route);
  }

  private loadCards(): void {
    const authentication = this.authService.getAuthenticationState();

    this.option = environment.DASHBOARD_OPTIONS.find(option => option.role === authentication.roleId);
  }
}
