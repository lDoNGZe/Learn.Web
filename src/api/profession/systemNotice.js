import request from '@/utils/request'

// 系统管理-系统公告-添加/编辑公告
export const createOrEditSystemNotice = (data) => request({
  url: `/services/app/SystemNotice/CreateOrEditSystemNotice`,
  method: 'post',
  data
});

// 系统管理-系统公告-分页获取公告
export const getPagedSystemNotice = (data) => request({
  url: `/services/app/SystemNotice/PagedSystemNotice`,
  method: 'post',
  data
});

// 系统管理-系统公告-批量删除系统通知
export const bulkDeleteSystemNotice = (data) => request({
  url: `/services/app/SystemNotice/BulkDeleteSystemNotice`,
  method: 'post',
  data
});

// 系统管理-系统公告-获取系统通知详情
export const getSystemNoticeDetail = (query) => request({
  url: `/services/app/SystemNotice/GetSystemNoticeDetail`,
  method: 'get',
  params: query
});

// 系统管理-系统公告-更新系统公告附件下载量(下载文件时调用)
export const editSystemNoticeDownloadCount = (data) => request({
  url: `/services/app/SystemNotice/EditSystemNoticeDownloadCount`,
  method: 'post',
  data
});