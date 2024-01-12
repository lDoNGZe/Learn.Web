import dayjs from "dayjs"

/**
 * formatAddDay 格式化日期加1天
 * @param {Date} date 日期时间
 * @param {Number} type 格式化类型 默认为1
 * @return {*} 格式化后的时间
 */

export const formatAddDay = (date, type = 1) => {
  const format = type === 1 ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'
  return date ? dayjs(dayjs(date).add(1, 'day')).format(format) : ''
}

/**
 * formatDay 格式化日期
 * @param {Date} date 日期时间
 * @param {Number} type 格式化类型 默认为1
 * @return {*} 格式化后的时间
 */
export const formatDay = (date, type = 1) => {
  const format = type === 1 ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'
  return date ? dayjs(date).format(format) : ''
}