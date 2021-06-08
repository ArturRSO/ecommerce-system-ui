import { Roles } from "src/app/utils/enums/roles.enum";

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080/api',
  VIA_CEP_URL: 'https://viacep.com.br/ws',

  INITIAL_AUTHENTICATION_STATE: {
    authenticated: false,
    roleId: Roles.GUEST
  },

  NAVBAR_OPTIONS: [
    {
      name: 'Dashboard',
      elementId: null,
      route: 'gerenciamento/dashboard',
      icon: 'dashboard',
      samePage: false,
      allowedRoles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN]
    },
    {
      name: 'Perfil',
      elementId: null,
      route: 'cadastro/perfil',
      icon: 'account_box',
      samePage: false,
      allowedRoles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN, Roles.CUSTOMER]
    },
    {
      name: 'Carrinho',
      elementId: null,
      route: 'loja/carrinho',
      icon: 'shopping_cart',
      samePage: false,
      allowedRoles: [Roles.CUSTOMER, Roles.GUEST]
    }
  ]
};
