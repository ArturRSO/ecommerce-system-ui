import { Roles } from "src/app/utils/enums/roles.enum";

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080/api',
  VIA_CEP_URL: 'https://viacep.com.br/ws',

  INITIAL_AUTHENTICATION_STATE: {
    authenticated: false,
    roleId: Roles.GUEST
  },

  DASHBOARD_OPTIONS: [
    {
      role: Roles.STORE_ADMIN,
      cards: [
        { title: 'Gerenciar', cols: 1, rows: 1, options: [{name: 'Lojas', route: ''}, {name: 'Produtos', route: ''}] },
        { title: 'Relatórios', cols: 1, rows: 1, options: [{name: 'Faturamento por loja', route: ''}] }
      ]
    },
    {
      role: Roles.SYSTEM_ADMIN,
      cards: [
        { title: 'Gerenciar', cols: 1, rows: 1, options: [{name: 'Usuários', route: ''}, {name: 'Lojas', route: ''}, {name: 'Produtos', route: ''}] },
        { title: 'Relatórios', cols: 1, rows: 1, options: [{name: 'Faturamento mensal', route: ''}] }
      ]
    }
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
