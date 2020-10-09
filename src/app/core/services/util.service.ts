import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public getBirthdayRange(): any {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 16);

    const birthdayRange = {
      minDate: minDate,
      maxDate: maxDate
    }

    return birthdayRange;
  }

  public formatDateString(date: Date): string {

    return date.toISOString().substring(0, 10);
  }
}
