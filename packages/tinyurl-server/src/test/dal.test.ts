import { get, insert, getDb, setDb } from "../dal/urlDAL";

describe("dal tests", () => {
    const db = getDb();
  beforeEach(() => {
    setDb([]);
  });
  describe("insert", () => {
    it("insert new item", () => {
      const randomUrl = "aaabbbccc";
      insert(randomUrl);

      const a = getDb();

      expect(db).toContain(randomUrl);
    });
  });
});
