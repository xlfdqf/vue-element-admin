// import { asyncRoutes, constantRoutes } from '@/router'
import { asyncRoutes as serverRouterMap } from '../../../mock/role/routes'
import { constantRoutes, routerMap } from '@/router'
//假设为后端返回数据
// const serverRouterMap = [
//   {
//     path: '/permission',
//     component: 'layout',
//     redirect: '/permission/page',
//     name: 'Permission',
//     meta: {
//       title: '权限页11',
//       icon: 'lock',
//       roles: ['admin', 'editor']
//     },
//     children: [
//       {
//         path: 'page',
//         component: 'page',
//         name: 'PagePermission',
//         meta: {
//           title: '页面权限11',
//         }
//       }, {
//         path: 'directive',
//         component: 'directive',
//         name: 'DirectivePermission',
//         meta: {
//           title: '指令权限'
//         }
//       }, {
//         path: 'role',
//         component: 'role',
//         name: 'RolePermission',
//         meta: {
//           title: '角色权限',
//           roles: ['admin']
//         }
//       }
//     ]
//   }, {
//     path: '/icon',
//     name: 'Icon',
//     component: 'layout',
//     redirect: '/icon/index',
//     children: [
//       {
//         path: 'index',
//         component: 'icons',
//         name: 'Icons',
//         meta: {
//           title: '图标11',
//           icon: 'icon'
//         }
//       }
//     ]
//   }
// ]
// 将本地routerMap映射到ajax获取到的serverRouterMap;
function generateAsyncRouter(routerMap, serverRouterMap) {
  serverRouterMap.forEach(function (item, index) {
    item.component = routerMap[item.component]
    if (item.children && item.children.length > 0) {
      generateAsyncRouter(routerMap, item.children)
    }
  })
  return serverRouterMap;
}

/**
 * Use meta.role 以确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    console.log("routes:", state.routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      let asyncRouterMap = generateAsyncRouter(routerMap, serverRouterMap);
      if (roles.includes('admin')) {
        accessedRoutes = asyncRouterMap
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
