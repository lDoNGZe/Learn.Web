import { title } from '@/setting'

/**
 * 获取当前显示路由的标题
 * @param {*} to 
 * @returns title
 */
export default function getPageTitle ({ meta, matched }) {
  if (meta.title && matched[0] && matched.length > 1) {
    return `${meta.title} - ${matched[0].meta.title}`;
  } else if (meta.title && matched[0] && matched.length === 1) {
    return `${meta.title} - ${title}`;
  }
  return `${title}`;
}
