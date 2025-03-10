import db from "../db/connection";
import seed from "../db/seeds/seed";
import * as test_data from "../db/data/test-data/index";
import { checkUserIdExist, checkHabitIdExists } from "../db/seeds/utils";

beforeEach(() => {
  return seed(test_data);
});
afterAll(() => {
  return db.end();
});

describe("checkUserIdExist()", () => {
  test("Should resolve with a value of 'User ID Exists' if user_id exists in the users table", () => {
    const user_id = 1;

    expect(checkUserIdExist(user_id)).resolves.toBe(`User ID Exists`);
  });

  test("404 Should reject with a Not Found error if a username does not exist in the users table", () => {
    const user_id = 99;

    expect(checkUserIdExist(user_id)).rejects.toEqual({
      detail: "User ID does not exist",
      error: "Not found",
      status: 404,
    });
  });
});

describe("checkHabitIdExists()", () => {
  test("Should resolve with a value of 'Habit ID Exists' if habit_id exists in the habits table", () => {
    const habit_id = 1;

    expect(checkHabitIdExists(habit_id)).resolves.toBe(`Habit ID Exists`);
  });

  test("404 Should reject with a Not Found error if a habit_id does not exist in the habits table", () => {
    const habit_id = 99;

    expect(checkHabitIdExists(habit_id)).rejects.toEqual({
      status: 404,
      error: "Not found",
      detail: "Habit ID does not exist",
    });
  });
});
