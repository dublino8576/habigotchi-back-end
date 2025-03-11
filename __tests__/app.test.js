import request from "supertest";
import app from "../app.js";
import db from "../db/connection.js";
import seed from "../db/seeds/seed.js";
import * as test_data from "../db/data/test-data/index.js";

beforeEach(() => {
  return seed(test_data);
});
afterAll(() => {
  return db.end();
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
            expect(lastPet.pet_health).toBe(80);
            expect(lastPet.current_coin).toBe(200);
          });
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
        });
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

describe("PATCH /api/pets/:user_name", () => {
  test("should patch the pet that corresponds to the given user_name owner - 1 parameter", () => {
    return request(app)
      .patch("/api/pets/ryangawenda")
      .send({ pet_name: "Bumblebee" })
      .expect(204)
      .then((response) => {
        return db
          .query("SELECT * FROM pets ORDER BY pet_id ASC LIMIT 3")

          .then((result) => {
            const lastPet = result.rows[1];
            expect(lastPet.pet_name).toBe("Bumblebee");
          });
      });
  });
  test("should patch the pet that corresponds to the given user_name owner - multiple parameters", () => {
    return request(app)
      .patch("/api/pets/ryangawenda")
      .send({ pet_name: "Bumblebee", pet_health: 82, pet_happiness: 99 })
      .expect(204)
      .then((response) => {
        return db
          .query("SELECT * FROM pets ORDER BY pet_id ASC LIMIT 3")

          .then((result) => {
            const lastPet = result.rows[1];
            expect(lastPet.pet_name).toBe("Bumblebee");
            expect(lastPet.pet_health).toBe(82);
            expect(lastPet.pet_happiness).toBe(99);
          });
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
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});

describe("TEST for finding endpoints", () => {
  test("returns endpoints list", () => {
    return request(app)
      .get("/api/endpoints")
      .expect(200)
      .then((response) => {
        expect(typeof response).toBe("object");
      });
  });
});

describe("DELETE /api/habits/:habit_id", () => {
  test("should respond with an array of object containing the deleted habit", () => {
    return request(app).delete("/api/habits/2").expect(200);
  });

  test("404: Should respond with 404 Not Found if habit_id is valid format but doesn't exist in the habits table", () => {
    return request(app)
      .delete("/api/habits/99")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("Not found: Habit ID does not exist");
      });
  });

  test("400:Should respond with 400 Bad request if habit_id is using a different format", () => {
    return request(app)
      .get("/api/habits/A")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});

describe("PATCH /api/habits/:habit_id", () => {
  test("200:should respond with an array with a single object with all the properties of the added habit", () => {
    const reqBody = {
      habit_name: "updated_running",
      habit_frequency: "daily_updated",
      habit_status: "completed_updated",
    };

    return request(app)
      .patch("/api/habits/1")
      .send(reqBody)
      .expect(200)
      .then(({ body: { updatedHabit } }) => {
        expect(updatedHabit.habit_name).toEqual("updated_running");
        expect(updatedHabit.habit_frequency).toEqual("daily_updated");
        expect(updatedHabit.habit_status).toEqual("completed_updated");
      });
  });

  test("200:should be able to handle if you edit only one property of the habit", () => {
    const reqBody = {
      habit_name: "updated_running",
    };

    return request(app)
      .patch("/api/habits/1")
      .send(reqBody)
      .expect(200)
      .then(({ body: { updatedHabit } }) => {
        expect(updatedHabit.habit_name).toEqual("updated_running");
      });
  });

  test("404: Should respond with 404 Not Found if habit_id is valid format but doesn't exist in the habits table", () => {
    const reqBody = {
      habit_name: "updated_running",
      habit_frequency: "daily_updated",
      habit_status: "completed_updated",
    };

    return request(app)
      .patch("/api/habits/99")
      .send(reqBody)
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("Not found: Habit ID does not exist");
      });
  });

  test("400:should respond with 400 Bad Request if habit_id was using a different format instead of a number", () => {
    const reqBody = {
      habit_name: "updated_running",
      habit_frequency: "daily_updated",
      habit_status: "completed_updated",
    };

    return request(app)
      .patch("/api/habits/A")
      .send(reqBody)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});

describe("PATCH /api/users/:user_id", () => {
  test("201:should update a user's property based on the argument passed in from the request body ", () => {
    const reqBody = {
      user_onboarded: true,
      habits_tracked: 2,
      coins_earned: 40,
      coins_spent: 20,
      highest_streak: 2,
      bought_apple: 2,
      bought_ball: 10,
      pet_id: 2,
    };

    return request(app)
      .patch("/api/users/1")
      .send(reqBody)
      .expect(200)
      .then((response) => {
        const user = response.body.upDatedUser[0];
        expect(user.user_onboarded).toBe(true);
        expect(user.habits_tracked).toBe(2);
        expect(user.coins_earned).toBe(40);
        expect(user.coins_spent).toBe(20);
        expect(user.highest_streak).toBe(2);
        expect(user.bought_apple).toBe(2);
        expect(user.bought_ball).toBe(10);
        expect(user.pet_id).toBe(2);
      });
  });

  test("201:should update a user's property even if request body is only carrying one property ", () => {
    const reqBody = {
      pet_id: 2,
      user_onboarded: true,
    };

    return request(app)
      .patch("/api/users/1")
      .send(reqBody)
      .expect(200)
      .then((response) => {
        const user = response.body.upDatedUser[0];
        expect(user.pet_id).toBe(2);
      });
  });
});
