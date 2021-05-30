export class UserRegistration {

  public allowedRoles: Array<any>;
  public update: boolean;
  public userId: number;

  constructor(allowedRoles: Array<any>, update: boolean, userId: number) {
    this.allowedRoles = allowedRoles;
    this.update = update;
    this.userId = userId;
  }
}
