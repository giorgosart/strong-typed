import strongTyped, {Types} from "./index";

const fn = (val) => strongTyped([Types.STRING], (a) => { console.log(a) });
const fn_falsy = (val) => strongTyped(['asdf'], (a) => { console.log(a) });
const testFn = (a) => { console.log(a) };

test('valid string input', () => {
  expect(fn("string")).toBeTruthy();
});

test('invalid type declared', () => {
  expect(fn_falsy(1)).toBeTruthy();
});

test("parameter number validation error message", () => {
  const myFunc = strongTyped([Types.STRING], testFn);
  expect(() => {myFunc()}).toThrow(Error);
  expect(() => {myFunc()}).toThrow("Function testFn expects 1 arguments, instead only 0 parameter(s) passed in.");
});

test("extra parameter types number validation error thrown", () => {
  expect(() => {strongTyped([Types.STRING, Types.STRING], testFn)}).toThrow(Error);
  expect(() => {strongTyped([Types.STRING, Types.STRING], testFn)}).toThrow("Function testFn has 1 argument(s) and only 2 type(s) defined.");
});

test("parameter types number validation error message", () => {
  const myFunc = strongTyped([Types.STRING], testFn);
  expect(() => {strongTyped([], testFn)}).toThrow(Error);
  expect(() => {myFunc()}).toThrow("Function testFn expects 1 arguments, instead only 0 parameter(s) passed in.");
});

test("unsupported parameter types validation error message", () => {
  const myFunc = strongTyped(["Blah"], testFn);
  expect(() => {myFunc("test")}).toThrow(Error);
  expect(() => {myFunc("test")}).toThrow("Unsupported type found in argument 1 for function testFn, supported types are any,date,integer,bigint,boolean,decimal,string,object,function,array,set,map");
});
