import request from "@/utils/request";

// 获取所属街道接口
export const getStreetLevels = query =>
  request({
    url: `/services/app/System/GetDistrictTree`,
    method: "get",
    params: query
  });

// 获取所属行业接口
export const getDistrictLevels = query =>
  request({
    url: `/services/app/System/GetIndustryTree`,
    method: "get",
    params: query
  });

// 获取主要职业病危害因素接口
export const getDictionaryItems = data =>
  request({
    url: `/services/app/Dictionary/GetCacheDictionaryItems`,
    method: "post",
    data
  });

// 系统公用-获取企业所属部门
export const getDepartmentTree = query =>
  request({
    url: `/services/app/System/GetDepartmentTree`,
    method: "get",
    params: query
  });

// 系统公用-获取企业所属岗位工种
export const getTypeOfWorkKeyValue = query =>
  request({
    url: `/services/app/System/GetTypeOfWorkKeyValue`,
    method: "get",
    params: query
  });

export const getDistrictWithEprTree = query =>
  request({
    url: `/services/app/System/GetDistrictTree`,
    method: "get",
    params: query
  });

// 系统管理-用户管理-获取用户分组列表
export const getSysuserGroups = data =>
  request({
    url: `/services/app/User/GetSysuserGroups`,
    method: "post",
    data
  });

// 统计分析-用人单位分析-获取区域列表
export const getDistricts = query =>
  request({
    url: `/services/app/System/GetDistricts`,
    method: "get",
    params: query
  });

// 系统公用-获取医疗机构单位+区域树(医疗卫生)
export const getDistrictWithMedicalEprTree = data =>
  request({
    url: `/services/app/System/GetDistrictWithMedicalEprTree`,
    method: "post",
    data
  });

// 系统公用-获取海康威视人脸分组
export const getFaceGroups = data =>
  request({
    url: `/services/app/Hik/GetFaceGroups`,
    method: "post",
    data
  });

// 医疗卫生-获取区域+医疗机构+海康设备
export const getDistrictWithMedicalEprAndHikDeviceTree = query =>
  request({
    url: `/services/app/System/GetDistrictWithMedicalEprAndHikDeviceTree`,
    method: "get",
    params: query
  });

// 医疗卫生-统计分析-获取医疗机构
export const getMedicalEnterprises = query =>
  request({
    url: `/services/app/MedicalHealth/GetMedicalEnterprises`,
    method: "get",
    params: query
  });

// 系统公用-根据单位类型获取单位信息
export const getEnterpriseByEprType = data =>
  request({
    url: `/services/app/System/GetEnterpriseByEprType`,
    method: "post",
    data
  });

// 获取行政区域列表 BeginLevel 开始级别0:国,1:省/直辖市,2:市,3:区县 全部= -1 EndLevel 结束级别 全部= -1
export const getSysRegionTree = query =>
  request({
    url: `/services/app/System/GetSysRegionTree`,
    method: "get",
    params: query
  });

// 懒加载获取行政区域列表
export const getSysRegionByParentCode = query =>
  request({
    url: `/services/app/System/GetSysRegionByParentCode`,
    method: "get",
    params: query
  });

// 系统管理-字典管理-分页获取危害因素字典数据
export const PagedODFactorDictionary = data =>
  request({
    url: `/services/app/Dictionary/PagedODFactorDictionary`,
    method: "post",
    data
  });

// 系统管理-字典管理-获取危害因素类型
export const GetCacheFactorType = query =>
  request({
    url: `/services/app/Dictionary/GetCacheFactorType`,
    method: "get",
    params: query
  });

// 系统管理-字典管理-创建字典项
export const CreateDictionaryItems = data =>
  request({
    url: `/services/app/Dictionary/CreateOrEditDictionaryItems`,
    method: "post",
    data
  });

// 系统管理-字典管理-删除字典
export const BulkDeleteDictionaryItems = data =>
  request({
    url: `/services/app/Dictionary/BulkDeleteDictionaryItems`,
    method: "post",
    data
  });

// 获取负责人列表数据
export const ListUser = data =>
  request({
    url: `/services/app/User/ListUser`,
    method: "post",
    data
  });

// 获取单位列表
export const ListEnterprises = data =>
  request({
    url: `/services/app/Enterprise/ListEnterprises`,
    method: "post",
    data
  });
