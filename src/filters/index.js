const dayjs = require("dayjs");

/**
 * 格式化日期时间
 * @param {*} time 日期时间
 * @returns String
 */
export function formatDateTime (time = new Date()) {
  return time && dayjs(time).format("YYYY-MM-DD HH:mm:ss");
}

/**
 * 格式化日期
 * @param {*} time 日期
 * @returns String
 */
export function formatDate (time = new Date()) {
  return time && dayjs(time).format("YYYY-MM-DD");
}