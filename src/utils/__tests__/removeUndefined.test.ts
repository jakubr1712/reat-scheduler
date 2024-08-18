import { removeUndefined } from "../removeUndefined";

describe("removeUndefined", () => {
  it("should remove properties with undefined values", () => {
    const input = {
      a: 1,
      b: undefined,
      c: "test",
      d: undefined,
      e: null,
    };

    const expectedOutput = {
      a: 1,
      c: "test",
      e: null,
    };

    expect(removeUndefined(input)).toEqual(expectedOutput);
  });

  it("should return an empty object when all properties are undefined", () => {
    const input = {
      a: undefined,
      b: undefined,
      c: undefined,
    };

    const expectedOutput = {};

    expect(removeUndefined(input)).toEqual(expectedOutput);
  });

  it("should return the same object when no properties are undefined", () => {
    const input = {
      a: 1,
      b: "test",
      c: null,
    };

    const expectedOutput = {
      a: 1,
      b: "test",
      c: null,
    };

    expect(removeUndefined(input)).toEqual(expectedOutput);
  });

  it("should return an empty object when input is an empty object", () => {
    const input = {};

    const expectedOutput = {};

    expect(removeUndefined(input)).toEqual(expectedOutput);
  });

  it("should correctly handle nested objects with undefined values", () => {
    const input = {
      a: 1,
      b: undefined,
      c: {
        d: 2,
        e: undefined,
      },
    };

    const expectedOutput = {
      a: 1,
      c: {
        d: 2,
        e: undefined,
      },
    };

    expect(removeUndefined(input)).toEqual(expectedOutput);
  });
});
