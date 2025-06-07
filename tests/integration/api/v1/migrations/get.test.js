import database from "infra/database";
import orchestrador from "tests/orchestrador.js";

beforeAll(async () => {
  await orchestrador.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
