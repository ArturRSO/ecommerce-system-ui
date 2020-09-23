import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public clearLocal(): void {

    localStorage.clear();
  }

  public getLocalKeyByIndex(index: number): string {

    return localStorage.key(index);
  }

  public getLocalLength(): number {

    return localStorage.length;
  }

  public getLocalItem(key: string): string {

    return localStorage.getItem(key);
  }

  public removeLocalItem(key: string): void {

    return localStorage.removeItem(key);
  }

  public setLocalItem(key: string, value: string): void {

    localStorage.setItem(key, value);
  }

  public clearSession(): void {

    sessionStorage.clear();
  }

  public getSessionKeyByIndex(index: number): string {

    return sessionStorage.key(index);
  }

  public getSessionLength(): number {

    return sessionStorage.length;
  }

  public getSessionItem(key: string): string {

    return sessionStorage.getItem(key);
  }

  public removeSessionItem(key: string): void {

    return sessionStorage.removeItem(key);
  }

  public setSessionItem(key: string, value: string): void {

    return sessionStorage.setItem(key, value);
  }
}
