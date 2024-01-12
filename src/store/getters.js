const getters = {
  token: state => state.user.token,
  sysuserName: state => state.user.sysuserName,
  roleNames: state => state.user.roleNames,
  approvalStatus: state => state.user.approvalStatus,
  approvalRemark: state => state.user.eprInfo.approvalRemark,
  eprName: state => state.user.eprInfo.eprName,
  eprInfo: state => state.user.eprInfo,
  userType: state => state.user.eprInfo.userType,
  isVoiceRemind: state => state.user.isVoiceRemind,
  permission_routes: state => state.permission.routes,
  isCollapse: state => state.fullscreen.isCollapse,
  buttons: state => state.permission.buttons,
};
export default getters;
