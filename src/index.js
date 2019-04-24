const strongTyped = (types, fn) => {

  const ANY = 'any';
  const DATE = 'date';
  const INTEGER = 'integer';
  const BOOLEAN = 'boolean';
  const DECIMAL = 'decimal';
  const STRING = 'string';
  const OBJECT = 'object';
  const FN = 'function';
  const ARRAY = 'array';

  const staticTypes = [ANY, DATE, INTEGER, BOOLEAN, DECIMAL, STRING, OBJECT, FN,
    ARRAY];

  if (types.length !== fn.length) {
    throw new Error(`Function has ${fn.length} argument(s) and only ${types.length} type(s) defined`);
  }

  let isValidType = (value, type, argIndex) => {
    switch (type) {
      case ANY :
        return true;
      case DATE :
        if (value instanceof DATE) {
          return true;
        }
        break;
      case BOOLEAN :
        if (typeof value === BOOLEAN) {
          return true;
        }
        break;
      case STRING :
        if (typeof value === STRING) {
          return true;
        }
        break;
      case INTEGER :
        if (typeof value === 'number' && Number.isInteger(value)) {
          return true;
        }
        break;
      case DECIMAL :
        if (typeof value === 'number' && !Number.isInteger(value)) {
          return true;
        }
        break;
      case OBJECT :
        if (typeof value === OBJECT) {
          return true;
        }
        break;
      case FN :
        if (typeof value === FN) {
          return true;
        }
        break;
      case ARRAY :
        if (typeof value === OBJECT && Array.isArray(value)) {
          return true;
        }
        break;
      default :
        throw new Error(`Unsupported type found in argument ${argIndex + 1}, supported types are ${staticTypes.toString()}`);
    }
    throw new Error(`Expected argument ${argIndex + 1} to be of type ${type}`);
  };

  return (...args) => {
    if (types.length !== args.length) {
      throw new Error(`Function expects ${fn.length} arguments, instead only ${args.length} parameter(s) passed in.`);
    }

    for (let i = 0; i < args.length; i++) {
      isValidType(args[i], types[i], i)
    }

    return fn(...args);
  }
};

export default strongTyped;
