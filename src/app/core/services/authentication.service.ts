import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseApiUrl = `${environment.API_URL}/auth`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }


  public login(email: string, password: string): any {
    const body = {
      email: email,
      password: password
    }

    return this.http.post<any>(`${this.baseApiUrl}/login`, body).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  public checkAuth(): boolean {

    const now = new Date();

    if (this.storageService.getLocalItem('authToken') && this.storageService.getLocalItem('tokenExpiration')) {
      const expiration = new Date(this.storageService.getLocalItem('tokenExpiration'));

      return expiration > now;

    } else {

      return false;
    }
  }

  public logout(): void {
    this.storageService.clearLocal();
    this.storageService.clearSession();
  }
}
