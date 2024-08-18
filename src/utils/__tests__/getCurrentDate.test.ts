import { getCurrentDate } from "../getCurrentDate";

describe("getCurrentDate", () => {
  it("should return the current date in YYYY-MM-DD format", () => {
    const mockDate = new Date("2024-08-18T00:00:00Z");
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    const expectedDate = "2024-08-18";

    expect(getCurrentDate()).toBe(expectedDate);

    jest.restoreAllMocks();
  });

  it("should return the correct format even for single-digit month and day", () => {
    const mockDate = new Date("2024-03-07T00:00:00Z");
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    const expectedDate = "2024-03-07";

    expect(getCurrentDate()).toBe(expectedDate);

    jest.restoreAllMocks();
  });

  it("should handle leap years correctly", () => {
    const mockDate = new Date("2024-02-29T00:00:00Z");
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    const expectedDate = "2024-02-29";

    expect(getCurrentDate()).toBe(expectedDate);

    jest.restoreAllMocks();
  });
});
