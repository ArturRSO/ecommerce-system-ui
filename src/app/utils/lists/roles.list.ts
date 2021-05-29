import { Roles } from "../enums/roles.enum";

export class RolesList {

  public systemAdmin = { id: Roles.SYSTEM_ADMIN, name: 'Admin' };
  public storeAdmin = { id: Roles.STORE_ADMIN, name: 'Lojista' };
  public customer = { id: Roles.CUSTOMER, name: 'Comprador' };
  public allRoles = [this.systemAdmin, this.storeAdmin, this.customer];

  public getRoleByAction(action: string): any {

    switch(action) {
      case 'Comprar':
        return this.customer;

      case 'Vender':
        return this.storeAdmin;

      default:
        return this.customer;
    }
  }

  public getRoleById(roleId: number): any {

    return this.allRoles.filter(role => role.id === roleId);
  }
}
