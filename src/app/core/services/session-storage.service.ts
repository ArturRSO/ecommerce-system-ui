import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public getObject(key: string): any {

    return JSON.parse(sessionStorage.getItem(key));
  }

  public setObject(key: string, object: any): void {
    sessionStorage.setItem(key, JSON.stringify(object));
  }
}
