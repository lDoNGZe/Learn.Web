import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { getToken } from "./auth";
import * as Validates from "./validate";
import setting from "../setting";

/**
 * 生成表单自定义校验函数
 * @param {*} key 验证规则
 * @param {*} msg 错误信息
 * @returns 
 */
export const formValidateDiy = (key, msg) => (rule, value, cb) => {
  if (Validates[key](value)) {
    cb();
  } else {
    cb(new Error(msg));
  }
};

/**
 * 动态获取IP地址，匹配内网部署
 * @param {*} key static下面的config.js配置的动态地址
 * @returns 
 */
export const getBackApiUrl = (key) => {
  let backApiUrl = setting[key]; // 获取当前的接口地址;
  if (process.env.NODE_ENV == 'production') {
    console.log(process.env.NODE_ENV, backApiUrl, 'backApiUrl');
    const protocol = window.location.protocol; // 获取 URL 的协议地址
    const host = window.location.host; // 获取 URL 的主机地址
    backApiUrl = backApiUrl.replace(/{ipport}/i, host);
    backApiUrl = backApiUrl.replace(/{protocol}/i, protocol);
  }
  return backApiUrl;
};

/**
 * 判断文件格式是否是 .png || .jpeg || .jpg || .gif 图片
 * @param {*} fileName 
 * @returns Boolean
 */
export const isImage = fileName => {
  if (typeof fileName !== "string") return;
  let name = fileName.toLowerCase();
  return (
    name.endsWith(".png") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".jpg") ||
    name.endsWith(".gif")
  );
};

/**
 * 判断文件格式是否是 .xls || .xlsx || .doc || .docx || .pdf 文件
 * @param {*} fileName 
 * @returns Boolean
 */
export const isFile = fileName => {
  if (typeof fileName !== "string") return;
  let name = fileName.toLowerCase();
  return (
    name.endsWith(".xls") ||
    name.endsWith(".doc") ||
    name.endsWith(".pdf") ||
    name.endsWith(".docx") ||
    name.endsWith(".xlsx")
  );
};

/**
 * 判断文件格式是否是 .doc || .docx 文件
 * @param {*} fileName 
 * @returns Boolean
 */
export const isDoc = fileName => {
  if (typeof fileName !== "string") return;
  let name = fileName.toLowerCase();
  return name.endsWith(".doc") || name.endsWith(".docx");
};

/**
 * 判断文件格式是否是 .pdf 文件
 * @param {*} fileName 
 * @returns Boolean
 */
export const isPDF = fileName => {
  if (typeof fileName !== "string") return;
  let name = fileName.toLowerCase();
  return name.endsWith(".pdf");
};

/**
 * 递归去除数据结构里面children为空的
 * @param {*} arr 
 * @returns []
 */
export const deleteNode = arr => {
  if (typeof arr !== "object" || arr === null) {
    return arr;
  }
  const copy = Array.isArray(arr) ? [] : {};
  Object.keys(arr).forEach(key => {
    if (key === "children" && arr[key].length === 0) {
    } else {
      copy[key] = deleteNode(arr[key]);
    }
  });
  return copy;
};

/**
 * 动态给菜单模块配置 redirect 跳转路径
 * @param {*} data 菜单数据
 * @param {*} currClickId 点击的roleId
 * @returns []
 */
export const doConfigRedirectUrl = (data, currClickId) => {
  return data.map(item => {
    const obj = {
      roleId: currClickId,
      permissionId: item.id,
      redirect: ""
    };
    // 如果是菜单模块
    if (item.type === 0) {
      // 顶部二级菜单模块
      if (item.isSecondLevel) {
        const firstChild = item.children[0];
        obj.redirect = firstChild.path;
      }
      // 顶部一级菜单模块
      if (item.isFirstLevel) {
        const firstChild = item.children[0];
        // 如果是模块
        if (firstChild.type === 0) {
          obj.redirect = firstChild.path;
        }
        // 如果是页面
        if (firstChild.type === 1) {
          obj.redirect = `${item.path}/${firstChild.path}`;
        }
      }
      const childrens = data.filter(ele => ele.parentID === item.id);
      console.log(childrens, "tuiyhhgghgh");
      // 左侧菜单模块
      const firstChild = childrens[0];
      // 如果第一个子菜单是模块
      if (firstChild && firstChild.type === 0) {
        obj.redirect = firstChild.path;
      }
      // 如果第一个子菜单是页面
      if (firstChild && firstChild.type === 1) {
        obj.redirect = `${item.path}/${firstChild.path}`;
      }
    }
    return obj;
  });
};

/**
 * 去重数组（对象的属性比如id）
 * @param {*} arr 数组
 * @param {*} name 去重的属性
 * @returns 
 */
export const arrayUnique2 = (arr, name) => {
  const hash = {};
  return arr.reduce(function (item, next) {
    hash[next[name]] ? "" : (hash[next[name]] = true && item.push(next));
    return item;
  }, []);
};

/**
 * 防抖函数
 * @param {*} fn 函数体
 * @param {*} interval 防抖时间
 * @returns 
 */
export function throttle(fn, interval) {
  // last为上一次触发回调的时间
  var last = 0;
  // 将throttle处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    var context = this;
    // 保留调用时传入的参数
    var args = arguments;
    // 记录本次触发回调的时间
    var now = +new Date();
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last >= interval) {
      // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
      last = now;
      fn.apply(context, args);
    }
  };
}

/**
 * 下载文件方法(pdf直接下载)
 * @param {*} url 下载地址
 * @param {*} filename 文件名称
 */
export const downLocalFile = (url, filename) => {
  const x = new XMLHttpRequest();
  x.open("GET", url, true);
  x.responseType = "blob";
  x.onload = e => {
    console.log(e);
    // 会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。
    // 这个新的URL 对象表示指定的 File 对象或 Blob 对象。
    const url = window.URL.createObjectURL(x.response);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };
  x.send();
};

/**
 * 下载后台返回的流文件
 * @param {*} url  下载地址
 * @param {*} filename 文件名称
 * @param {*} callback 回调函数
 */
export const requestDownFile = (url, filename, callback) => {
  const x = new XMLHttpRequest();
  x.open("GET", url, true);
  x.setRequestHeader("Authorization", `Bearer ${getToken()}`);
  x.responseType = "blob";
  x.onload = e => {
    // 会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。
    // 这个新的URL 对象表示指定的 File 对象或 Blob 对象。
    console.log(x, e, "x.response");
    const url = window.URL.createObjectURL(x.response);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    callback && callback()
  };
  x.send();
};

/**
 * 生成唯一id
 * @returns id 唯一的id
 */
export const getUniqueID = () => {
  // 当前时间转成 36 进制字符串
  var time = Date.now().toString(36);
  // 当前随机数转成 36 进制字符串
  var random = Math.random().toString(36);
  // 去除随机数的 0. 字符串
  random = random.substring(2, random.length);
  // 返回唯一ID
  return random + time;
};

/**
 * 下载图片
 * @param {*} imgsrc 下载图片地址
 * @param {*} name   下载图片名
 */
export const downloadImage = (imgsrc, name) => {
  var image = new Image();
  // 解决跨域 Canvas 污染问题
  image.setAttribute("crossOrigin", "anonymous");
  image.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
    var a = document.createElement("a"); // 生成一个a元素
    var event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window
    }); // 创建一个单击事件
    a.download = name || "photo"; // 设置图片名称
    a.href = url; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event); // 触发a的单击事件
  };
  image.src = imgsrc;
};

/**
 * 导出复杂表格
 * @excelName 报表名称
 * @node  表格的ref节点
 * @callback 回调函数, 可不传
 */
export const exportTable = (excelName, node, callback) => {
  try {
    const $e = node.$el;
    let $table = $e.querySelector(".el-table__fixed");
    if (!$table) {
      $table = $e;
    }

    const wb = XLSX.utils.table_to_book($table, { raw: true });
    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      bookSST: true,
      type: "array",
    });
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `${excelName}.xlsx`
    );
    callback && callback();
  } catch (e) {
    if (typeof console !== "undefined") console.error(e);
  }
}

/**
 * 前端下载文件流
 * @param {*} fileName 文件名称
 * @param {*} res      后台返回的文件流数据
 * 注：也可用window.navigator.msSaveOrOpenBlob来判断是IE还是非IE
 */
export const downloadFile = (fileName, res) => {
  const blob = new Blob([res]);
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const a = document.createElement('a');
    a.download = fileName;
    a.style.display = 'none';
    a.href = URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href); // 释放URL 对象
    document.body.removeChild(a);
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
}

/**
 * getAllItemId 递归取对象children属性里面所有的id
 * @param {*} data 
 * @returns []
 */
export const getAllItemId = data => {
  let newArr = [];
  const getIds = arr => {
    arr.forEach(item => {
      newArr.push(item.value);
      if (item.children) {
        getIds(item.children);
      }
    });
  };
  newArr.push(data.value);
  if (data.children) {
    getIds(data.children); // 递归调用自身
  }
  return newArr;
};

/**
 * setProp 递归给数组中元素中添加一个属性
 * @param {*} mapList 
 * @param {*} target 
 * @param {*} key   要添加的属性
 * @returns 
 */
export const setProp = (mapList, target, key) => {
  return mapList.reduce((prev, item) => {
    const findObj = target.find(
      oItem => oItem.key == item.value && oItem.remark == item.other
    );
    if (findObj) {
      item[key] = `(${findObj.value})`;
    }
    if (item.children) {
      setProp(item.children, target, key);
    }
    prev.push(item);
    return prev;
  }, []);
};

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return Number
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/***
 * findArrayMaxLength 找到数值中重复项的数量
 * @param {Array} list
 * @return {*}
 */
export const findArrayMaxLength = (theads, list) => {
  let occs = []
  let result = []
  list.forEach(item => {
    const findItem = theads.find(thead => thead.prop == item.questionID)
    if (findItem) {
      result.push(item.questionID)
    }
  })
  let newArr = [];
  //使用set进行数组去重
  newArr = [...new Set(result)];
  let newarr2 = new Array(newArr.length);
  for (let t = 0; t < newarr2.length; t++) {
    newarr2[t] = 0;
  }
  for (let p = 0; p < newArr.length; p++) {
    for (let j = 0; j < result.length; j++) {
      if (newArr[p] == result[j]) {
        newarr2[p]++;
      }
    }
  }
  for (let m = 0; m < newArr.length; m++) {
    occs.push(newarr2[m])
  }
  return occs[0]
}

/***
 * findDuplicates 找到数组中重复的项
 * @param {Array} arr
 * @return {*}
 */
export const findDuplicates = (arr) => {
  let key = {} //存储的 key 是type的值，value是在indeces中对应数组的下标
  let indices = [] //数组中每一个值是一个数组，数组中的每一个元素是原数组中相同type的下标 
  arr.map((item, index) => {
    //根据对应字段 分类（type）
    let type = item.questionID
    let _index = key[type]
    if (_index !== undefined) {
      indices[_index].push(index)
    } else {
      key[type] = indices.length
      indices.push([index])
    }
  })
  // 归类结果
  let result = []
  indices.map((item) => {
    item.map((index) => {
      //我这里需要重复项 根据业务处理
      if (item.length >= 1) {
        result.push(arr[index])
      }
    })
  })
  return result
}

/***
 * getStatusColor 固定得到几种颜色值的数组
 * @param {String} statusLabel
 * @return {String}
 */
export const statusColor = (statusLabel) => {
  // 创建包含几种颜色的数组
  const colorEumn = {
    ['待回复']: '#F56C6C',
    ['已回复']: '#67C23A',
    ['高风险']: '#F56C6C',
    ['中风险']: '#E6A23C',
    ['低风险']: '#67C23A',
  }
  return colorEumn[statusLabel]
}
