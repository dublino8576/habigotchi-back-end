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

describe("POST /api/pets/:user_name", () => {
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
            user_onboarded: expect.any(Boolean),
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

describe("TEST for 500 error", () => {
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
          expect(user).toHaveProperty("bought_ice_cream");
          expect(user).toHaveProperty("bought_strawberry");
          expect(user).toHaveProperty("bought_ball");
          expect(user).toHaveProperty("pet_id");
        });
      });
  });
});

