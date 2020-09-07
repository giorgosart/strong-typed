const strongTyped = (types, fn) => {

  if (types.length !== fn.length) {
    throw new Error(`Function ${fn.name} has ${fn.length} argument(s) and only ${types.length} type(s) defined.`);
  }

  const isValidType = (value, type, argIndex) => {
    switch (type.toLowerCase()) {
      case Types.ANY :
        break;
      case Types.DATE :
        if (typeof value === Types.OBJECT && value instanceof Types.DATE) {
          return true;
        }
        break;
      case Types.BOOLEAN :
        if (typeof value === Types.BOOLEAN) {
          return true;
        }
        break;
      case Types.STRING :
        if (typeof value === Types.STRING) {
          return true;
        }
        break;
      case Types.BIG_INT:
        if (typeof value === Types.BIG_INT) {
          return true;
        }
        break;
      case Types.INTEGER :
        if (typeof value === 'number' && Number.isInteger(value)) {
          return true;
        }
        break;
      case Types.DECIMAL :
        if (typeof value === 'number' && !Number.isInteger(value) && !isNaN(value)) {
          return true;
        }
        break;
      case Types.OBJECT :
        if (typeof value === Types.OBJECT) {
          return true;
        }
        break;
      case Types.FN :
        if (typeof value === Types.FN) {
          return true;
        }
        break;
      case Types.ARRAY :
        if (typeof value === Types.OBJECT && Array.isArray(value)) {
          return true;
        }
        break;
      case Types.SET :
        if (typeof value === "object" && value instanceof Set) {
          return true;
        }
        break;
      case Types.MAP :
        if (typeof value === "object" && value instanceof Map) {
          return true;
        }
        break;
      default :
        throw new Error(`Unsupported type found in argument ${argIndex + 1} for function ${fn.name}, supported types are ${Object.values(Types)}`);
    }
    throw new Error(`Function ${fn.name} expected argument ${argIndex + 1} to be of type '${type}'`);
  };

  return (...args) => {
    if (types.length !== args.length) {
      throw new Error(`Function ${fn.name} expects ${fn.length} arguments, instead only ${args.length} parameter(s) passed in.`);
    }

    for (let i = 0; i < args.length; i++) {
      isValidType(args[i], types[i], i);
    }

    return fn(...args);
  }
};

export const Types = {
  ANY: 'any',
  DATE: 'date',
  INTEGER: 'integer',
  BIG_INT: 'bigint',
  BOOLEAN: 'boolean',
  DECIMAL: 'decimal',
  STRING: 'string',
  OBJECT: 'object',
  FN: 'function',
  ARRAY: 'array',
  SET: 'set',
  MAP: 'map'
};
Object.freeze(Types);

export default strongTyped;
