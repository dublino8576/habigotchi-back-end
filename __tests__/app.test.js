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

describe("POST /api/pets/user_name", () => {
  test("should post a new pet to the pets table", () => {
    return request(app)
    .post("/api/pets/aldous").send({pet_name : "lil skibidi", pet_status : "i love fortnite", current_coin : 20})
    .expect(202)
    .then((res) => {
      return db.query("SELECT * FROM pets ORDER BY pet_id DESC LIMIT 1")
          .then((result) => {
            const lastPet = result.rows[0];
            expect(lastPet.pet_name).toBe("lil skibidi");
            expect(lastPet.pet_status).toBe("i love fortnite");
            expect(lastPet.pet_happiness).toBe(100); 
            expect(lastPet.pet_health).toBe(100); 
            expect(lastPet.current_coin).toBe(20);
            console.log(lastPet)
          })
    })
  })
})