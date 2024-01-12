import request from '@/utils/request'

// 系统管理-用户管理-新增/编辑用户
export const createOrEditUser = (data) => request({
  url: `/services/app/User/CreateOrEditUser`,
  method: 'post',
  data
});

// 系统管理-用户管理-删除用户(物理删除)
export const localDeleteUser = (data) => request({
  url: `/services/app/User/BulkDeleteUser`,
  method: 'post',
  data
});

// 系统管理-用户管理-分页获取用户列表
export const getPagedUser = (data) => request({
  url: `/services/app/User/PagedUser`,
  method: 'post',
  data
});

// 系统管理-用户管理-获取用户详情
export const getUserDetail = (query) => request({
  url: `/services/app/User/GetUserDetail`,
  method: 'get',
  params: query
});

// 系统管理-用户管理-添加/修改用户分组
export const createOrEditSysuserGroup = (data) => request({
  url: `/services/app/User/CreateOrEditSysuserGroup`,
  method: 'post',
  data
});

// 系统管理-用户管理-删除用户分组
export const deleteSysuserGroup = (data) => request({
  url: `/services/app/User/DeleteSysuserGroup`,
  method: 'delete',
  params: data
});

// 系统管理-用户管理-获取用户分组列表
export const getSysuserGroups = (data) => request({
  url: `/services/app/User/GetSysuserGroups`,
  method: 'post',
  data
});

// 系统管理-个人中心-修改消息声音提醒状态
export const editVoiceRemind = (data) => request({
  url: `/services/app/User/EditVoiceRemind`,
  method: 'post',
  data
});

// 系统管理-用户管理-添加用户-获取单位列表(监测单位)
export const getMonitorEnterprise = (query) => request({
  url: `/services/app/User/GetMonitorEnterprise`,
  method: 'get',
  params: query
});

// 系统管理-用户管理-修改用户状态
export const changeActiveState = (data) => request({
  url: '/services/app/User/ChangeActiveState',
  method: 'put',
  data
});

// 系统管理-用户管理-添加用户-获取单位列表(监测单位)
export const getDistrictWithAllEprTree = (data) => request({
  url: `/services/app/System/GetDistrictWithAllEprTree`,
  method: 'post',
  data
});

// 系统公用-根据单位类型获取单位信息
export const getEnterpriseByEprType = (data) => request({
  url: `/services/app/System/GetEnterpriseByEprType`,
  method: 'post',
  data
});
