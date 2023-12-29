import { defaultTo, get, isArray, reduce, set } from "lodash";
import { IObjectMapperUtilRefs } from "./interfaces/object.mapper.util.interfaces";

export const objectMapperUtil = (
  inputObject: Object,
  PROPERTIES_REFS: IObjectMapperUtilRefs[]
): Object => {
  if (!isArray(PROPERTIES_REFS)) {
    throw `Second paramater 'PROPERTIES_REFS' must be an array of IObjectMapperUtilRefs`;
  }

  return objectDataProcessor(inputObject, PROPERTIES_REFS);
};

const objectDataProcessor = (
  inputObject: Object,
  PROPERTIES_REFS: IObjectMapperUtilRefs[]
) => {
  return reduce(
    PROPERTIES_REFS,
    (result: Object, reference: IObjectMapperUtilRefs): Object => {
      const inputValue = defaultTo(
        get(inputObject, reference.inputProp),
        reference.defaultValue
      );
      const outputValue = reference.valueProcessor
        ? reference.valueProcessor(inputValue)
        : inputValue;
      return set(result, reference.outputProp, outputValue);
    },
    {}
  );
};
