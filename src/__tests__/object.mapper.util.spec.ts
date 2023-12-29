import { objectMapperUtil } from "../object.mapper.util";
import { IObjectMapperUtilRefs } from "../interfaces/object.mapper.util.interfaces";

describe("FEATURE: objectMapperUtilUtil", () => {
  describe("SCENARIO: Valid input data and properties", () => {
    const inputObject = {
      prop1: 42,
      prop2: "Hello",
    };

    const PROPERTIES_REFS: IObjectMapperUtilRefs[] = [
      {
        outputProp: "property1",
        valueProcessor: (value: number): number => value * 2,
        defaultValue: 0,
        inputProp: "prop1",
      },
      { outputProp: "property2", defaultValue: "Default" },
    ];

    describe("GIVEN: PROPERTIES_REFS has references with value processor function", () => {
      describe("WHEN: objectMapperUtil is called ", () => {
        const result = objectMapperUtil(inputObject, PROPERTIES_REFS);
        it("THEN: it should return the mapped object", () => {
          expect(result).toEqual({
            property1: 84,
            property2: "Default",
          });
        });
      });
    });
  });

  describe("SCENARIO: Valid input data and properties", () => {
    const inputObject = {
      prop1: undefined,
    };

    const PROPERTIES_REFS: IObjectMapperUtilRefs[] = [
      {
        outputProp: "property1",
        defaultValue: 0,
        inputProp: "prop1",
      },
    ];

    describe("GIVEN: PROPERTIES_REFS has references with undefined input property value", () => {
      describe("WHEN: objectMapperUtil is called ", () => {
        const result = objectMapperUtil(inputObject, PROPERTIES_REFS);
        it("THEN: it should return the mapped object with default value for the property", () => {
          expect(result).toEqual({
            property1: 0,
          });
        });
      });
    });
  });

  describe("SCENARIO: Valid input data and properties", () => {
    const inputObject = {
      prop1: {
        prop: "output value",
      },
    };

    const PROPERTIES_REFS: IObjectMapperUtilRefs[] = [
      {
        outputProp: "property1",
        inputProp: "prop1.prop",
      },
    ];

    describe("GIVEN: PROPERTIES_REFS has references without value processor function", () => {
      describe("WHEN: objectMapperUtil is called ", () => {
        const result = objectMapperUtil(inputObject, PROPERTIES_REFS);
        it("THEN: it should return the mapped object", () => {
          expect(result).toEqual({
            property1: "output value",
          });
        });
      });
    });
  });

  describe("SCENARIO: Invalid input properties", () => {
    const inputObject = {
      prop1: 42,
      prop2: "Hello",
    };

    const PROPERTIES_REFS: IObjectMapperUtilRefs[] = null;

    describe("GIVEN: PROPERTIES_REFS is not an array", () => {
      describe("WHEN: objectMapperUtil is called ", () => {
        it("THEN: it should throw an error", () => {
          expect(() =>
            objectMapperUtil(inputObject, PROPERTIES_REFS)
          ).toThrowError(
            "Second paramater 'PROPERTIES_REFS' must be an array of IObjectMapperUtilRefs"
          );
        });
      });
    });
  });
});
