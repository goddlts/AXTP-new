const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  profile: state => state.user.profile,
  avatar: state => state.user.profile?.avatar,
  username: state => state.user.profile?.username,
  realname: state => state.user.profile?.realname,
  role: state => state.user.profile?.RoleId,
  permission_routes: state => state.permission.routes
}
export default getters
