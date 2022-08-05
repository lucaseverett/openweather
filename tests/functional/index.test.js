import request from "supertest";
import app from "../../app.js";

describe("Server starts successfully", () => {
  it("Returns 200 for root path", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("Responds to API requests", () => {
  const lat = 33.44;
  const lon = -94.04;
  let timestamp;

  it("Returns nothing if invalid lat/lon provided", async () => {
    const response = await request(app).get("/current?lat=lon=");

    expect(response.body).toMatchObject({});
  });

  it("Returns data for valid lat/lon request", async () => {
    const response = await request(app).get(`/current?lat=${lat}&lon=${lon}`);

    // store timestamp for the next assertion
    timestamp = response.body.timestamp;

    expect(response.body.lat).toBe(lat);
    expect(response.body.lon).toBe(lon);
    expect(response.body.timestamp).toEqual(expect.any(Number));
    expect(typeof response.body.result).toBe("object");
  });

  it("Returns memoized data for subsequent requests", async () => {
    const response = await request(app).get(`/current?lat=${lat}&lon=${lon}`);

    // if data was memoized, we'll receive the same timestamp as the prior assertion
    expect(response.body.lat).toBe(lat);
    expect(response.body.lon).toBe(lon);
    expect(response.body.timestamp).toBe(timestamp);
    expect(typeof response.body.result).toBe("object");
  });
});
