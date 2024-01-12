import request from "@/utils/request";

// 统计分析-获取冷却塔风险分析数据
export const GetCoolTowerRiskAnalysis = data =>
  request({
    url: `/services/app/Questionnaire/GetCoolTowerRiskAnalysis`,
    method: "post",
    data
  });

// 获取问卷风险分析列表
export const ListQuestionnaireRiskAnalysis = data =>
  request({
    url: `/services/app/Questionnaire/ListQuestionnaireRiskAnalysis`,
    method: "post",
    data
  });
