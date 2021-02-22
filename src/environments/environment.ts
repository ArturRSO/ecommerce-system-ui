import { Roles } from "src/app/utils/enums/roles.enum";

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080/api',
  VIA_CEP_URL: 'https://viacep.com.br/ws',

  NAVBAR_OPTIONS: [
    {
      name: 'Dashboard',
      elementId: null,
      route: '',
      icon: 'dashboard',
      samePage: false,
      allowedRoles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN]
    },
    {
      name: 'Perfil',
      elementId: null,
      route: '',
      icon: 'account_box',
      samePage: false,
      allowedRoles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN, Roles.CUSTOMER]
    },
    {
      name: 'Produtos',
      elementId: null,
      route: '',
      icon: 'category',
      samePage: false,
      allowedRoles: [Roles.CUSTOMER, Roles.GUEST]
    },
    {
      name: 'Carrinho',
      elementId: null,
      route: '',
      icon: 'shopping_cart',
      samePage: false,
      allowedRoles: [Roles.CUSTOMER, Roles.GUEST]
    }
  ]
};
