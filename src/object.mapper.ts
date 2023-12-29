import { defaultTo, forEach, get, isArray, reduce, set } from "lodash";
import { IObjectMapper } from "./interfaces/object.mapper.interface";

export const objectMapper = (
  inputObject: Object,
  PROPERTIES_REFS: IObjectMapper[]
): Object => {
  if (!isArray(PROPERTIES_REFS)) {
    throw `Second paramater 'PROPERTIES_REFS' must be an array of IObjectMapper`;
  }

  return objectDataProcessor(inputObject, PROPERTIES_REFS);
};

const objectDataProcessor = (
  inputObject: Object,
  PROPERTIES_REFS: IObjectMapper[]
) => {
  return reduce(
    PROPERTIES_REFS,
    (result: Object, reference: IObjectMapper): Object => {
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
