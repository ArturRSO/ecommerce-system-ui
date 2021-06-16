export class RegistrationRequest {

  public id: number;
  public update: boolean;
  public additionalInfo: any;

  constructor(id: number, update: boolean, additionalInfo: any) {
    this.id = id;
    this.update = update;
    this.additionalInfo = additionalInfo;
   }
}
