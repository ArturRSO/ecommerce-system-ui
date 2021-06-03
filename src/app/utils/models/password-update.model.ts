export class PasswordUpdate {

  public token: string;
  public reset: boolean;

  constructor(token: string, reset: boolean) {
    this.token = token;
    this.reset = reset;
   }
}
