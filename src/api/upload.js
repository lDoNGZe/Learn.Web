import request from "@/utils/request";
import { getToken } from "@/utils/auth";

// 批量删除系统文件
export const bulkDeleteSystemFile = data =>
  request({
    url: `/services/app/SystemFile/BulkDeleteSystemFile`,
    method: "post",
    data
  });

// 下载文件模板接口
export const GetSystemFileTemplate = data =>
  request({
    url: `/services/app/SystemFile/GetSystemFileTemplate`,
    method: "post",
    data
  });

// 下载文件模板列表接口
export const ListSystemFileTemplate = data =>
  request({
    url: `/services/app/SystemFile/ListSystemFileTemplate`,
    method: "post",
    data
  });

// 上传图片
export const UploadSystemFiles = data =>
  request({
    url: `/services/app/SystemFile/UploadSystemFiles`,
    method: "post",
    data,
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`
    }
  });

// 获取后台返回的文件流数据
export const GetFileStreamByRelativePath = query =>
  request({
    url: `/services/app/SystemFile/GetFileStreamByRelativePath`,
    method: "get",
    params: query,
    responseType: "blob"
  });

// 获取后台返回的文件地址
export const GetFileToPdfRelativePath = query =>
  request({
    url: `/services/app/SystemFile/GetFileToPdfRelativePath`,
    method: "get",
    params: query,
  });

// 合并报告
export const MergePdfFiles = data =>
  request({
    url: `/services/app/SystemFile/MergePdfFiles`,
    method: "post",
    data,
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`
    }
  });

// 同步报告
export const SyncSystemFile = data =>
  request({
    url: `/services/app/SystemFile/SyncSystemFile`,
    method: "post",
    data,
  })