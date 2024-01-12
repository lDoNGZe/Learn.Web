import request from "@/utils/request";

// 添加 || 编辑系统咨询
export const CreateOrEditSystemConsult = data =>
  request({
    url: `/services/app/SystemConsults/CreateOrEditSystemConsult`,
    method: "post",
    data
  });

// 分页获取系统咨询
export const PagedSystemConsult = data =>
  request({
    url: `/services/app/SystemConsults/PagedSystemConsult`,
    method: "post",
    data
  });

// 回复系统咨询
export const ReplySystemConsult = data =>
  request({
    url: `/services/app/SystemConsults/ReplySystemConsult`,
    method: "post",
    data
  });

// 获取系统咨询详情
export const GetSystemConsultDetail = query =>
  request({
    url: `/services/app/SystemConsults/GetSystemConsultDetail`,
    method: "get",
    params: query
  });