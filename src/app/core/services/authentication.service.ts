import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Roles } from 'src/app/utils/enums/roles.enum';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authState = new Subject<any>();
  private baseApiUrl = `${environment.API_URL}/auth`;
  private initialAuthenticationState = { authenticated: false, roleId: Roles.GUEST };

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public getAuthenticationChange(): Observable<any> {

    return this.authState.asObservable();
  }

  public getAuthenticationState(): any {

    return this.localStorageService.getObject('authentication');
  }

  public login(credentials: any): any {
    const body = {
      email: credentials.email,
      password: credentials.password
    }

    return this.http.post<any>(`${this.baseApiUrl}/login`, body).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public logout(): void {
    localStorage.clear();
    sessionStorage.clear();

    this.setInitialAuthenticationState();
  }

  public setAuthenticationState(state: any): void {
    this.localStorageService.setObject('authentication', state);
    this.authState.next(state);
  }

  public setInitialAuthenticationState(): void {
    this.setAuthenticationState(this.initialAuthenticationState);
  }
}
