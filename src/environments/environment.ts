import { Roles } from 'src/app/shared/utils/roles.enum';
import { UserOption } from 'src/app/shared/utils/user-option.model';

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080/api',
  VIA_CEP_URL: 'https://viacep.com.br/ws',

  USER_OPTIONS: [
    new UserOption('Dashboard', null, 'navegar/dashboard', 'pi pi-table', false, [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN]),
    new UserOption('Perfil', null, 'gerenciar/perfil', 'pi pi-user', false, [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN, Roles.CUSTOMER]),
    new UserOption('Produtos', null, 'navegar/produtos', 'pi pi-list', false, [Roles.CUSTOMER, Roles.GUEST]),
    new UserOption('Carrinho', null, 'navegar/carrinho', 'pi pi-shopping-cart', false, [Roles.CUSTOMER, Roles.GUEST])
  ]
};
