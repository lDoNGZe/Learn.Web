import request from "@/utils/request";

// 系统管理-角色管理-添加/修改角色
export const createOrEditRole = data =>
  request({
    url: `/services/app/Role/CreateOrEditRole`,
    method: "post",
    data
  });

// 系统管理-角色管理-批量添加用户角色关联
export const bulkCreateUserRoles = data =>
  request({
    url: `/services/app/Role/BulkCreateUserRoles`,
    method: "post",
    data
  });

// 系统管理-角色管理-删除角色
export const deleteRole = data =>
  request({
    url: `/services/app/Role/DeleteRole`,
    method: "delete",
    params: data
  });

// 系统管理-角色管理-获取角色列表
export const getRoles = data =>
  request({
    url: `/services/app/Role/GetRoles`,
    method: "post",
    data
  });
// 系统管理-角色管理-获取角色列表-自查系统所属中队
export const getRegulatorOrgList = data =>
  request({
    url: `/services/app/Role/GetRegulatorOrgList`,
    method: "post",
    data
  });

// 系统管理-角色管理-获取用户列表(未关联当前角色的用户)
export const getUsersWithoutCurrentRole = query =>
  request({
    url: `/services/app/Role/GetUsersWithoutCurrentRole`,
    method: "get",
    params: query
  });

// 系统管理-角色管理-批量移除用户角色关系
export const bulkDeleteUserRoles = data =>
  request({
    url: `/services/app/Role/BulkDeleteUserRoles`,
    method: "post",
    data
  });

// 系统管理-角色管理-批量创建角色权限关联
export const bulkCreateRolePersmissions = data =>
  request({
    url: `/services/app/Role/BulkCreateRolePersmissions`,
    method: "post",
    data
  });

// 系统管理-角色管理-批量创建角色数据权限关联
export const buldCreateSysrolebind = data =>
  request({
    url: `/services/app/Role/BuldCreateSysrolebind`,
    method: "post",
    data
  });

// 系统管理-角色管理-获取角色关联用户
export const getUsersOfRole = data =>
  request({
    url: `/services/app/Role/PagedUsersByRole`,
    method: "post",
    data
  });

// 系统管理-角色管理-获取角色关联的权限
export const getPermissionsOfRole = query =>
  request({
    url: `/services/app/Role/GetPermissionsOfRole`,
    method: "get",
    params: query
  });

// 系统管理-角色管理-根据角色id获取角色数据权限关联
export const getSysrolebindsByRoleId = query =>
  request({
    url: `/services/app/Role/GetSysrolebindsByRoleId`,
    method: "get",
    params: query
  });

// 系统管理-权限管理-获取数据权限
export const getDataPermissions = data =>
  request({
    url: `/services/app/Permission/PagedDataPermissionsEnterprise`,
    method: "post",
    data
  });

// 系统管理-角色管理-根据角色id获取角色角色区域权限关联
export const GetSysroleDistrictbindByRoleId = query =>
  request({
    url: `/services/app/Role/GetSysroleDistrictbindByRoleId`,
    method: "get",
    params: query
  });

// 系统管理-角色管理-批量创建角色区域权限关联
export const buldCreateSysroleDistrictbind = data =>
  request({
    url: `/services/app/Role/BuldCreateSysroleDistrictbind`,
    method: "post",
    data
  });
// 系统管理-角色管理-批量创建认领企业的角色数据权限关联
export const buldCreateEnterpriseClaimSysrolebind = data =>
  request({
    url: `/services/app/Role/buldCreateEnterpriseClaimSysrolebind`,
    method: "post",
    data
  });
// 系统公用-根据角色ld获取区域树
export const getDistrictTreeByRoleId = query =>
  request({
    url: `/services/app/System/GetDistrictTreeByRoleId`,
    method: "get",
    params: query
  });

//  添加未存在被认领的单位
export const insertEnterpriseClaimList = data =>
  request({
    url: `/services/app/Statistics/InsertEnterpriseClaimList`,
    method: "post",
    data
  });
