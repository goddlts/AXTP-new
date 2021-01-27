export function traverseRoutes(menus) {
  const routes = menus.map(menu => {
    if (menu.component) {
      const name = menu.component
      if (name === 'layout') {
        menu.component = (resolve) => require(['../layout/index.vue'], resolve)
      } else {
        menu.component = (resolve) => require([`../${name}.vue`], resolve)
      }
    }
    if (menu.children && menu.children.length !== 0) {
      menu.children = traverseRoutes(menu.children)
    }
    return menu
  })
  return routes
}
