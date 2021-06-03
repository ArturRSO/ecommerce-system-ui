import { TelephoneType } from "../enums/telephone-type.enum";

export class TelephoneTypeList {

  public personalCellphone = { id: TelephoneType.PERSONAL_CELLPHONE, name: 'Celular pessoal' };
  public personalTelephone = { id: TelephoneType.PERSONAL_TELEPHONE, name: 'Telefone pessoal' };
  public commercialCellphone = { id: TelephoneType.COMMERCIAL_CELLPHONE, name: 'Celular comercial' };
  public commercialTelephone = { id: TelephoneType.COMMERCIAL_TELEPHONE, name: 'Telefone comercial' };

  public getAllTelephoneTypes(): any {

    return [this.personalCellphone, this.personalTelephone, this.commercialCellphone, this.commercialTelephone];
  }
}
