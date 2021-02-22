import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './core/services/local-storage.service';
import { Roles } from './utils/enums/roles.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    if (!this.localStorageService.getObject('authentication')) {
      const initialState = {
        authenticated: false,
        roleId: Roles.GUEST
      }

      this.localStorageService.setObject('authentication', initialState);
    }
  }
}
