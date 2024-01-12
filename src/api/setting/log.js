import request from '@/utils/request'

// 系统管理-日志管理-获取日志
export const PagedSystemLog = (data) => request({
  url: `/services/app/SystemLog/PagedSystemLog`,
  method: 'post',
  data
});


