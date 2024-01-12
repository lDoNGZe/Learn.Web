import request from "@/utils/request";

// 获取问卷任务列表
export const PagedQuestionnaireTask = data =>
  request({
    url: `/services/app/Questionnaire/PagedQuestionnaireTask`,
    method: "post",
    data
  });

// 获取问卷类型
export const GetQuestionnaireKeyValues = query =>
  request({
    url: `/services/app/Questionnaire/GetQuestionnaireKeyValues`,
    method: "get",
    params: query
  });

// 获取单位列表
export const PagedEnterprises = data =>
  request({
    url: `/services/app/Enterprise/PagedEnterprises`,
    method: "post",
    data
  });

// 添加编辑问卷任务
export const CreateOrEditQuestionnaireTask = data =>
  request({
    url: `/services/app/Questionnaire/CreateOrEditQuestionnaireTask`,
    method: "post",
    data
  });

// 删除问卷任务
export const DeleteQuestionnaireTask = query =>
  request({
    url: `/services/app/Questionnaire/DeleteQuestionnaireTask`,
    method: "delete",
    params: query
  });

// 下发任务给单位
export const IssueQuestionnaireTask = data =>
  request({
    url: `/services/app/Questionnaire/IssueQuestionnaireTask`,
    method: "post",
    data
  });

// 获取任务详情
export const GetQuestionnaireTaskDetail = query =>
  request({
    url: `/services/app/Questionnaire/GetQuestionnaireTaskDetail`,
    method: "get",
    params: query
  });

// 复制问卷任务
export const CopyQuestionnaireTask = data =>
  request({
    url: `/services/app/Questionnaire/CopyQuestionnaireTask`,
    method: "post",
    data
  });

// 获取任务单位
export const PagedQuestionnaireEnterprise = data =>
  request({
    url: `/services/app/Questionnaire/PagedQuestionnaireEnterprise`,
    method: "post",
    data
  });


// 获取问卷
export const GetQuestionnaire = query =>
  request({
    url: `/services/app/Questionnaire/GetQuestionnaire`,
    method: "get",
    params: query
  });

// 获取问卷答案
export const GetAnswer = query =>
  request({
    url: `/services/app/Questionnaire/GetAnswer`,
    method: "get",
    params: query
  });

// 答题
export const Answer = data =>
  request({
    url: `/services/app/Questionnaire/Answer`,
    method: "post",
    data
  });

// 下发问卷任务
export const ConfirmIssueQuestionnaireTask = data =>
  request({
    url: `/services/app/Questionnaire/ConfirmIssueQuestionnaireTask`,
    method: "post",
    data
  });
