import { getComfort, validateLat, validateLon } from "../../routes/current";

describe("returns correct comfort designation", () => {
  it("should return 'cold'", () => {
    const expected = "cold";
    const actual = getComfort("30");
    expect(actual).toBe(expected);
  });

  it("should return 'moderate'", () => {
    const expected = "moderate";
    const actual = getComfort("70");
    expect(actual).toBe(expected);
  });

  it("should return 'hot'", () => {
    const expected = "hot";
    const actual = getComfort("90");
    expect(actual).toBe(expected);
  });
});

describe("validates lat and lon", () => {
  it("should be valid lat", () => {
    const actual = validateLat(0);
    expect(actual).toBeTruthy();
  });

  it("should be invalid lat", () => {
    const actual = validateLat(200);
    expect(actual).toBeFalsy();
  });

  it("should be valid lon", () => {
    const actual = validateLon(0);
    expect(actual).toBeTruthy();
  });

  it("should be invalid lon", () => {
    const actual = validateLon(200);
    expect(actual).toBeFalsy();
  });
});
