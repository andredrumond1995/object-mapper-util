# object-mapper-util

## Description

The `object-mapper-util` library provides a simple function to map objects based on user-defined configurations.

## Installation

To install the library in your project, you can use npm. Run the following command in the terminal:

```bash
npm install object-mapper-util
```

## Basic Usage

Here is a basic example of how to use the library:

```typescript
import { objectMapper, IDataMapper } from 'object-mapper-util';

const inputObject = {
  prop1: 42,
  prop2: 'Hello',
  prop3: 'Not changed value from input object',
  prop4: {
    prop1: {
        prop: "Value"
    }
  },
  prop5: [
    {
        propElement0: 'element[0]'
    }
  ]
};

const PROPERTIES_REFS: IDataMapper[] = [
  { outputProp: 'property1', valueProcessor: (value) => value * 2, inputProp: 'prop1' },
  { outputProp: 'property2', defaultValue: 'Default' },
  { outputProp: 'property3', inputProp: 'prop3' },
  { outputProp: 'property4', inputProp: 'prop4.prop1.prop' }
  { outputProp: 'property5', inputProp: 'prop5[0].propElement0' }
];

const mappedObject = objectMapper(inputObject, PROPERTIES_REFS);

console.log(mappedObject);
```


## License 

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

I hope the library proves useful in your projects! If you have any questions or issues, feel free to reach out.

### Author
- Andre Drumond das Chagas
- LinkedIn: [linkedin.com/in/andre-drumond](https://br.linkedin.com/in/andre-drumond)
- Github: [https://github.com/andredrumond1995](https://github.com/andredrumond1995)
