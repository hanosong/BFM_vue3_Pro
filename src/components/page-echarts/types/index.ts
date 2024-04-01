interface IEchartValueType {
  value: number
  name: string
}



interface IProps {
  roseData?: IEchartValueType[]
  pieData?: IEchartValueType[]
  mapData?: IEchartValueType[]
  labels?: string[]
  values?: string[]

}

export type {
  IEchartValueType,
  IProps,
}
