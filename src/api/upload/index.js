// 公共接口
import ajax from '@/utils/request'
import { getToken } from "@/utils/auth";

// 上传接口
export const Upload = data =>
  ajax({
    url: `/services/app/SystemFile/UploadSystemFiles`,
    method: "post",
    data,
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`
    }
  });

// 删除图片接口
export const DeleteSystemFiles = data =>
  ajax({
    url: `/services/app/SystemFile/DeleteSystemFiles`,
    method: "post",
    data,
  });