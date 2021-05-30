export class RegistrationRequest {

  public id: number;
  public update: boolean;

  constructor(id: number, update: boolean) {
    this.id = id;
    this.update = update;
   }
}
