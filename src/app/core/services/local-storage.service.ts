import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getObject(key: string): any {

    return JSON.parse(localStorage.getItem(key));
  }

  public setObject(key: string, object: any): void {
    localStorage.setItem(key, JSON.stringify(object));
  }
}
