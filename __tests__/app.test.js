import request from "supertest";
import app from "../app.js";
import db from "../db/connection.js";
import seed from "../db/seeds/seed.js";
import * as test_data from "../db/data/test-data/index.js";
import { response } from "express";


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

describe("POST /api/pets/", () => {
  test("should post a new pet to the pets table", () => {
    return request(app)
      .post("/api/pets/")
      .send({
        pet_name: "lil skibidi",
        pet_status: "i love fortnite",
        current_coin: 20,
      })
      .expect(202)
      .then((res) => {
        return db
          .query("SELECT * FROM pets ORDER BY pet_id DESC LIMIT 1")

          .then((result) => {
            const lastPet = result.rows[0];
            expect(lastPet.pet_name).toBe("lil skibidi");
            expect(lastPet.pet_status).toBe("i love fortnite");
            expect(lastPet.pet_happiness).toBe(100);
            expect(lastPet.pet_health).toBe(100);
            expect(lastPet.current_coin).toBe(20);
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

describe("POST /api/habits/:user_id", () => {
  test("201:should respond with an array with a single object with all the properties of the added habit", () => {
    const reqBody = {
      habit_name: "Dino Habit",
      habit_frequency: "daily",
      habit_status: "pending",
      habit_category: "yoga",
    };

    return request(app)
      .post("/api/habits/1")
      .send(reqBody)
      .expect(201)
      .then(({ body: { addedHabit } }) => {
        expect(addedHabit).toEqual(
          expect.objectContaining({
            habit_id: expect.any(Number),
            habit_name: expect.any(String),
            habit_frequency: expect.any(String),
            habit_status: expect.any(String),
            habit_added: expect.any(String),
            habit_category: expect.any(String),
            user_id: expect.any(Number),
          })
        );
      });
  });

  test("404: Should respond with 404 Not Found if user_id is valid format but doesn't exist in the users table", () => {
    const reqBody = {
      habit_name: "Dino Habit",
      habit_frequency: "daily",
      habit_status: "pending",
      habit_category: "yoga",
    };

    return request(app)
      .post("/api/habits/99")
      .send(reqBody)
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("Not found: User ID does not exist");
      });
  });

  test("400:should respond with an array with a single object with all the properties of the added habit", () => {
    const reqBody = {
      habit_name: "Dino Habit",
      habit_frequency: "daily",
      habit_status: "pending",
      habit_category: "yoga",
    };

    return request(app)
      .post("/api/habits/A")
      .send(reqBody)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});

describe("GET /api/pets/:user_name", () => {
  test("should get a pet that corresponds to the given user_name owner", () => {
    return request(app)
      .get("/api/pets/ryangawenda")
      .expect(200)
      .then((response) => {
        expect(response.body.pet_name).toEqual("optimus");
        expect(response.body.pet_happiness).toEqual(9);
        expect(response.body.pet_health).toEqual(3);
      });
  });
});
describe("GET/api/users/:user_id", () => {
  test("GET 200: get users by id", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then((response) => {
        const user = response.body.user;

        expect(user).toEqual({
          user_id: 1,
          user_name: "dino",
          habits_tracked: 0,
          user_onboarded: false,
          coins_earned: 0,
          coins_spent: 0,
          highest_streak: 0,
          bought_apple: 0,
          bought_strawberry: 0,
          bought_ice_cream: 0,
          bought_ball: 0,
          pet_id: 1,
        });
      });
  });

  test("404 user not found", () => {
    return request(app)
      .get("/api/users/200")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("User not found");
      });
  });
  test("400 id not a number", () => {
    return request(app)
      .get("/api/users/notanumber")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});

describe("GET /api/habits/:user_id", () => {
  test("should respond with an array of objects containing each habit from the user_id provided", () => {
    return request(app)
      .get("/api/habits/3")
      .expect(200)
      .then(({ body: { userHabits } }) => {
        expect(Array.isArray(userHabits)).toBe(true);

        userHabits.forEach((habit) => {
          expect(habit).toEqual(
            expect.objectContaining({
              habit_id: expect.any(Number),
              habit_name: expect.any(String),
              habit_frequency: expect.any(String),
              habit_status: expect.any(String),
              habit_added: expect.any(String),
              habit_category: expect.any(String),
              user_id: expect.any(Number),
            })
          );
        });
      });
  });

  test("404: Should respond with 404 Not Found if user_id is valid format but doesn't exist in the users table", () => {
    return request(app)
      .get("/api/habits/99")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("Not found: User ID does not exist");
      });
  });

  test("400:Should respond with 400 Bad request if user_id is using a different format", () => {
    return request(app)
      .get("/api/habits/A")
      .expect(400)
      .then((response) => {
        expect(response.body.error).toBe("Bad Request: invalid input syntax");
      });
  });
});
