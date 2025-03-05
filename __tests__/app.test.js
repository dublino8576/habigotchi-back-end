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
        const categoriesArray = res.body.allCategories;

        expect(categoriesArray.length).toBe(3);
        categoriesArray.forEach((category) => {
          expect(typeof category.category_name).toBe("string");
        });
      });
  });
});

describe("POST /api/users", () => {
  test("should respond with an array with a single object with all the properties of the added user", () => {
    const reqBody = { user_name: "Dino" };

    return request(app)
      .post("/api/users")
      .send(reqBody)
      .expect(201)
      .then(({ body: { addedUser } }) => {
        expect(Array.isArray(addedUser)).toBe(true);
        expect(...addedUser).toEqual(
          expect.objectContaining({
            user_id: expect.any(Number),
            user_name: expect.any(String),
            habits_tracked: expect.any(Number),
            coins_earned: expect.any(Number),
            coins_spent: expect.any(Number),
            highest_streak: expect.any(Number),
            bought_apple: expect.any(Number),
            bought_strawberry: expect.any(Number),
            bought_ball: expect.any(Number),
            bought_ice_cream: expect.any(Number),
          })
        );
      });
  });
});

describe("TEST for invalid URL", () => {
  test("404: Should respond with 'Endpoint not found', if a request is sending to an invalid/non existing path", () => {
    return request(app)
      .get("/api/iamgroot")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("Endpoint not found");
      });
  });
});

describe("TEST for invalid URL", () => {
  test("500: Should respond with 'Endpoint not found', if a request is sending to an invalid/non existing path", () => {
    return request(app)
      .post("/api/users")
      .send({ asdadsad: "asd", wqdsad: 23 })
      .expect(500)
      .then((response) => {
        expect(response.body.error).toBe("Internal Server Error");
      });
  });
});
