import { get, insert, getDb, setDb } from "../dal/urlDAL";

describe("dal tests", () => {
  describe("insert", () => {
    beforeEach(() => {
      setDb([]);
    });

    it("insert new item", () => {
      const randomUrl = "aaabbbccc";
      insert(randomUrl);

      expect(getDb()).toContain(randomUrl);
    });

    it("insert 5 items", () => {
      const arr: Array<string> = ["aaa", "bbb", "ccc", "ddd", "eee"];
      arr.forEach((url) => {
        insert(url);
      });

      for (let i = 0; i < arr.length; i++) {
        expect(getDb()[i]).toEqual(arr[i]);
      }
    });

    it("insert 2 same items", () => {
      const a = "aaa";
      const b = "aaa";

      insert(a);
      insert(b);

      expect(getDb()[0]).toEqual(a);
      expect(getDb()[0]).toEqual(b);
      expect(getDb()[1]).toBeUndefined();
    });
  });

  describe("get", () => {
    const mock = ["aaa", "bbb", "ccc", "ddd", "eee"];
    beforeEach(() => {
      setDb(mock);
    });

    it("should get aaa", () => {
      const item = get("0");
      expect(item).toEqual(mock[0]);
    });

    it("should get ccc", () => {
      const item = get("2");
      expect(item).toEqual(mock[2]);
    });

    it("should get eee", () => {
      const item = get("4");
      expect(item).toEqual(mock[4]);
    });

    const singleInvalidChars = [
      "#",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "(",
      ")",
    ];

    singleInvalidChars.forEach((c) => {
      it(`should throw when given invalid single char => '${c}'`, () => {
        expect(() => {
          get(c);
        }).toThrow("url does not exists");
      });
    });

    const multipleInvalidChars = [
      "!@#",
      "#$%",
      "%^&*&",
      "@#$^()*",
      "0!",
      "!0",
      "0!0",
    ];

    multipleInvalidChars.forEach((s) => {
      it(`should throw when given invalid string => '${s}'`, () => {
        expect(() => {
          get(s);
        }).toThrow("url does not exists");
      });
    });

    it("should throw when getting non existing item(valid id)", () => {
        expect(() => {
            get("6");
          }).toThrow("url does not exists");
    })
  });
});
