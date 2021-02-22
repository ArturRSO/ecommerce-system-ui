import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseApiUrl = `${environment.API_URL}/users`;

  constructor(
    private http: HttpClient
  ) { }

  public getProfile(): any {

    return this.http.get<any>(`${this.baseApiUrl}/profile`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }
}
