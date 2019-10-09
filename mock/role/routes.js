// Just a mock data
export const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
]

export const asyncRoutes = [
  {
    path: '/permission',
    component: 'layout',
    redirect: '/permission/page',
    name: 'Permission',
    meta: {
      title: '权限页11',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: 'page',
        name: 'PagePermission',
        meta: {
          title: '页面权限11',
        }
      }, {
        path: 'directive',
        component: 'directive',
        name: 'DirectivePermission',
        meta: {
          title: '指令权限'
        }
      }, {
        path: 'role',
        component: 'role',
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      }
    ]
  }, {
    path: '/icon',
    name: 'Icon',
    component: 'layout',
    redirect: '/icon/index',
    children: [
      {
        path: 'index',
        component: 'icons',
        name: 'Icons',
        meta: {
          title: '图标11',
          icon: 'icon'
        }
      }
    ]
  }
]