import request from "@/utils/request";

// 获取短信验证码接口
export const getSmsCode = data =>
  request({
    url: `/services/app/System/SendSmsVerifyCode`,
    method: "post",
    data
  });

// 短信验证码校验接口
export const verifySmsCode = data =>
  request({
    url: `/services/app/System/VerifySmsCode`,
    method: "post",
    data
  });

// 注册接口
export const Register = data =>
  request({
    url: `/services/app/Account/Register`,
    method: "post",
    data
  });

// 校验账号信息接口
export const verifyAccountInfo = data =>
  request({
    url: `/services/app/Account/VerifyAccountInfo`,
    method: "post",
    data
  });

// 登录接口
export const login = data =>
  request({
    url: `/TokenAuth/Authenticate`,
    method: "post",
    data
  });

// 获取图形验证码接口
export const createLoginVerifyCode = data =>
  request({
    url: `/services/app/System/CreateImgVerifyCode`,
    method: "post",
    data
  });

// 检验图形验证码接口
export const VerifyVerificationCode = data =>
  request({
    url: `/services/app/System/VerifyVerificationCode`,
    method: "post",
    data
  });

// 获取权限菜单接口
export const getPermissionRoutes = data =>
  request({
    url: `/services/app/Permission/GetPermissions`,
    method: "post",
    data
  });

// 获取当前用户信息接口
export const getUserInfo = () =>
  request({
    url: `/services/app/User/GetCurrentUser`,
    method: "get"
  });

// 退出登录接口
export const logout = query =>
  request({
    url: `/TokenAuth/ChangeLoginStatus`,
    method: "get",
    params: query
  });

// 获取审批信息
export const getRegisterApprovalDetail = query =>
  request({
    url: `/services/app/Account/GetRegisterApprovalDetail`,
    method: "get",
    params: query
  });

// 修改密码
export const changePassword = data =>
  request({
    url: `/services/app/Account/ChangePassword`,
    method: "post",
    data
  });

// 删除注册信息
export const deleteRegister = data =>
  request({
    url: `/services/app/Account/DeleteRegister`,
    method: "post",
    data
  });

// 系统管理-个人中心-获取个人信息
export const getPersonalCenter = query =>
  request({
    url: `/services/app/User/GetPersonalCenter`,
    method: "get",
    params: query
  });

// 系统管理-个人中心-修改消息声音提醒状态
export const editVoiceRemind = data =>
  request({
    url: `/services/app/User/EditVoiceRemind`,
    method: "post",
    data
  });

// 系统管理-个人中心-修改电话号码
export const editUserPhoneNumber = data =>
  request({
    url: `/services/app/User/BindMobilePhone`,
    method: "post",
    data
  });

// 系统管理-获取公告消息通知(系统右上角通知)
export const getSystemNoticesInform = data =>
  request({
    url: `/services/app/SystemNotice/GetSystemNoticesInform`,
    method: "post",
    data
  });

// 系统管理-系统公告-批量设置通知状态(已读、未读、清理  系统右上角通知)
export const bulkSetSystemNoticeStatus = data =>
  request({
    url: `/services/app/SystemNotice/BulkSetSystemNoticeStatus`,
    method: "post",
    data
  });

// 实时报警信息 (监管端-企业端 通用  系统右上角通知)
export const getAlarmMessage = data =>
  request({
    url: `/services/app/Alarm/GetAlarmMessage`,
    method: "post",
    data
  });

// 报警消息标记为已读(监管端-企业端 通用  系统右上角通知)
export const upAlarmStatus = data =>
  request({
    url: `/services/app/Alarm/UpAlarmStatus`,
    method: "post",
    params: data
  });

// 报警消息全部标记为已读(监管端-企业端 通用  系统右上角通知)
export const upAlarmAllReadStatus = data =>
  request({
    url: `/services/app/Alarm/UpAlarmAllReadStatus`,
    method: "post",
    params: data
  });

// 报警清空已读消息(监管端-企业端 通用  系统右上角通知)
export const clearAlarmMessage = data =>
  request({
    url: `/services/app/Alarm/ClearAlarmMessage`,
    method: "post",
    params: data
  });

// 校验账号和手机号的绑定关系
export const VerifySysuserIDAndSysuserMP = data =>
  request({
    url: `/services/app/Account/VerifySysuserIDAndSysuserMP`,
    method: "post",
    data
  });

// 通知管理-获取通知数量(刷新页面时调用)
export const GetNotifyCount = query =>
  request({
    url: `/services/app/Notify/GetNotifyCount`,
    method: "get",
    params: query
  });

// 通知管理-根据类型获取通知
export const GetNotifyByType = data =>
  request({
    url: `/services/app/Notify/GetNotifyByType`,
    method: "post",
    data
  });

// 通知管理-已读通知
export const BatchReadNotify = data =>
  request({
    url: `/services/app/Notify/BatchReadNotify`,
    method: "post",
    data
  });

// 获取该角色下有无需要认领的企业条数
export const getExistsEnterpriseClaimCount = params =>
  request({
    url: `/services/app/Statistics/GetExistsEnterpriseClaimCount`,
    method: "get",
    params
  });

// 分页获取需要认领的企业
export const pagedEnterpriseClaims = data =>
  request({
    url: `/services/app/Statistics/PagedEnterpriseClaims`,
    method: "post",
    data
  });

// 用户管理-监管端-分页获取账号申诉列表
export const PagedSysuserAppeal = data =>
  request({
    url: `/services/app/User/PagedSysuserAppeal`,
    method: "post",
    data
  });

// 用户管理-监管端-账号申诉审核
export const ApprovalSysuserAppeal = data =>
  request({
    url: `/services/app/User/ApprovalSysuserAppeal`,
    method: "post",
    data
  });

// 用户管理-账号申诉
export const CreateOrEditSysuserAppeal = data =>
  request({
    url: `/services/app/User/CreateOrEditSysuserAppeal`,
    method: "post",
    data
  });

// 用户管理-获取账号申诉详情
export const GetSysuserAppealDetail = query =>
  request({
    url: `/services/app/User/GetSysuserAppealDetail`,
    method: "get",
    params: query
  });

// 用户管理-获取账号申诉进度
export const GetAppealProgress = query =>
  request({
    url: `/services/app/User/GetAppealProgress`,
    method: "get",
    params: query
  });

// 获取系统信息
export const GetSystemInfo = query =>
  request({
    url: `/services/app/System/GetSystemInfo`,
    method: "get",
    params: query
  });

// 获取系统版本列表
export const PagedSystemVersion = data =>
  request({
    url: `/services/app/System/PagedSystemVersion`,
    method: "post",
    data
  });

// 修改系统账号名
export const EditUserAccount = data =>
  request({
    url: `/services/app/User/EditUserAccount`,
    method: "post",
    data
  });

