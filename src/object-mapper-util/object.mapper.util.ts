import { defaultTo, get, isArray, reduce, set } from 'lodash';
import { IObjectMapperUtilRefs } from '../interfaces/object.mapper.util.interfaces';

export const objectMapperUtil = <T = Record<string, any>>(
  inputObject: Record<string, any>,
  PROPERTIES_REFS: IObjectMapperUtilRefs[]
): T => {
  if (!isArray(PROPERTIES_REFS)) {
    throw `Second paramater 'PROPERTIES_REFS' must be an array of IObjectMapperUtilRefs`;
  }

  return objectDataProcessor<T>(inputObject, PROPERTIES_REFS);
};

const objectDataProcessor = <T = Record<string, any>>(
  inputObject: Record<string, any>,
  PROPERTIES_REFS: IObjectMapperUtilRefs[]
): T => {
  return reduce(
    PROPERTIES_REFS,
    (result: Object, reference: IObjectMapperUtilRefs): Record<string, any> => {
      const inputValue = defaultTo(get(inputObject, reference.inputProp), reference.defaultValue);
      const outputValue = reference.valueProcessor ? reference.valueProcessor(inputValue) : inputValue;
      return set(result, reference.outputProp, outputValue);
    },
    {}
  ) as T;
};
