import { coordinateData } from './coordinate-data'

export function convertData(data: any) {
  const res: any = []
  console.log(data, "data")
  if (data.length) { // 可能会有没值的情况
    for (let i = 0; i < data.length; i++) {
      const geoCoord = coordinateData[data[i].name] // 根据接口返回的城市名，将其对应的经纬度找到
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        })
      }
    }
  }
  return res
}
