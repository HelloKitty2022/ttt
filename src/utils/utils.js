export const stringify = (json) => {
  let count = 0;
  let list = [];
  let str = JSON.stringify(json, function (key, val) {
    if (typeof val === 'function') {
      list.push(val + '');
      const result = '$code{' + count + '}$code'
      count = count + 1;
      return result
    }
    return val;
  }, 2);
  let startCode = '$code{';
  let endCode = '}$code';
  list.forEach((ele, index) => {
    str = str.replace(startCode + index + endCode, startCode + ele + endCode)
  })
  for (let i = 0; i < count; i++) {
    str = str.replace('"' + startCode, '').replace(endCode + '"', '')
  }
  return str
}
export const parse = (str) => {
  return JSON.parse(str, function (k, v) {
    if (v.indexOf && v.indexOf('function') > -1) {
      return eval("(function(){return " + v + " })()")
    }
    return v;
  });
}
export const addUrlParam = (url, param, value) => {
  if (!url) return
  function GetQueryString (name) {
    var num = url.indexOf("?")
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = url.substr(num + 1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }
  function replaceParamVal (paramName, value) {
    var re = eval('/(' + paramName + '=)([^&]*)/gi');
    return url.replace(re, paramName + '=' + value);
  }
  if (GetQueryString(param)) {
    return replaceParamVal(param, value)
  } else {
    if (url.includes('?')) {
      url = url + '&' + param + '=' + value
    } else {
      url = url + '?' + param + '=' + value
    }
    return url;
  }

}
// 获取url中的参数
export const getUrlParams = (url) => {
  let result = {
    url: '',
    params: {}
  };
  let list = url.split('?');
  result.url = list[0];
  let params = list[1];
  if (params) {
    let list = params.split('&');
    list.forEach(ele => {
      let dic = ele.split('=');
      let label = dic[0];
      let value = dic[1];
      result.params[label] = value;
    });
  }
  return result;
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
      exitFullScreen();
  } else {
      reqFullScreen();
  }
};
/**
* esc监听全屏
*/
export const listenfullscreen = (callback) => {
  function listen() {
      callback()
  }
  document.addEventListener("fullscreenchange", function () {
      listen();
  });
  document.addEventListener("mozfullscreenchange", function () {
      listen();
  });
  document.addEventListener("webkitfullscreenchange", function () {
      listen();
  });
  document.addEventListener("msfullscreenchange", function () {
      listen();
  });
};
/**
* 浏览器判断是否全屏
*/
export const fullscreenEnable = () => {
  var isFullscreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
  return isFullscreen;
}
/**
* 浏览器全屏
*/
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
  }
};
/**
* 浏览器退出全屏
*/
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
      document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
      document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
      document.mozCancelFullScreen();
  }
};
