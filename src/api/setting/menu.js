import request from '@/utils/request'

// 系统管理-权限管理-权限列表 / 登录获取权限
export const getPermissions = (data) => request({
  url: `/services/app/Permission/GetPermissions`,
  method: 'post',
  data
});

// 系统管理-权限管理-新增/编辑权限
export const createOrEditPermission = (data) => request({
  url: `/services/app/Permission/CreateOrEditPermission`,
  method: 'post',
  data
});

// 系统管理-权限管理-删除权限
export const deletePermission = (data) => request({
  url: `/services/app/Permission/DeletePermission`,
  method: 'delete',
  params: data
});

// 系统管理-权限管理-排序权限
export const changePermissionSort = (data) => request({
  url: `/services/app/Permission/ChangePermissionSort`,
  method: 'post',
  data
});
