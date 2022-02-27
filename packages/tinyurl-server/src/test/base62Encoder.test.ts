// const encoder = require("../services/base62Encoder")
import encoder from "../services/base62Encoder";

const convertToBase62Test = (base10num: number, expectedResult: string) => {
  it(`should convert ${base10num} to base62`, () => {
    const base62Num = encoder.encode(base10num);

    expect(base62Num).toEqual(expectedResult);
  });
};

const convertFromBase62Test = (base62num: string, expectedResult: number) => {
  it(`should convert ${base62num} to base10`, () => {
    const base62Num = encoder.decode(base62num);

    expect(base62Num).toEqual(expectedResult);
  });
};

const testTuples: Array<[number, string]> = [
  [0, "0"],
  [2, "2"],
  [10, "a"],
  [11, "b"],
  [61, "Z"],
  [62, "10"],
  [100, "1C"],
  [3000, "Mo"],
  [60000, "fBK"],
];

describe("base62 encoder tests", () => {
  describe("encode", () => {
    describe("positive", () => {
      testTuples.forEach((tuple) => {
        convertToBase62Test(tuple[0], tuple[1]);
      });
    });

    describe("negative", () => {
      it("should throw exception when encoding negative numbers => -1", () => {
        expect(() => encoder.encode(-1)).toThrow("number cannot be negative");
      });

      it("should throw exception when encoding negative numbers => -10000", () => {
        expect(() => encoder.encode(-10000)).toThrow(
          "number cannot be negative"
        );
      });
    });
  });

  describe("decode", () => {
    describe("positive", () => {
      testTuples.forEach((tuple) => {
        convertFromBase62Test(tuple[1], tuple[0]);
      });
    });

    describe("negative", () => {
      it("should throw when not a valid chars", () => {
        expect(() => encoder.decode("#$#@!")).toThrow("not a valid chars")
      });
    });
  });
});
