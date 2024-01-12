import request from '@/utils/request'

// 系统管理-监管端组织架构-批量删除组织架构
export const BatchDeleteRegulatorOrg = (data) => request({
  url: `/services/app/RegulatorOrg/BatchDeleteRegulatorOrg`,
  method: 'post',
  data
});

// 系统管理-监管端组织架构-添加/修改组织架构
export const CreateOrEditRegulatorOrg = (data) => request({
  url: `/services/app/RegulatorOrg/CreateOrEditRegulatorOrg`,
  method: 'post',
  data
});

// 系统管理-监管端组织架构-获取组织架构详情
export const GetRegulatorOrgDetail = (query) => request({
  url: `/services/app/RegulatorOrg/GetRegulatorOrgDetail`,
  method: 'get',
  params: query
});

// 系统管理-监管端组织架构-分页获取组织架构树结构
export const PagedRegulatorOrgTree = (data) => request({
  url: `/services/app/RegulatorOrg/PagedRegulatorOrgTree`,
  method: 'post',
  data
});

// 系统管理-监管端组织架构-获取组织架构树结构
export const ListRegulatorOrgTree = (data) => request({
  url: `/services/app/RegulatorOrg/ListRegulatorOrgTree`,
  method: 'post',
  data
});

// 系统管理-监管端组织架构-换部门接口
export const ChangeUserRegulatorOrg = (data) => request({
  url: `/services/app/RegulatorOrg/ChangeUserRegulatorOrg`,
  method: 'post',
  data
});

// 系统管理-用户管理-部门-获取部门绑定的数据权限
export const GetSysorgbindByRegulatorOrgId = (data) => request({
  url: `/services/app/RegulatorOrg/GetSysorgbindByRegulatorOrgId`,
  method: 'post',
  data
});

