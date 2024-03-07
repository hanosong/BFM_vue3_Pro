
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
// 时间格式化 传入的是0时区的
export const fromatUTC = (utcString: string, format = "YYYY-MM-DD HH:mm:ss") => {
  const resTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resTime
}
