import request from "@/utils/request";

// 完善一企一档信息接口
export const CreateOrEditEnterprise = data =>
  request({
    url: `/services/app/Enterprise/CreateOrEditEnterprise`,
    method: "post",
    data
  });

// 获取一企一档详情信息
export const GetEnterpriseDetail = query =>
  request({
    url: `/services/app/Enterprise/GetEnterpriseDetail`,
    method: "get",
    params: query,
  });

// 添加冷却塔系统信息
export const CreateOrEditCoolTowerSystem = data =>
  request({
    url: `/services/app/CoolTower/CreateOrEditCoolTowerSystem`,
    method: "post",
    data
  });

// 分页获取冷却塔系统列表
export const PagedCoolTowerSystem = data =>
  request({
    url: `/services/app/CoolTower/PagedCoolTowerSystem`,
    method: "post",
    data
  });

// 获取冷却塔系统详情
export const GetCoolTowerSystemDetail = query =>
  request({
    url: `/services/app/CoolTower/GetCoolTowerSystemDetail`,
    method: "get",
    params: query,
  });

// 删除冷却塔系统
export const DeleteCoolTowerSystem = query =>
  request({
    url: `/services/app/CoolTower/DeleteCoolTowerSystem`,
    method: "delete",
    params: query,
  });
