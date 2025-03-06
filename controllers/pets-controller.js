import { createPets } from "../models/pets-model";

export function postPet(req, res, next) {
    const pet_name = req.body.pet_name
    const pet_status = req.body.pet_status
    const coins = req.body.current_coin

  return createPets(pet_name,pet_status, coins)
    .then(() => {
      res.status(202).send();
    })
    .catch((err) => {
      next(err);
    });
}
