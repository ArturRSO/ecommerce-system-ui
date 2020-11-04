export class UserOption {
  name: string;
  elementId: string;
  route: string;
  icon: string;
  samePage: boolean;
  allowedRoles: Array<number>;

  constructor(
    name: string,
    elementId: string,
    route: string,
    icon: string,
    samePage: boolean,
    allowedRoles: Array<number>
  ) {

    this.name = name;
    this.elementId = elementId;
    this.route = route;
    this.icon = icon;
    this.samePage = samePage;
    this.allowedRoles = allowedRoles;
  }
}
