import { Roles } from "src/app/utils/enums/roles.enum";

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080/api',
  VIA_CEP_URL: 'https://viacep.com.br/ws',

  INITIAL_AUTHENTICATION_STATE: {
    authenticated: false,
    roleId: Roles.GUEST
  },

  DASHBOARD_CARDS: [
    {
      title: 'Lojas',
      metric: 'Lojas ativas',
      class: 'card bg-c-blue order-card',
      icon: 'store',
      roles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN]
    },
    {
      title: 'Pedidos',
      metric: 'Pedidos concluídos',
      class: 'card bg-c-green order-card',
      icon: 'shopping_cart',
      roles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN]
    },
    {
      title: 'Produtos',
      metric: 'Produtos em estoque',
      class: 'card bg-c-yellow order-card',
      icon: 'category',
      roles: [Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN]
    },
    {
      title: 'Usuários',
      metric: 'Lojistas',
      class: 'card bg-c-pink order-card',
      icon: 'people',
      roles: [Roles.SYSTEM_ADMIN]
    },
  ],

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
