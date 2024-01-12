import request from "@/utils/request";

// 企业端-获取单位信息
export const GetEnterpriseBasicInfo = query =>
  request({
    url: `/services/app/Enterprise/GetEnterpriseBasicInfo`,
    method: "get",
    params: query
  });

// 企业端-批量绑定冷却塔系统
export const BulkCreateQuestionnaireRecord = data =>
  request({
    url: `/services/app/Questionnaire/BulkCreateQuestionnaireRecord`,
    method: "post",
    data
  });

// 企业端-删除文件记录（删除冷却塔系统关联的问卷）
export const DeleteQuestionnaireRecord = query =>
  request({
    url: `/services/app/Questionnaire/DeleteQuestionnaireRecord`,
    method: "delete",
    params: query
  });

// 企业端-获取冷却塔关联问卷列表
export const PagedQuestionnaireRecord = data =>
  request({
    url: `/services/app/Questionnaire/PagedQuestionnaireRecord`,
    method: "post",
    data
  });

// 企业端-提交冷却塔系统
export const SubmitQuestionnaireTask = data =>
  request({
    url: `/services/app/Questionnaire/SubmitQuestionnaireTask`,
    method: "post",
    data
  });