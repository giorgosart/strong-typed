import strongTyped, {Types} from "./index";

const testFn = (a) => { console.log(a) };

test("Any input", () => {
  const myFunc = strongTyped([Types.ANY], testFn);
  expect(() => {myFunc("1")}).toBeTruthy();
  expect(() => {myFunc(1)}).toBeTruthy();
  expect(() => {myFunc(1.0)}).toBeTruthy();
  expect(() => {myFunc([])}).toBeTruthy();
  expect(() => {myFunc({})}).toBeTruthy();
  expect(() => {myFunc(new Set())}).toBeTruthy();
  expect(() => {myFunc(new Date())}).toBeTruthy();
});

test("String input", () => {
  const myFunc = strongTyped([Types.STRING], testFn);
  expect(() => {myFunc("1")}).toBeTruthy();

  expect(() => {myFunc(1)}).toThrow(Error);
  expect(() => {myFunc(1)}).toThrow("Function testFn expected argument 1 to be of type 'string'");
});

test("Big integer input", () => {
  const myFunc = strongTyped([Types.BIG_INT], testFn);
  //expect(() => {myFunc(9007199254740991n)}).toBeTruthy();
  expect(() => {myFunc(BigInt(9007199254740991))}).toBeTruthy();
  expect(() => {myFunc(BigInt("0x1fffffffffffff"))}).toBeTruthy();
  expect(() => {myFunc(BigInt("0b11111111111111111111111111111111111111111111111111111"))}).toBeTruthy();

  expect(() => {myFunc("test")}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow("Function testFn expected argument 1 to be of type 'bigint'");
});

test("Array input", () => {
  const myFunc = strongTyped([Types.ARRAY], testFn);
  expect(() => {myFunc(['Apple', 'Banana'])}).toBeTruthy();
  expect(() => {myFunc([1, 2])}).toBeTruthy();
  expect(() => {myFunc([[1], [2]])}).toBeTruthy();


  expect(() => {myFunc(new Date())}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow("Function testFn expected argument 1 to be of type 'array'");
});

test("Boolean input", () => {
  const myFunc = strongTyped([Types.BOOLEAN], testFn);
  expect(() => {myFunc(true)}).toBeTruthy();
  expect(() => {myFunc(false)}).toBeTruthy();
  expect(() => {myFunc(0)}).toBeTruthy();
  expect(() => {myFunc(1)}).toBeTruthy();

  expect(() => {myFunc("test")}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow("Function testFn expected argument 1 to be of type 'boolean'");
});

test("Date input", () => {
  const myFunc = strongTyped([Types.DATE], testFn);
  expect(() => {myFunc(Date.now())}).toBeTruthy();
  expect(() => {myFunc(Date.UTC())}).toBeTruthy();
  expect(() => {myFunc(new Date())}).toBeTruthy();
  expect(() => {myFunc(new Date('December 17, 1995 03:24:00'))}).toBeTruthy();
  expect(() => {myFunc(new Date(new Date('1995-12-17T03:24:00')))}).toBeTruthy();

  expect(() => {myFunc({})}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow("Function testFn expected argument 1 to be of type 'date'");
});

test("Decimal input", () => {
  const myFunc = strongTyped([Types.DECIMAL], testFn);
  expect(() => {myFunc(2.333)}).toBeTruthy();
  expect(() => {myFunc(Number.EPSILON)}).toBeTruthy();

  expect(() => {myFunc(1)}).toThrow(Error);
  expect(() => {myFunc(Number.NaN)}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow("Function testFn expected argument 1 to be of type 'decimal'");
});

test("Integer input", () => {
  const myFunc = strongTyped([Types.INTEGER], testFn);
  expect(() => {myFunc(123)}).toBeTruthy();
  expect(() => {myFunc(Number.MAX_SAFE_INTEGER)}).toBeTruthy();

  expect(() => {myFunc(Number.EPSILON)}).toThrow(Error);
  expect(() => {myFunc(Number.NaN)}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow("Function testFn expected argument 1 to be of type 'integer'");
});

test("Function input", () => {
  const myFunc = strongTyped([Types.FN], testFn);
  expect(() => {myFunc(testFn("test"))}).toBeTruthy();

  expect(() => {myFunc("test")}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow("Function testFn expected argument 1 to be of type 'function'");
});

test("Object input", () => {
  const myFunc = strongTyped([Types.OBJECT], testFn);
  expect(() => {myFunc(testFn({}))}).toBeTruthy();

  expect(() => {myFunc("test")}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow("Function testFn expected argument 1 to be of type 'object'");
});

test("Set input", () => {
  const myFunc = strongTyped([Types.SET], testFn);
  expect(() => {myFunc(testFn(new Set()))}).toBeTruthy();
  expect(() => {myFunc(testFn(new Set([1, 2, 3, 4])))}).toBeTruthy();

  expect(() => {myFunc({})}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow("Function testFn expected argument 1 to be of type 'set'");
});

test("Map input", () => {
  const myFunc = strongTyped([Types.MAP], testFn);
  expect(() => {myFunc(testFn(new Map()))}).toBeTruthy();

  expect(() => {myFunc({})}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow("Function testFn expected argument 1 to be of type 'map'");
});

