import { InputMasks } from "../enums/input-masks.enum";
import { TelephoneType } from "../enums/telephone-type.enum";

export class TelephoneTypeList {

  public personalCellphone = { id: TelephoneType.PERSONAL_CELLPHONE, name: 'Celular pessoal', mask: InputMasks.CELLPHONE };
  public personalTelephone = { id: TelephoneType.PERSONAL_TELEPHONE, name: 'Telefone pessoal', mask: InputMasks.TELEPHONE };
  public commercialCellphone = { id: TelephoneType.COMMERCIAL_CELLPHONE, name: 'Celular comercial', mask: InputMasks.CELLPHONE };
  public commercialTelephone = { id: TelephoneType.COMMERCIAL_TELEPHONE, name: 'Telefone comercial', mask: InputMasks.TELEPHONE };

  public getAllTelephoneTypes(): any {

    return [this.personalCellphone, this.personalTelephone, this.commercialCellphone, this.commercialTelephone];
  }

  public getTelephoneTypeById(id: number) {

    return this.getAllTelephoneTypes().find(type => type.id === id);
  }
}
