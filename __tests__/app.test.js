import request from "supertest";
import app from "../app";
import db from "../db/connection";
import seed from "../db/seeds/seed";
import * as test_data from "../db/data/test-data/index";

beforeEach(() => {
  return seed(test_data);
});
afterAll(() => {
  return db.end();
});

describe("GET /api/categories", () => {
  test("should respond with an array of categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((res) => {
        console.log(res.body, "TEST");
        const categoriesArray = res.body.allCategories;

        expect(categoriesArray.length).toBe(3);
        categoriesArray.forEach((category) => {
          expect(typeof category.category_name).toBe("string");
        });
      });
  });
});

describe("GET /api/users", () => {
  test("200: should return an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        console.log(res.body.allUsers, "SCREAM");
        const usersArray = res.body.allUsers;
        expect(usersArray).toBeInstanceOf(Array);
        expect(usersArray.length).toBeGreaterThan(0);
        usersArray.forEach((user) => {
          expect(user).toHaveProperty("user_name");
          expect(user).toHaveProperty("user_onboarded");
          expect(user).toHaveProperty("habits_tracked");
          expect(user).toHaveProperty("coins_spent");
          expect(user).toHaveProperty("highest_streak");
          expect(user).toHaveProperty("bought_apple");
          expect(user).toHaveProperty("bought_water");
          expect(user).toHaveProperty("pet_id");
        });
      });
  });

  test("404: should return error for an incorrect route", () => {
    return request(app)
      .get("/api/nonexistent")
      .expect(404)
      .then((res) => {
        expect(res.body.error).toBe("Endpoint not found");
      });
  });
});
