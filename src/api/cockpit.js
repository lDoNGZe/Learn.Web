import request from '@/utils/request'

// 总驾驶舱-职业卫生分类-获取职业卫生分类统计
export const getOHClassifyStatisticOfHeadCockpit = (query) => request({
  url: `/services/app/Statistics/GetOHClassifyStatisticOfHeadCockpit`,
  method: 'get',
  params: query
});

// 总驾驶舱-医疗卫生-获取医疗卫生统计(高频/重点人员)
export const getMedicalHealthStatisticOfHeadCockpit = (data) => request({
  url: `/services/app/Statistics/GetMedicalHealthStatisticOfHeadCockpit`,
  method: 'post',
  data
});

// 总驾驶舱-获取总驾驶舱基础数据
export const getHeadCockpitBasicsData = (query) => request({
  url: `/services/app/Statistics/GetHeadCockpitBasicsData`,
  method: 'get',
  params: query
});
// 总驾驶舱-报警趋势
export const getHeadCockpitAlarmTrends = (query) => request({
  url: `/services/app/Statistics/GetHeadCockpitAlarmTrends`,
  method: 'get',
  params: query
});
// 今日餐饮具消毒数据
export const getHeadCockpitTablewareData = (query) => request({
  url: `/services/app/Statistics/GetHeadCockpitTablewareData`,
  method: 'get',
  params: query
});
// 今日餐饮具消毒数据
export const getHeadCockpitAutoclavingData = (query) => request({
  url: `/services/app/Statistics/GetHeadCockpitAutoclavingData`,
  method: 'get',
  params: query
});
// 系统管理-获取公告消息通知(系统右上角通知)
export const getSystemNoticesInform = (data) => request({
  url: `/services/app/SystemNotice/GetSystemNoticesInform`,
  method: 'post',
  data
});
// 总驾驶舱-监测因子状态数量
export const getHeadCockpitCcodeStatus = (query) => request({
  url: `/services/app/Statistics/GetHeadCockpitCcodeStatus`,
  method: 'get',
  params: query
});
// 获取职业健康检查统计
export const getHealthInspectStatistic = (query) => request({
  url: `/services/app/Statistics/GetHealthInspectStatistic`,
  method: 'get',
  params: query
});
// 总驾驶舱-统计今日产废重量
export const getTodayWasteWeigthStatistic = (query) => request({
  url: `/services/app/MedicalWaste/GetTodayWasteWeigthStatistic`,
  method: 'get',
  params: query
});

// 职业卫生-职业卫生分类分级统计(总驾驶舱)
export const getOHClassifyStatistics = (query) => request({
  url: `/services/app/Statistics/GetOHClassifyStatistics`,
  method: 'get',
  params: query
});

// 职业卫生分类分级状态
export const GetOHClassifyStatusStatistic = (query) => request({
  url: `/services/app/Statistics/GetOHClassifyStatusStatistic`,
  method: 'get',
  params: query
});
// 总驾驶舱-获取监管覆盖率
export const getRegulatorCoverRate = (query) => request({
  url: `/services/app/Statistics/GetRegulatorCoverRate`,
  method: 'get',
  params: query
});
// 总驾驶舱-医疗机构自查
export const gethospitalSelfInspectionStatistocs = (query) => request({
  url: `/services/app/Statistics/GethospitalSelfInspectionStatistocs`,
  method: 'get',
  params: query
});

// 获取驾驶舱统计数据
export const GetCockpitStatistics = (query) => request({
  url: `/services/app/Questionnaire/GetCockpitStatistics`,
  method: 'get',
  params: query
});