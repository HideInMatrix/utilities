import { describe, it, expect } from "vitest";
import { formatDate } from "../src/modules/date";
describe("date", () => {
  it("formatDate", () => {
    expect(formatDate("2022/8/12", "YYYY-MM-DD")).toMatchInlineSnapshot(
      `"2022-08-12"`
    );
  });
});
