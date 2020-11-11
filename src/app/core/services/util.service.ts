import { Injectable } from '@angular/core';
import { Roles } from 'src/app/shared/utils/roles.enum';
import { TelephoneType } from 'src/app/shared/utils/telephone-type.enum';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public formatDateString(date: Date): string {

    return date.toISOString().substring(0, 10);
  }

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

  public getRolesList(): any {

    return [
      {
        id: Roles.SYSTEM_ADMIN,
        name: 'Administrador do sistema'
      },
      {
        id: Roles.STORE_ADMIN,
        name: 'Vendedor'
      },
      {
        id: Roles.CUSTOMER,
        name: 'Cliente'
      }
    ];
  }

  public getTelephoneTypes(): any {

    return [
      {
        id: TelephoneType.CELULAR,
        name: 'Celular'
      },
      {
        id: TelephoneType.TELEFONE_COMERCIAL,
        name: 'Telefone comercial'
      },
      {
        id: TelephoneType.TELEFONE_RESIDENCIAL,
        name: 'Telefone residencial'
      }
    ]
  }
}
