import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseApiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }


  public login(email: string, password: string): any {
    const body = {
      email: email,
      password: password
    }

    return this.http.post<any>(`${this.baseApiUrl}/auth/login`, body).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
