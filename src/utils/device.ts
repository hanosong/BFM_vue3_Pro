export const judgeClient = () => {
  const u = navigator.userAgent
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1 // 判断是否是 android终端
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // 判断是否是 iOS终端
  // 兼容Ipad ios13版本会被错误识别为PC
  const isiPad =
    navigator.userAgent.match(/(iPad)/) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  if (isAndroid || isIOS || isiPad) {
    return false
  } else {
    return true
  }
}

