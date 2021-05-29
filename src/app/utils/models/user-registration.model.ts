export class UserRegistration {

  constructor(allowedRoles: Array<any>, update: boolean, userId: number) {
    this.allowedRoles = allowedRoles;
    this.update = update;
    this.userId = userId;
  }

  public allowedRoles: Array<any>;
  public update: boolean;
  public userId: number;
}
