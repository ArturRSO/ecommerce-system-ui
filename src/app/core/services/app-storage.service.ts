import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private values = {};

  constructor() { }

  public clear(): void {
    this.values = {};
  }

  public remove(attr: string | number): void {
    delete this.values[attr];
  }

  public get(attr: string | number): any {
    return this.values[attr];
  }

  public set(attr: string | number, value: any): void {
    this.values[attr] = value;
  }
}
