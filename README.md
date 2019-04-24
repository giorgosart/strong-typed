[![Test](https://img.shields.io/npm/v/strong-typed.svg?style=flat)](https://www.npmjs.com/package/strong-typed)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


# strong-typed
A tiny, no dependency javascript library for runtime type checking.

## Installation
```
npm i strong-typed
```

## Usage
Strong-typed takes two arguments:

| Parameter | Type     | Description                                                                                                                                                                                                                               |
|-----------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Types     | array    | A javascript array of supported types (supported types are `any`, `date`, `integer`, `boolean`, `decimal`, `string`, `object`, `function` and `array`). The number of elements in the array **must** match the parameter number of function that's passed in. |
| Fn        | function | The javascript function to be type checked                                                                                                                                                                                                |
### Examples
```
import st from 'strong-typed';

const myFunc = st(['string'], (a) => { console.log(a) });

myFunc();    // Error: Function expects 1 arguments, instead only 0 parameter(s) passed in.
myFunc(1);   // Error: Expected argument 1 to be of type 'string'
myFunc("1"); // Will print 1 in the console
```

