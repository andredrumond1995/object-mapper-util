export interface IObjectMapperUtilRefs {
  outputProp: string;
  inputProp?: string | number | boolean | any[];
  valueProcessor?: (...args: any[]) => any;
  defaultValue?: any;
}
