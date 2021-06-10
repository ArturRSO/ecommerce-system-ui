export class AuthenticationState {

  public authenticated: boolean;
  public token: string;
  public tokenExpiration: string;
  public roleId: number;
  public userId: number;

  constructor(
    authenticated: boolean,
    token: string,
    tokenExpiration: string,
    roleId: number,
    userId: number
  ) {
    this.authenticated = authenticated;
    this.token = token;
    this.tokenExpiration = tokenExpiration;
    this.roleId = roleId;
    this.userId = userId;
  }
}
