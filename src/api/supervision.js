import request from '@/utils/request'

// 监督管理-档案管理-获取企业信息
export const getPagedEnterprises = (data) => request({
  url: `/services/app/Enterprise/PagedEnterprises`,
  method: 'post',
  data
});

// 监督管理-档案管理-获取企业信息详情
export const getEnterpriseDetail = (query) => request({
  url: `/services/app/Enterprise/GetEnterpriseDetail`,
  method: 'get',
  params: query
});

// 监督管理-档案管理-删除企业信息
export const deleteEnterprise = (data) => request({
  url: `/services/app/Enterprise/DeleteEnterprise`,
  method: 'delete',
  params: data
});


// 监督管理-档案管理-添加/修改企业信息
export const createOrEditEnterprise = (data) => request({
  url: `/services/app/Enterprise/CreateOrEditEnterprise`,
  method: 'post',
  data
});

// 系统管理-用户管理-账号管理-获取注册审批列表
export const getPagedRegisterApprovals = (data) => request({
  url: `/services/app/Account/PagedRegisterApprovals`,
  method: 'post',
  data
});

// 系统管理-用户管理-账号管理-注册审核信息详情
export const getRegisterApprovalDetail = (query) => request({
  url: '/services/app/Account/GetRegisterApprovalDetail',
  method: 'get',
  params: query
});

// 系统管理-用户管理-账号管理-审批注册信息
export const approvalRegister = (data) => request({
  url: '/services/app/Account/ApprovalRegister',
  method: 'put',
  data
});


// 职业卫生执法-企业端-系统管理-基础配置-添加/编辑岗位工种
export const createOrEditTypeOfWork = (data) => request({
  url: 'services/app/Enterprise/CreateOrEditTypeOfWork',
  method: 'post',
  data
});


// 职业卫生执法-企业端-系统管理-基础配置-获取岗位工种列表
export const getPagedTypeOfWorks = (data) => request({
  url: '/services/app/Enterprise/PagedTypeOfWorks',
  method: 'post',
  data
});

// 职业卫生执法-企业端-系统管理-基础配置-删除岗位工种
export const deleteTypeOfWork = (data) => request({
  url: '/services/app/Enterprise/DeleteTypeOfWork',
  method: 'delete',
  params: data
});

// 职业卫生执法-企业端-系统管理-基础配置-批量删除岗位工种
export const bulkDeleteTypeOfWorks = (data) => request({
  url: '/services/app/Enterprise/BulkDeleteTypeOfWorks',
  method: 'post',
  data
});


// 职业卫生执法-企业端-系统管理-基础配置-添加/编辑部门车间
export const createOrEditDepartment = (data) => request({
  url: 'services/app/Enterprise/CreateOrEditDepartment',
  method: 'post',
  data
});

// 职业卫生执法-企业端-系统管理-基础配置-获取部门/车间列表（树形结构）
export const getPagedDepartmentTree = (data) => request({
  url: '/services/app/Enterprise/PagedDepartmentTree',
  method: 'post',
  data
});


// 职业卫生执法-企业端-系统管理-基础配置-删除部门车间
export const deleteDepartment = (data) => request({
  url: '/services/app/Enterprise/DeleteDepartment',
  method: 'delete',
  params: data
});

// 职业卫生执法-企业端-系统管理-基础配置-批量删除部门车间
export const bulkDeleteDepartmentsAsync = (data) => request({
  url: '/services/app/Enterprise/BulkDeleteDepartments',
  method: 'post',
  data
})

// 职业健康-分类分级-获取用人单位落实职业病防治责任自查表 (添加)
export const getInspectionTable = (data) => request({
  url: '/services/app/Classification/GetInspectionTable',
  method: 'post',
  data
})

// 职业健康-分类分级-添加职业病预防责任自查表
export const createOrEditInspectionReportRecord = (data) => request({
  url: '/services/app/Classification/CreateOrEditInspectionReportRecord',
  method: 'post',
  data
})

// 职业健康-分类分级-获取自查结果（包括得分，等级）
export const getInspectionResult = (data) => request({
  url: '/services/app/Classification/GetInspectionResult',
  method: 'post',
  data
})

// 企业端-档案管理-劳动者管理-添加/编辑劳动者信息（同时生成劳动者账号）
export const createOrEditUserWorkerEx = (data) => request({
  url: '/services/app/Archives/CreateOrEditUserWorkerEx',
  method: 'post',
  data
})

// 档案管理-劳动者管理-分页获取劳动者列表
export const getPagedUserWorkerEx = (data) => request({
  url: '/services/app/Archives/PagedUserWorkerEx',
  method: 'post',
  data
})

// 企业端-档案管理-劳动者管理-批量删除劳动者信息(逻辑删除)
export const bulkDeleteUserWorkerEx = (data) => request({
  url: '/services/app/Archives/BulkDeleteUserWorkerEx',
  method: 'post',
  data
})

// 档案管理-劳动者管理-获取劳动者详情
export const getUserWorkerExDetail = (query) => request({
  url: '/services/app/Archives/GetUserWorkerExDetail',
  method: 'get',
  params: query
})

// 企业端-档案管理-职业病防护管理-添加/编辑职业病防护设施用品
export const createOrEditODProtection = (data) => request({
  url: '/services/app/Archives/CreateOrEditODProtection',
  method: 'post',
  data
})

// 企业端-档案管理-职业病防护管理-批量删除职业病防护设施用品
export const bulkDeleteODProtection = (data) => request({
  url: '/services/app/Archives/BulkDeleteODProtection',
  method: 'post',
  data
})

// 档案管理-职业病防护管理-获取职业病防护设施用品详情
export const getODProtectionDetail = (query) => request({
  url: '/services/app/Archives/GetODProtectionDetail',
  method: 'get',
  params: query
})

// 档案管理-职业病防护管理-分页获取职业病防护设施用品列表
export const getPagedODProtection = (data) => request({
  url: '/services/app/Archives/PagedODProtection',
  method: 'post',
  data
})

// 企业端-档案管理-职业病防护管理-分页获取化学原辅料
export const getPagedChemicalMaterial = (data) => request({
  url: '/services/app/Archives/PagedChemicalMaterial',
  method: 'post',
  data
})

// 企业端-档案管理-职业病防护管理-添加/编辑化学原辅料
export const createOrEditChemicalMaterial = (data) => request({
  url: '/services/app/Archives/CreateOrEditChemicalMaterial',
  method: 'post',
  data
})

// 企业端-档案管理-职业病防护管理-批量删除化学原辅料
export const bulkDeleteChemicalMaterialsync = (data) => request({
  url: '/services/app/Archives/BulkDeleteChemicalMaterial',
  method: 'post',
  data
})

// 企业端-档案管理-职业病防护管理-获取化学原辅料详情
export const getChemicalMaterialDetail = (query) => request({
  url: '/services/app/Archives/GetChemicalMaterialDetail',
  method: 'get',
  params: query
})

// 企业端-档案管理-职业卫生培训管理-添加/编辑劳动者培训信息
export const createOrEditWorkerTrain = (data) => request({
  url: '/services/app/Archives/CreateOrEditWorkerTrain',
  method: 'post',
  data
})

// 企业端-档案管理-职业卫生培训管理-批量删除劳动者培训信息
export const bulkDeleteWorkerTrain = (data) => request({
  url: '/services/app/Archives/BulkDeleteWorkerTrain',
  method: 'post',
  data
})

// 企业端-档案管理-职业卫生培训管理-分页获取劳动者培训信息
export const getPagedWorkerTrain = (data) => request({
  url: '/services/app/Archives/PagedWorkerTrain',
  method: 'post',
  data
})

// 档案管理-职业卫生培训管理-获取劳动者培训信息详情
export const getWorkerTrainDetail = (query) => request({
  url: '/services/app/Archives/GetWorkerTrainDetail',
  method: 'get',
  params: query
})

// 企业端-档案管理-职业卫生培训管理-添加/编辑负责人培训信息
export const createOrEditPrincipalTrain = (data) => request({
  url: '/services/app/Archives/CreateOrEditPrincipalTrain',
  method: 'post',
  data
})

// 企业端-档案管理-职业卫生培训管理-批量删除负责人培训信息
export const bulkDeletePrincipalTrain = (data) => request({
  url: '/services/app/Archives/BulkDeletePrincipalTrain',
  method: 'post',
  data
})

// 企业端-档案管理-职业卫生培训管理-分页获取负责人培训信息
export const getPagedPrincipalTrain = (data) => request({
  url: '/services/app/Archives/PagedPrincipalTrain',
  method: 'post',
  data
})

// 档案管理-职业卫生培训管理-获取负责人培训信息详情
export const getPrincipalTrainDetail = (query) => request({
  url: '/services/app/Archives/GetPrincipalTrainDetail',
  method: 'get',
  params: query
})

// 职业健康-添加/修改用人单位信息
export const CreateOrEditEmployingEnterprise = (data) => request({
  url: '/services/app/Enterprise/CreateOrEditEmployingEnterprise',
  method: 'post',
  data
})

// 职业健康-用人单位详情
export const GetEmployingEnterpriseDetail = (query) => request({
  url: '/services/app/Enterprise/GetEmployingEnterpriseDetail',
  method: 'get',
  params: query
})

// 职业卫生-变更经营状态
export const EditEnterpriseBusinessStatus = (data) => request({
  url: '/services/app/Enterprise/EditEnterpriseBusinessStatus',
  method: 'post',
  data
})

// 注册/一企一档-是否存在相同的信用代码及单位列表
export const GetIsCorpCodeExist = (data) => request({
  url: '/services/app/Enterprise/GetIsCorpCodeExist',
  method: 'post',
  data
})

export const GetOHEnterpriseConditions = (params) => request({
  url: '/services/app/Questionnaire/GetCockpitMapOverview',
  method: 'get',
  params
})
